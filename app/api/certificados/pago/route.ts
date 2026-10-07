import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { supabaseConfig, headers, supabaseFetch } from "@/lib/supabase-server";

export const runtime = "nodejs";

function htmlEscape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sign(values: string[], privateKey: string) {
  const data = Buffer.from(Buffer.from(values.join("-"), "utf8").toString("base64"), "utf8");
  const signature = crypto.sign("RSA-SHA256", data, privateKey);
  return signature.toString("base64");
}

export async function GET(request: Request) {
  try {
    const code = new URL(request.url).searchParams.get("codigo")?.trim();
    if (!code) return new NextResponse("Código requerido.", { status: 400 });

    const { url, key } = supabaseConfig();
    if (!url || !key) return new NextResponse("Server not configured", { status: 503 });
    const h = headers(key);

    // Query by REAL column: codigo_certificado (not codigo)
    const db = await supabaseFetch(
      `${url}/rest/v1/certificados?select=id,codigo_certificado,curso_id,afiliado_id,puntuacion,pago_realizado,estado&codigo_certificado=eq.${encodeURIComponent(code)}&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!db.ok) return new NextResponse("No se pudo consultar el certificado.", { status: 502 });
    const rows = await db.json() as Array<{ id: string; codigo_certificado: string; curso_id: string; afiliado_id: string; puntuacion: number; pago_realizado: boolean; estado: string }>;
    if (!rows.length) return new NextResponse("Certificado no encontrado.", { status: 404 });

    const cert = rows[0];
    // Check pago_realizado (not estado_pago === "pagado")
    if (cert.pago_realizado) {
      return NextResponse.redirect(new URL(
        `/certificado/${encodeURIComponent(cert.curso_id)}?pago=ok&codigo=${encodeURIComponent(cert.codigo_certificado)}&score=${encodeURIComponent(String(cert.puntuacion))}&total=20`,
        request.url
      ));
    }

    const sid = process.env.MYPOS_SID?.trim();
    const wallet = process.env.MYPOS_WALLET_NUMBER?.trim();
    const keyIndex = process.env.MYPOS_KEY_INDEX?.trim() || "1";
    const privateKey = process.env.MYPOS_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
    const apiUrl = process.env.MYPOS_CHECKOUT_URL?.trim() || "https://www.mypos.eu/vmp/checkout";

    if (!sid || !wallet || !privateKey) {
      return new NextResponse("Falta configurar las credenciales de Checkout de myPOS.", { status: 503 });
    }

    const memberResponse = await supabaseFetch(
      `${url}/rest/v1/afiliados?select=nombre,apellidos,email&id=eq.${encodeURIComponent(cert.afiliado_id)}&limit=1`,
      { headers: h, cache: "no-store" }
    );
    if (!memberResponse.ok) return new NextResponse("No se pudieron cargar los datos del titular.", { status: 502 });
    const members = await memberResponse.json() as Array<{ nombre: string; apellidos: string; email: string }>;
    if (!members.length) return new NextResponse("Titular no encontrado.", { status: 404 });
    const member = members[0];

    const origin = new URL(request.url).origin;
    // Price is fixed server-side at 4.99 EUR — client cannot control it
    const data: Record<string, string> = {
      IPCmethod: "IPCPurchase",
      IPCVersion: "1.4",
      IPCLanguage: "EN",
      SID: sid,
      walletnumber: wallet,
      Amount: "4.99",
      Currency: "EUR",
      OrderID: cert.codigo_certificado,
      URL_OK: `${origin}/certificado/${encodeURIComponent(cert.curso_id)}?pago=ok&codigo=${encodeURIComponent(cert.codigo_certificado)}&score=${encodeURIComponent(String(cert.puntuacion))}&total=20`,
      URL_Cancel: `${origin}/certificado/${encodeURIComponent(cert.curso_id)}?pago=cancelado&codigo=${encodeURIComponent(cert.codigo_certificado)}`,
      URL_Notify: `${origin}/api/certificados/notify`,
      CardTokenRequest: "0",
      KeyIndex: keyIndex,
      PaymentParametersRequired: "1",
      customeremail: member.email,
      customerfirstnames: member.nombre.trim(),
      customerfamilyname: member.apellidos.trim(),
      PaymentMethod: "3",
      Note: "Certificado Sindicato de Operarios",
      CartItems: "1",
      Article_1: "Certificado de aptitud",
      Quantity_1: "1",
      Price_1: "4.99",
      Currency_1: "EUR",
      Amount_1: "4.99",
    };
    const signature = sign(Object.values(data), privateKey);
    const fields = Object.entries({ ...data, Signature: signature }).map(([name, value]) =>
      `<input type="hidden" name="${htmlEscape(name)}" value="${htmlEscape(value)}">`
    ).join("");

    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pago seguro myPOS</title><style>body{font-family:system-ui,-apple-system,sans-serif;padding:32px;text-align:center;background:#f5f7f8;color:#101820}button{border:0;border-radius:12px;padding:16px 24px;background:#f5b400;color:#101820;font-weight:800;font-size:16px;cursor:pointer}</style></head><body><h2>Preparando tu pago seguro…</h2><p>Serás enviado a myPOS para completar el pago de 4,99 €.</p><form id="mypos" method="post" action="${htmlEscape(apiUrl)}">${fields}<button type="submit">Continuar al pago seguro</button></form><script>document.getElementById("mypos").submit()</script></body></html>`;
    return new NextResponse(html, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("myPOS checkout error:", error);
    return new NextResponse("No se pudo iniciar el pago myPOS.", { status: 500 });
  }
}

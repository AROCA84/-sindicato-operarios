import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const raw = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = raw?.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "").replace(/[•·]/g, "");
  return { url, key };
}
function headers(key: string) {
  const h: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  if (!key.startsWith("sb_secret_")) h.Authorization = `Bearer ${key}`;
  return h;
}
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

    const db = await fetch(
      `${url}/rest/v1/certificados?select=id,codigo,estado_pago,curso_id&codigo=eq.${encodeURIComponent(code)}&limit=1`,
      { headers: headers(key), cache: "no-store" }
    );
    if (!db.ok) return new NextResponse("No se pudo consultar el certificado.", { status: 502 });
    const rows = await db.json() as Array<{ id: string; codigo: string; estado_pago: string; curso_id: string }>;
    if (!rows.length) return new NextResponse("Certificado no encontrado.", { status: 404 });
    if (rows[0].estado_pago === "pagado") return NextResponse.redirect(new URL(`/certificado/${encodeURIComponent(code)}`, request.url));

    const sid = process.env.MYPOS_SID?.trim();
    const wallet = process.env.MYPOS_WALLET_NUMBER?.trim();
    const keyIndex = process.env.MYPOS_KEY_INDEX?.trim() || "1";
    const privateKey = process.env.MYPOS_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
    const apiUrl = process.env.MYPOS_CHECKOUT_URL?.trim() || "https://www.mypos.com/vmp/checkout";

    if (!sid || !wallet || !privateKey) {
      return new NextResponse("Falta configurar las credenciales de Checkout de myPOS.", { status: 503 });
    }

    const origin = new URL(request.url).origin;
    const data: Record<string, string> = {
      IPCmethod: "IPCPurchase",
      IPCVersion: "1.4",
      IPCLanguage: "ES",
      SID: sid,
      WalletNumber: wallet,
      Amount: "4.99",
      Currency: "EUR",
      OrderID: rows[0].codigo,
      URL_OK: `${origin}/certificado/${encodeURIComponent(rows[0].curso_id)}?pago=ok&codigo=${encodeURIComponent(rows[0].codigo)}`,
      URL_Cancel: `${origin}/certificado/${encodeURIComponent(rows[0].curso_id)}?pago=cancelado&codigo=${encodeURIComponent(rows[0].codigo)}`,
      URL_Notify: `${origin}/api/certificados/notify`,
      CardTokenRequest: "0",
      KeyIndex: keyIndex,
      PaymentParametersRequired: "1",
      PaymentMethod: "1",
      Source: "Sindicato de Operarios",
    };
    const signature = sign(Object.values(data), privateKey);
    const fields = Object.entries({ ...data, Signature: signature }).map(([name, value]) =>
      `<input type="hidden" name="${htmlEscape(name)}" value="${htmlEscape(value)}">`
    ).join("");

    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pago seguro myPOS</title></head><body><p>Redirigiendo al pago seguro de myPOS…</p><form id="mypos" method="post" action="${htmlEscape(apiUrl)}">${fields}</form><script>document.getElementById("mypos").submit()</script></body></html>`;
    return new NextResponse(html, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("myPOS checkout error:", error);
    return new NextResponse("No se pudo iniciar el pago myPOS.", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const raw = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = raw?.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "").replace(/[•·]/g, "");
  return { url, key };
}
const SUPABASE_TIMEOUT_MS = 10000;

async function supabaseFetch(input: RequestInfo | URL, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUPABASE_TIMEOUT_MS);
  try { return await fetch(input, { ...init, signal: controller.signal }); }
  finally { clearTimeout(timeout); }
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

    const db = await supabaseFetch(
      `${url}/rest/v1/certificados?select=id,codigo,estado_pago,curso_id,afiliado_id&codigo=eq.${encodeURIComponent(code)}&limit=1`,
      { headers: headers(key), cache: "no-store" }
    );
    if (!db.ok) return new NextResponse("No se pudo consultar el certificado.", { status: 502 });
    const rows = await db.json() as Array<{ id: string; codigo: string; estado_pago: string; curso_id: string; afiliado_id: string }>;
    if (!rows.length) return new NextResponse("Certificado no encontrado.", { status: 404 });
    if (rows[0].estado_pago === "pagado") return NextResponse.redirect(new URL(`/certificado/${encodeURIComponent(rows[0].curso_id)}?pago=ok&codigo=${encodeURIComponent(rows[0].codigo)}`, request.url));

    const sid = process.env.MYPOS_SID?.trim();
    const wallet = process.env.MYPOS_WALLET_NUMBER?.trim();
    const keyIndex = process.env.MYPOS_KEY_INDEX?.trim() || "1";
    const privateKey = process.env.MYPOS_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
    const apiUrl = process.env.MYPOS_CHECKOUT_URL?.trim() || "https://www.mypos.com/vmp/checkout";

    if (!sid || !wallet || !privateKey) {
      return new NextResponse("Falta configurar las credenciales de Checkout de myPOS.", { status: 503 });
    }

    const memberResponse = await fetch(`${url}/rest/v1/afiliados?select=nombre,apellidos,email&id=eq.${encodeURIComponent(rows[0].afiliado_id)}&limit=1`, { headers: headers(key), cache: "no-store" });
    if (!memberResponse.ok) return new NextResponse("No se pudieron cargar los datos del titular.", { status: 502 });
    const members = await memberResponse.json() as Array<{ nombre: string; apellidos: string; email: string }>;
    if (!members.length) return new NextResponse("Titular no encontrado.", { status: 404 });
    const member = members[0];
    const firstNames = member.nombre.trim();
    const familyName = member.apellidos.trim();

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
      CustomerEmail: member.email,
      CustomerFirstNames: firstNames,
      CustomerFamilyName: familyName,
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

    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pago seguro myPOS</title><style>body{font-family:system-ui,-apple-system,sans-serif;padding:32px;text-align:center;background:#f5f7f8;color:#101820}button{border:0;border-radius:12px;padding:16px 24px;background:#f5b400;color:#101820;font-weight:800;font-size:16px;cursor:pointer}</style></head><body><h2>Preparando tu pago seguro…</h2><p>Serás enviado a myPOS para completar el pago de 4,99 €.</p><form id="mypos" method="post" action="${htmlEscape(apiUrl)}">${fields}<button type="submit">Continuar al pago seguro</button></form><script>window.setTimeout(function(){document.getElementById("mypos").submit()},50)</script></body></html>`;
    return new NextResponse(html, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("myPOS checkout error:", error);
    return new NextResponse("No se pudo iniciar el pago myPOS.", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const raw = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = raw?.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "").replace(/[•·]/g, "");
  return { url, key };
}

function dbHeaders(key: string) {
  const h: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  if (!key.startsWith("sb_secret_")) h.Authorization = `Bearer ${key}`;
  return h;
}

/**
 * myPOS signs every notification field except Signature.
 * The signature is always the last POST parameter. We therefore preserve
 * the incoming URL-encoded parameter order and verify the exact payload
 * supplied by myPOS with the merchant's myPOS API public RSA key.
 */
function verifyMyPosSignature(form: FormData, publicKey: string) {
  const signatureValue = String(form.get("Signature") || "").trim();
  if (!signatureValue) return false;

  const pairs: string[] = [];
  for (const [key, value] of form.entries()) {
    if (key === "Signature") continue;
    pairs.push(`${key}=${String(value)}`);
  }

  try {
    return crypto.verify(
      "RSA-SHA256",
      Buffer.from(pairs.join("&"), "utf8"),
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(signatureValue, "base64"),
    );
  } catch (error) {
    console.error("myPOS signature verification error:", error);
    return false;
  }
}

async function findCertificate(url: string, key: string, orderId: string) {
  const response = await fetch(
    `${url}/rest/v1/certificados?select=id,codigo,estado_pago,estado_emision&codigo=eq.${encodeURIComponent(orderId)}&limit=1`,
    { headers: dbHeaders(key), cache: "no-store" },
  );
  if (!response.ok) throw new Error("database_lookup_failed");
  const rows = await response.json() as Array<{
    id: string;
    codigo: string;
    estado_pago: string;
    estado_emision: string;
  }>;
  return rows[0] || null;
}

async function updateCertificate(url: string, key: string, id: string, paid: boolean) {
  const patch = paid
    ? { estado_pago: "pagado", estado_emision: "emitido", emitido_at: new Date().toISOString() }
    : { estado_pago: "pendiente", estado_emision: "pendiente" };

  const response = await fetch(`${url}/rest/v1/certificados?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...dbHeaders(key), Prefer: "return=minimal" },
    body: JSON.stringify(patch),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("database_update_failed");
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const method = String(form.get("IPCmethod") || "").trim();
    const orderId = String(form.get("OrderID") || "").trim();
    const amount = String(form.get("Amount") || "").trim();
    const currency = String(form.get("Currency") || "").trim().toUpperCase();

    if (!["IPCPurchaseNotify", "IPCPurchaseRollback"].includes(method)) {
      return new NextResponse("Invalid method", { status: 400 });
    }

    if (!orderId || amount !== "4.99" || currency !== "EUR") {
      return new NextResponse("Invalid payment", { status: 400 });
    }

    const publicKey = process.env.MYPOS_API_PUBLIC_KEY?.trim();
    if (!publicKey) {
      console.error("Missing MYPOS_API_PUBLIC_KEY");
      return new NextResponse("Server not configured", { status: 503 });
    }

    if (!verifyMyPosSignature(form, publicKey)) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const { url, key } = supabaseConfig();
    if (!url || !key) return new NextResponse("Server not configured", { status: 503 });

    const certificate = await findCertificate(url, key, orderId);
    if (!certificate) return new NextResponse("Order not found", { status: 404 });

    if (method === "IPCPurchaseRollback") {
      await updateCertificate(url, key, certificate.id, false);
      return new NextResponse("OK", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (certificate.estado_pago === "pagado" && certificate.estado_emision === "emitido") {
      return new NextResponse("OK", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    await updateCertificate(url, key, certificate.id, true);

    return new NextResponse("OK", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("myPOS PurchaseNotify error:", error);
    return new NextResponse("Invalid notification", { status: 400 });
  }
}

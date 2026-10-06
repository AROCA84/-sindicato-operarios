import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { supabaseConfig, headers, supabaseFetch } from "@/lib/supabase-server";

export const runtime = "nodejs";

/**
 * myPOS signs every notification field except Signature.
 * The signature is always the last POST parameter. We preserve
 * the incoming URL-encoded parameter order and verify the exact payload
 * supplied by myPOS with the merchant's myPOS API public RSA key.
 */
function verifyMyPosSignature(rawBody: string, publicKey: string) {
  const params = new URLSearchParams(rawBody);
  const signatureValue = (params.get("Signature") || "").trim();
  if (!signatureValue) return false;

  const values: string[] = [];
  for (const [key, value] of params.entries()) {
    if (key === "Signature") continue;
    values.push(value);
  }

  try {
    const concatenated = Buffer.from(Buffer.from(values.join("-"), "utf8").toString("base64"), "utf8");
    return crypto.verify(
      "RSA-SHA256",
      concatenated,
      { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
      Buffer.from(signatureValue, "base64"),
    );
  } catch (error) {
    console.error("myPOS signature verification error:", error);
    return false;
  }
}

async function findCertificate(url: string, key: string, orderId: string) {
  // Query by REAL column: codigo_certificado (not codigo)
  const response = await supabaseFetch(
    `${url}/rest/v1/certificados?select=id,codigo_certificado,pago_realizado,estado&codigo_certificado=eq.${encodeURIComponent(orderId)}&limit=1`,
    { headers: headers(key), cache: "no-store" },
  );
  if (!response.ok) throw new Error("database_lookup_failed");
  const rows = await response.json() as Array<{
    id: string;
    codigo_certificado: string;
    pago_realizado: boolean;
    estado: string;
  }>;
  return rows[0] || null;
}

async function updateCertificate(url: string, key: string, id: string, paid: boolean) {
  // Update with REAL columns: pago_realizado (not estado_pago), estado (not estado_emision), fecha_emision (not emitido_at)
  const patch = paid
    ? { pago_realizado: true, estado: "emitido", fecha_emision: new Date().toISOString() }
    : { pago_realizado: false, estado: "pendiente" };

  const response = await supabaseFetch(`${url}/rest/v1/certificados?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...headers(key), Prefer: "return=minimal" },
    body: JSON.stringify(patch),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("database_update_failed");
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const form = new URLSearchParams(rawBody);
    const method = String(form.get("IPCmethod") || "").trim();
    const orderId = String(form.get("OrderID") || "").trim();
    const amount = String(form.get("Amount") || "").trim();
    const currency = String(form.get("Currency") || "").trim().toUpperCase();

    if (!["IPCPurchaseNotify", "IPCPurchaseRollback"].includes(method)) {
      return new NextResponse("Invalid method", { status: 400 });
    }

    // Server validates amount and currency — client cannot forge price
    if (!orderId || amount !== "4.99" || currency !== "EUR") {
      return new NextResponse("Invalid payment", { status: 400 });
    }

    const publicKey = process.env.MYPOS_API_PUBLIC_KEY?.trim();
    if (!publicKey) {
      console.error("Missing MYPOS_API_PUBLIC_KEY");
      return new NextResponse("Server not configured", { status: 503 });
    }

    if (!verifyMyPosSignature(rawBody, publicKey)) {
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

    if (certificate.pago_realizado && certificate.estado === "emitido") {
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

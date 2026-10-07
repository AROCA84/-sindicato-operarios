/**
 * Internal preview routes (simulated approved test / certificate without payment)
 * are only available when explicitly enabled on the server. Never enable in production.
 */
export function internalPreviewEnabled() {
  return process.env.ENABLE_INTERNAL_PREVIEW === "1";
}

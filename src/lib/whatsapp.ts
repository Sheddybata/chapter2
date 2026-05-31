export const CAMPAIGN_WHATSAPP = "2348077490843";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${CAMPAIGN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

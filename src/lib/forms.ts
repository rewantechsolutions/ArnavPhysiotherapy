import { site } from "@/lib/site";

export type SubmitPayload = Record<string, string | number | undefined>;

/** Build a clean, readable WhatsApp message from a submission payload. */
export function buildWhatsAppMessage(subject: string, data: SubmitPayload) {
  const lines = [`Subject: ${subject}`, "", ...Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "" && v !== null)
    .map(([k, v]) => `${prettyKey(k)}: ${String(v)}`)];
  return lines.join("\n");
}

function prettyKey(k: string) {
  return k.replace(/[_-]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export function whatsappUrl(subject: string, data: SubmitPayload) {
  const text = encodeURIComponent(buildWhatsAppMessage(subject, data));
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

/** Submit to Formspree in parallel, then open WhatsApp with the same content prefilled. */
export async function submitLead(subject: string, data: SubmitPayload, formspreeUrl: string = site.formspree) {
  const body = { _subject: subject, ...data };
  try {
    await fetch(formspreeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Ignore Formspree issues and continue to open WhatsApp as the primary user-confirmation step.
  }
  try {
    window.open(whatsappUrl(subject, data), "_blank", "noopener,noreferrer");
  } catch {
    /* ignore popup block */
  }
  return true;
}

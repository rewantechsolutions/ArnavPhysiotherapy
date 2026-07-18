import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/lib/site";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { submitLead } from "@/lib/forms";

const phonePattern = /^[+]?[-\d\s()]{7,15}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Arnav Physiotherapy — Jhansi" },
      { name: "description", content: `Visit or contact ${site.name} in Jhansi. Call, email or send us a message.` },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: String(f.get("name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      email: String(f.get("email") ?? ""),
      subject: String(f.get("subject") ?? "General enquiry"),
      message: String(f.get("message") ?? ""),
    };
    const name = payload.name.trim();
    const phone = payload.phone.trim();
    const email = payload.email.trim();
    if (!name || !phone || !payload.message.trim()) {
      toast.error("Please fill name, phone and message.");
      return;
    }
    if (!phonePattern.test(phone)) {
      toast.error("Please enter a valid phone/WhatsApp number.");
      return;
    }
    if (email && !emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    try {
      await submitLead("New Contact Message — Arnav Physio", payload, site.formspreeContact);
      setSent(true);
      toast.success("Thanks! We'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Couldn't send. Please try again or call us.");
    } finally {
      setBusy(false);
    }
  };

  return (

    <>
      <PageHero accent="coral" eyebrow="Contact" title="Let's talk about your recovery"
        subtitle="Call, WhatsApp, or send us a message — we usually reply the same day and serve patients across Jhansi and nearby areas."
        breadcrumbs={[{ label: "Contact" }]} />

      <section className="py-14 md:py-20">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            {[
              { Icon: MapPin, title: "Visit us", body: site.address },
              { Icon: Phone, title: "Call", body: `${site.phone1} · ${site.phone2}` },
              { Icon: Mail, title: "Email", body: site.email },
              { Icon: Clock, title: "Hours", body: site.hours },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-teal text-white"><Icon className="h-5 w-5" /></span>
                <div>
                  <div className="text-sm font-bold">{title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{body}</div>
                </div>
              </div>
            ))}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 text-sm font-semibold shadow-soft w-max">
              <MessageCircle className="h-4 w-4" /> WhatsApp us instantly
            </a>
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <iframe
                title="Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
                className="w-full h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl bg-white border border-border p-6 md:p-8 shadow-card space-y-4"
          >
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name"><input name="name" required maxLength={80} className="input" placeholder="Your name" /></Field>
              <Field label="Phone"><input name="phone" required maxLength={20} type="tel" inputMode="tel" className="input" placeholder="+91" /></Field>
            </div>
            <Field label="Email"><input name="email" type="email" maxLength={120} inputMode="email" className="input" placeholder="you@example.com" /></Field>
            <Field label="Subject"><input name="subject" maxLength={120} className="input" placeholder="Reason for contact" /></Field>
            <Field label="Message"><textarea name="message" required rows={5} maxLength={1000} className="input resize-none" placeholder="Tell us a bit about what you're experiencing…" /></Field>
            <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-full gradient-teal px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-70">
              {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Send message</>}
            </button>
            {sent && <p className="text-xs text-primary">Thanks — your message is on its way. WhatsApp opened so you can send us the same instantly.</p>}
            <style>{`.input{width:100%;min-height:44px;border:1px solid var(--border);border-radius:14px;padding:12px 14px;font-size:14px;background:white;outline:none;transition:border-color .2s, box-shadow .2s;}.input:focus{border-color:var(--primary);box-shadow:0 0 0 4px color-mix(in oklab, var(--primary) 15%, transparent);}`}</style>
          </form>

        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-foreground/70">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/lib/site";
import { services } from "@/lib/data";
import { useState } from "react";
import { Calendar, Clock, Send, Phone, MapPin, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/forms";

const phonePattern = /^[+]?[-\d\s()]{7,15}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Appointment — Arnav Physiotherapy Jhansi" },
      { name: "description", content: "Book a personalised physiotherapy assessment with Dr. Dushyant Singh at Arnav Physio, Jhansi." },
      { property: "og:title", content: "Book Appointment — Arnav Physiotherapy" },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

const times = ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"];

function BookPage() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: String(f.get("name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      email: String(f.get("email") ?? ""),
      age: String(f.get("age") ?? ""),
      service: String(f.get("service") ?? ""),
      date: String(f.get("date") ?? ""),
      time: String(f.get("time") ?? ""),
      condition: String(f.get("condition") ?? ""),
    };
    const name = payload.name.trim();
    const phone = payload.phone.trim();
    const email = payload.email.trim();
    if (!name || !phone || !payload.service || !payload.date || !payload.time) {
      toast.error("Please fill your name, phone, service, date and preferred time.");
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
      await submitLead("New Appointment Request — Arnav Physio", payload, site.formspreeAppointment);
      setDone(true);
      toast.success("Appointment request sent — WhatsApp opened to confirm.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Couldn't send. Please try again or call us directly.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHero accent="coral" eyebrow="Book Appointment" title="Book a personalised assessment"
        subtitle={`Evening consultations with ${site.doctor} — ${site.hours}.`}
        breadcrumbs={[{ label: "Book" }]} />

      <section className="py-14 md:py-20">
        <div className="container-page grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl bg-surface p-6 border border-border">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Clinic</div>
              <div className="mt-2 font-bold">{site.name}</div>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> {site.address}</li>
                <li className="flex gap-2"><Phone className="h-4 w-4 text-primary mt-0.5" /> {site.phone1}</li>
                <li className="flex gap-2"><Clock className="h-4 w-4 text-primary mt-0.5" /> {site.hours}</li>
              </ul>
            </div>
            <div className="rounded-3xl gradient-teal text-white p-6">
              <h3 className="font-bold text-lg">What to expect</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                {["45–60 minute assessment", "Clear diagnosis & plan", "First treatment same day"].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5" /> {t}</li>
                ))}
              </ul>
            </div>
          </aside>

          {done ? (
            <div className="lg:col-span-8 rounded-3xl bg-white border border-border shadow-card p-10 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full gradient-teal text-white"><Check className="h-7 w-7" /></div>
              <h2 className="mt-5 text-2xl font-bold">Request received</h2>
              <p className="mt-2 text-muted-foreground">Thank you. We've also opened WhatsApp so you can send the same details to us instantly.</p>
              <button onClick={() => setDone(false)} className="mt-6 rounded-full border border-border px-6 py-3 text-sm font-semibold">Book another</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="lg:col-span-8 rounded-3xl bg-white border border-border shadow-card p-6 md:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name"><input name="name" required maxLength={80} className="input" placeholder="Your name" /></Field>
                <Field label="Phone / WhatsApp"><input name="phone" required maxLength={20} type="tel" inputMode="tel" className="input" placeholder="+91" /></Field>
                <Field label="Email"><input name="email" type="email" maxLength={120} inputMode="email" className="input" placeholder="you@example.com" /></Field>
                <Field label="Age"><input name="age" type="number" min={1} max={120} className="input" placeholder="e.g. 34" /></Field>
              </div>
              <Field label="Service">
                <select name="service" required className="input">
                  <option value="">Select a service</option>
                  {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                </select>
              </Field>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Preferred date">
                  <div className="relative">
                    <input name="date" type="date" required className="input pl-11" />
                    <Calendar className="h-4 w-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </Field>
                <Field label="Preferred time">
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((t) => (
                      <label key={t} className="cursor-pointer">
                        <input type="radio" name="time" value={t} className="peer sr-only" defaultChecked={t === "05:30 PM"} />
                        <div className="rounded-xl border border-border bg-white text-center py-2.5 text-xs font-semibold peer-checked:gradient-teal peer-checked:text-white peer-checked:border-transparent transition">{t}</div>
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
              <Field label="Briefly describe your condition">
                <textarea name="condition" rows={4} maxLength={1000} className="input resize-none" placeholder="Where does it hurt? When did it start?" />
              </Field>
              <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-full gradient-teal px-7 py-3.5 text-sm font-semibold text-white shadow-glow disabled:opacity-70">
                {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Request Appointment</>}
              </button>
              <p className="text-xs text-muted-foreground">On submit we'll email the clinic and also open WhatsApp with your details prefilled so you can confirm instantly.</p>
              <style>{`.input{width:100%;min-height:44px;border:1px solid var(--border);border-radius:14px;padding:12px 14px;font-size:14px;background:white;outline:none;transition:border-color .2s, box-shadow .2s;}.input:focus{border-color:var(--primary);box-shadow:0 0 0 4px color-mix(in oklab, var(--primary) 15%, transparent);}`}</style>
            </form>
          )}
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

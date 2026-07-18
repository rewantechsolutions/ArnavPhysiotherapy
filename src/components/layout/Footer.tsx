import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Instagram, Facebook, Mail, Phone, MapPin, Clock,
  ArrowRight, Send, Heart, MessageCircle,
} from "lucide-react";
import { site, nav } from "@/lib/site";
import { services, conditions } from "@/lib/data";
import logo from "../../assets/logo.png";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 relative overflow-hidden text-white/85">
      {/* Layered animated background */}
      <div className="absolute inset-0 bg-[oklch(0.18_0.04_220)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.22_0.06_195)] via-[oklch(0.18_0.04_220)] to-[oklch(0.16_0.03_240)]" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px] animate-float" />
      <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-brand-cyan/20 blur-[140px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Newsletter band */}
      <div className="relative border-b border-white/10">
        <div className="container-page py-10 grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-glow">Stay Informed</div>
            <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white leading-tight">
              Weekly recovery tips, delivered to your inbox.
            </h3>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 p-1.5 pl-5 shadow-glow"
          >
            <Mail className="h-4 w-4 text-white/50 shrink-0" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="bg-transparent flex-1 outline-none text-sm placeholder:text-white/40 text-white py-2 min-w-0"
            />
            <button className="inline-flex shrink-0 items-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition">
              Subscribe <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main grid — spans now sum correctly at every breakpoint:
          mobile: 1 col (stacked)
          sm/md:  6 cols  -> brand(6) + 3x link cols(2 each=6) + contact(6) = wraps in two neat rows
          lg:     12 cols -> brand(3) + 3x link cols(2 each=6) + contact(3) = 12 */}
      <div className="relative container-page py-8 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6 lg:grid-cols-12">
        <div className="sm:col-span-6 lg:col-span-3 space-y-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-1.5 shadow-glow shrink-0">
              <img src={logo} alt={`${site.name} – Physiotherapy Clinic Jhansi Logo`} className="h-full w-full object-contain" />
            </div>
            <div className="leading-none">
              <div className="text-lg font-bold text-white">{site.short}</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-glow">Physiotherapy Centre</div>
            </div>
          </Link>
          <p className="text-sm text-white/70 max-w-sm leading-relaxed">
            Evidence-based physiotherapy and rehabilitation in Jhansi — led by {site.doctor}, {site.credentials}.
            Move better, recover faster, live pain-free.
          </p>

          {/* Map */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl overflow-hidden border border-white/10 shadow-soft hover:shadow-glow transition group"
          >
            <div className="aspect-[16/8] relative">
              <iframe
                title="Clinic location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
                className="absolute inset-0 h-full w-full grayscale-[30%] group-hover:grayscale-0 transition"
                loading="lazy"
              />
            </div>
          </a>

          <div className="flex gap-2">
            {[
              { Icon: Facebook, href: site.social.facebook, label: "Facebook" },
              { Icon: Instagram, href: site.social.instagram, label: "Instagram" },
              { Icon: MessageCircle, href: `https://wa.me/${site.whatsapp}`, label: "WhatsApp" },
            ].map(({ Icon, href, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.05 }}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/15 hover:bg-primary hover:border-primary transition"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <FooterCol title="Quick Links" items={nav.map((n) => ({ label: n.label, to: n.to }))} />
        <FooterCol
          title="Services"
          items={services.slice(0, 6).map((s) => ({ label: s.name, to: `/services/${s.slug}` }))}
        />
        <FooterCol
          title="We Treat"
          items={conditions.slice(0, 6).map((c) => ({ label: c.name, to: `/conditions/${c.slug}` }))}
        />

        <div className="sm:col-span-6 lg:col-span-3 space-y-4">
          <h4 className="text-white font-semibold text-base">Get in touch</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 border border-white/10">
                <MapPin className="h-4 w-4 text-primary-glow" />
              </div>
              <span className="pt-1.5">{site.address}</span>
            </li>
            <li className="flex gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 border border-white/10">
                <Phone className="h-4 w-4 text-primary-glow" />
              </div>
              <div className="pt-1">
                <a href={`tel:${site.phoneRaw1}`} className="block hover:text-white">{site.phone1}</a>
                <a href={`tel:${site.phoneRaw2}`} className="block hover:text-white">{site.phone2}</a>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 border border-white/10">
                <Mail className="h-4 w-4 text-primary-glow" />
              </div>
              <a href={`mailto:${site.email}`} className="pt-1.5 hover:text-white break-all">{site.email}</a>
            </li>
            <li className="flex gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 border border-white/10">
                <Clock className="h-4 w-4 text-primary-glow" />
              </div>
              <span className="pt-1.5">{site.hours}</span>
            </li>
          </ul>
          <Link
            to="/book"
            className="mt-2 inline-flex items-center gap-2 rounded-full gradient-teal px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition"
          >
            Book Appointment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="container-page py-3 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-[10px] sm:text-[11px] text-white/60">
          <div className="text-center sm:text-left">
            <p>© {year} {site.name}.</p>
          </div>
          <div className="text-center">
            <a
              href="https://rewantechsolutions.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              Designed and Developed by Rewantechsolutions
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div className="sm:col-span-3 lg:col-span-2 space-y-2">
      <h4 className="text-white font-semibold text-base">{title}</h4>
      <ul className="space-y-1 text-sm">
        {items.map((it) => (
          <li key={it.to}>
            <Link
              to={it.to}
              className="group inline-flex items-center gap-1 text-white/70 hover:text-white transition"
            >
              <span className="h-1 w-0 rounded-full bg-primary-glow group-hover:w-2.5 transition-all" />
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
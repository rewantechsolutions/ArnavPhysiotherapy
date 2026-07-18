import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { Phone, MessageCircle, Calendar } from "lucide-react";

export function BookCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-4xl gradient-teal p-8 md:p-16 text-white shadow-glow"
        >
          <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80"
              alt="" className="w-full h-full object-cover mix-blend-overlay" />
          </div>
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">Ready when you are</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-[1.1]">
                Ready to move<br />pain-free again?
              </h2>
              <p className="mt-4 text-white/85 max-w-md">
                Book a personalised assessment with {site.doctor}. We'll design a plan built entirely around your recovery.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-primary shadow-soft hover:scale-[1.02] transition">
                <Calendar className="h-4 w-4" /> Book Appointment
              </Link>
              <a href={`tel:${site.phoneRaw1}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/30 px-7 py-4 text-sm font-semibold text-white hover:bg-white/20 transition">
                <Phone className="h-4 w-4" /> Call {site.phone1}
              </a>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-semibold text-white hover:brightness-110 transition">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

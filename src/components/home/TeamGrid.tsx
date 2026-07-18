import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { doctors } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

export function TeamGrid() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container-page">
        <SectionHeader eyebrow="Meet Our Experts" title="Physiotherapists who listen" subtitle="Certified specialists led by a MPT (Sports) physiotherapist — care you can trust." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group rounded-3xl bg-white border border-border shadow-card overflow-hidden card-lift card-lift-hover"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">{d.role}</div>
                <h3 className="mt-2 text-xl font-bold">{d.name}</h3>
                <p className="text-sm text-muted-foreground">{d.qualification}</p>
                <p className="mt-3 text-sm text-foreground/80">{d.specialization}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d.experience}</p>
                <Link to="/book" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { services } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BookCTA } from "@/components/home/BookCTA";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Physiotherapy Services in Jhansi — Arnav Physio" },
      { name: "description", content: "Explore physiotherapy services in Jhansi for manual therapy, exercise therapy, dry needling, electrotherapy, shockwave therapy, wax therapy and neuro rehab." },
    ],
    links: [{ rel: "canonical", href: "https://arnavphysiotherapy.com/services" }],
  }),
  component: ServicesPage,
});


import servicesBanner from "../assets/servicesbanner.jpg";
function ServicesPage() {
  return (
    <>
      <PageHero accent="teal" eyebrow="Services" title="Physiotherapy that meets you where you are"
        subtitle="A complete toolkit of hands-on and modern therapy — combined into a plan built around your goals."
        breadcrumbs={[{ label: "Services" }]} 
        image={servicesBanner}
        />
      <section className="py-16 md:py-24">
        <div className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.slug}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}>
              <Link to="/services/$slug" params={{ slug: s.slug }}
                className="group block h-full rounded-3xl overflow-hidden bg-white border border-border shadow-card card-lift card-lift-hover">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold group-hover:text-primary transition">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <BookCTA />
    </>
  );
}

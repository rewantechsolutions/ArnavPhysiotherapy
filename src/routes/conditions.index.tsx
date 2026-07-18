import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { conditions } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BookCTA } from "@/components/home/BookCTA";

export const Route = createFileRoute("/conditions/")({
  head: () => ({
    meta: [
      { title: "Conditions We Treat — Arnav Physiotherapy Jhansi" },
      { name: "description", content: "From back pain and sciatica to stroke rehab and sports injuries, see the full list of conditions treated by Arnav Physiotherapy Centre in Jhansi." },
    ],
    links: [{ rel: "canonical", href: "https://arnavpyhsiotherapy.com/conditions" }],
  }),
  component: ConditionsPage,
});

import conditionsBanner from "../assets/conditionsbanner.jpg";
function ConditionsPage() {
  return (
    <>
      <PageHero accent="rose" eyebrow="Conditions" title="Conditions we help you recover from"
        subtitle="Whether it's an everyday ache or a complex recovery, we've likely seen it — and we know exactly how to help."
        breadcrumbs={[{ label: "Conditions" }]}
        image={conditionsBanner}
        />
      <section className="py-16 md:py-24">
        <div className="container-page grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {conditions.map((c, i) => (
            <motion.div key={c.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}>
              <Link to="/conditions/$slug" params={{ slug: c.slug }}
                className="group flex flex-col items-center text-center rounded-3xl bg-white border border-border shadow-card p-5 card-lift card-lift-hover h-full">
                <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden ring-4 ring-white shadow-soft">
                  <img src={c.image} alt={c.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="mt-4 font-bold text-foreground group-hover:text-primary transition">{c.name}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{c.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                  Learn <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <BookCTA />
    </>
  );
}

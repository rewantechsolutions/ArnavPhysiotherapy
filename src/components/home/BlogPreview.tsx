import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogs } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

export function BlogPreview() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container-page">
        <SectionHeader eyebrow="Journal" title="From the Arnav Physio Journal" subtitle="Practical, evidence-based reads on movement, recovery and everyday wellness." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((b, i) => (
            <motion.div key={b.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link to="/blog/$slug" params={{ slug: b.slug }} className="group block rounded-3xl bg-white border border-border shadow-card overflow-hidden card-lift card-lift-hover h-full">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-primary">
                    <span>{b.category}</span><span className="text-border">•</span><span className="text-muted-foreground">{b.read}</span>
                  </div>
                  <h3 className="mt-3 text-base md:text-lg font-bold leading-snug group-hover:text-primary transition">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Read <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

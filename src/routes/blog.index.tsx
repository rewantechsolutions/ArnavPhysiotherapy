import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { blogs } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — Arnav Physiotherapy" },
      { name: "description", content: "Practical, evidence-based reads on movement, recovery and wellness." },
    ],
  }),
  component: BlogList,
});

function BlogList() {
  const [first, ...rest] = blogs;
  return (
    <>
      <PageHero accent="amber" eyebrow="Journal" title="Notes on movement and recovery"
        subtitle="Practical, evidence-based reads for everyday wellness."
        breadcrumbs={[{ label: "Blog" }]} />
      <section className="py-14 md:py-20">
        <div className="container-page">
          <Link to="/blog/$slug" params={{ slug: first.slug }}
            className="group grid lg:grid-cols-2 gap-8 items-center rounded-3xl bg-white border border-border shadow-card overflow-hidden">
            <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
              <img src={first.image} alt={first.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 md:p-10">
              <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{first.category} • {first.read}</div>
              <h2 className="mt-3 text-2xl md:text-4xl font-bold group-hover:text-primary transition">{first.title}</h2>
              <p className="mt-3 text-muted-foreground">{first.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read article <ArrowRight className="h-4 w-4" /></span>
            </div>
          </Link>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {rest.map((b, i) => (
              <motion.div key={b.slug}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}>
                <Link to="/blog/$slug" params={{ slug: b.slug }}
                  className="group block rounded-3xl bg-white border border-border shadow-card overflow-hidden card-lift card-lift-hover h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{b.category} • {b.read}</div>
                    <h3 className="mt-2 text-lg font-bold group-hover:text-primary transition">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

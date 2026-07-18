import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { Testimonials } from "@/components/home/Testimonials";
import { BookCTA } from "@/components/home/BookCTA";
import { testimonials } from "@/lib/data";
import { Star } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Patient Stories — Arnav Physiotherapy" },
      { name: "description", content: "Real recovery stories from our patients in Jhansi." },
    ],
  }),
  component: () => (
    <>
      <PageHero accent="violet" eyebrow="Success Stories" title="Real recoveries. Real people."
        subtitle="Every story below is from someone who trusted us with their recovery."
        breadcrumbs={[{ label: "Testimonials" }]} />
      <Testimonials />
      <section className="py-14 md:py-20 bg-surface">
        <div className="container-page grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-3xl bg-white border border-border p-6 shadow-card">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-foreground/90 leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <img src={t.image} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <BookCTA />
    </>
  ),
});

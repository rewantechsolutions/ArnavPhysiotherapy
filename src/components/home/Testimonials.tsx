import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeader eyebrow="Success Stories" title="Real recoveries. Real people." subtitle="Every review below is from someone who walked into our clinic in pain — and walked out moving freely again." />
        <div className="relative mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white border border-border shadow-card p-8 md:p-12 text-center">
            <Quote className="mx-auto h-9 w-9 text-primary/40" />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <p className="mt-6 text-lg md:text-2xl leading-relaxed text-foreground font-medium">
                  “{t.quote}”
                </p>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <img src={t.image} alt={t.name} className="mt-2 h-14 w-14 rounded-full object-cover border-2 border-white shadow-soft" />
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button aria-label="Previous" onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white border border-border shadow-soft hover:bg-muted">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Go to ${k + 1}`}
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all ${k === i ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
            <button aria-label="Next" onClick={() => setI((v) => (v + 1) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white border border-border shadow-soft hover:bg-muted">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

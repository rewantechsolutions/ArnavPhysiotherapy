import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20 md:py-28">
      <div className="container-page grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHeader align="left" eyebrow="FAQ" title="Answers, before you ask." subtitle="Common questions about physiotherapy, appointments and what to expect at Arnav Physio." />
        </div>
        <div className="lg:col-span-7 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = i === open;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl bg-white border border-border shadow-card overflow-hidden"
              >
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between text-left p-5 md:p-6 gap-4">
                  <span className="font-semibold text-foreground text-[15px] md:text-base">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${isOpen ? "gradient-teal text-white" : "bg-muted text-foreground"} transition`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-6 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ClipboardCheck, Stethoscope, Sparkles, Activity, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui-primitives/Section";

const steps = [
  { icon: ClipboardCheck, title: "Assessment", desc: "A thorough movement and pain assessment." },
  { icon: Stethoscope, title: "Diagnosis", desc: "A clear diagnosis you actually understand." },
  { icon: Sparkles, title: "Treatment", desc: "Hands-on care combined with modalities." },
  { icon: Activity, title: "Recovery", desc: "Guided exercise to restore full function." },
  { icon: ShieldCheck, title: "Prevention", desc: "Home routines to keep the pain away." },
];

export function ProcessTimeline() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeader eyebrow="Recovery Process" title="A calm, staged path back to you" subtitle="Every patient follows the same simple, transparent journey — designed around real outcomes, not quick fixes." />
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-[46px] h-px bg-border" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
            className="hidden md:block absolute left-0 right-0 top-[46px] h-px gradient-teal"
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white border border-border shadow-card relative z-10">
                  <s.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">Step {i + 1}</div>
                <div className="mt-1 text-lg font-bold">{s.title}</div>
                <p className="mt-1 text-sm text-muted-foreground max-w-[180px] mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

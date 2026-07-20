import { motion } from "framer-motion";
import { GraduationCap, Microscope, Cpu, HeartPulse } from "lucide-react";

const items = [
  { icon: GraduationCap, title: "Certified Physiotherapists", desc: "MPT-qualified specialists trained in the latest evidence-based practice." },
  { icon: Microscope, title: "Evidence-Based Care", desc: "Every treatment plan is grounded in current research and real outcomes." },
  { icon: Cpu, title: "Advanced Equipment", desc: "Modern electrotherapy, shockwave and rehab tools in a calm, private setting." },
  { icon: HeartPulse, title: "Personalised Recovery", desc: "One plan does not fit all — every programme is designed around you." },
];

export function WhyChoose() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="w-full min-w-0 rounded-3xl border border-border bg-white p-6 shadow-card card-lift card-lift-hover"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-teal text-white shadow-soft">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

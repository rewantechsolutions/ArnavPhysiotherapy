import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Award, Smile, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Happy Patients" },
  { icon: Award, value: 20, suffix: "+", label: "Years Experience" },
  { icon: Smile, value: 98, suffix: "%", label: "Recovery Rate" },
  { icon: Clock, value: 25000, suffix: "+", label: "Sessions Delivered" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2, ease: [0.2, 0.7, 0.2, 1] });
      return controls.stop;
    }
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-teal opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="container-page relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center text-white"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur border border-white/25">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-white/85 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

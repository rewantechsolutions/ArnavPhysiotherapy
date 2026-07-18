import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeartPulse, Dumbbell, Brain, Zap, ArrowRight } from "lucide-react";

const items = [
  {
    icon: HeartPulse,
    kicker: "Personalised Plan",
    title: "Start Your Recovery",
    desc: "One-on-one assessment and a plan built around your goals.",
    to: "/services/manual-therapy",
    tone: "from-teal-50 via-white to-white",
    iconBg: "gradient-teal",
    accent: "text-teal-600",
    ring: "group-hover:ring-teal-300/60",
  },
  {
    icon: Dumbbell,
    kicker: "Sports Rehab",
    title: "Return to Sport Stronger",
    desc: "Return-to-play pathway led by an MPT (Sports) specialist.",
    to: "/services/sports-rehabilitation",
    tone: "from-orange-50 via-white to-white",
    iconBg: "gradient-coral",
    accent: "text-orange-600",
    ring: "group-hover:ring-orange-300/60",
  },
  {
    icon: Brain,
    kicker: "Neuro Rehab",
    title: "Regain Movement",
    desc: "Post-stroke, Parkinson's & neurological recovery programmes.",
    to: "/services/neurological-physiotherapy",
    tone: "from-violet-50 via-white to-white",
    iconBg: "gradient-violet",
    accent: "text-violet-600",
    ring: "group-hover:ring-violet-300/60",
  },
  {
    icon: Zap,
    kicker: "Wax Therapy",
    title: "Warm Relief for Stiff Joints",
    desc: "Gentle heat-based care for stiffness, arthritis and chronic muscle tension.",
    to: "/services/wax-therapy",
    tone: "from-amber-50 via-white to-white",
    iconBg: "gradient-amber",
    accent: "text-amber-600",
    ring: "group-hover:ring-amber-300/60",
  },
];

// Premium "resolve into focus" reveal — no horizontal motion at all.
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 44,
    scale: 0.92,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export function QuickServices() {
  return (
    <section className="relative mt-20">
      <div className="container-page">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={cardVariants}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1], // expo-out — the "settle" feel premium sites use
              }}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <Link
                to={it.to}
                className={`group relative block h-full rounded-3xl bg-gradient-to-br ${it.tone} border border-border/60 p-6 shadow-card ring-1 ring-transparent ${it.ring} hover:shadow-glow hover:-translate-y-1.5 transition-all duration-500 overflow-hidden`}
              >
                {/* diagonal light sweep on hover */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out">
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12" />
                </div>

                <div className="relative z-10">
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${it.iconBg} text-white shadow-soft group-hover:scale-110 transition-transform duration-500`}
                  >
                    <it.icon className="h-5 w-5" />
                  </div>

                  <div className={`mt-5 text-[10px] font-bold uppercase tracking-[0.2em] ${it.accent}`}>
                    {it.kicker}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-foreground leading-snug">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
                    {it.desc}
                  </p>
                  <span
                    className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold ${it.accent} group-hover:gap-2.5 transition-all`}
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
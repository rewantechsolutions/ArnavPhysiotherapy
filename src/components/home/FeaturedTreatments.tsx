import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, HeartPulse, Dumbbell, Activity, Brain, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui-primitives/Section";

const cards = [
  {
    eyebrow: "Expert Care",
    title: "Expert Physiotherapy Care",
    desc: "One-to-one assessment and hands-on treatment led by qualified physiotherapists.",
    to: "/services/manual-therapy",
    Icon: HeartPulse,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    tag: "Manual Therapy",
    iconBg: "gradient-teal",
    scrim: "from-teal-900/75",
    badge: "text-teal-700",
    arrow: "text-teal-700",
  },
  {
    eyebrow: "Personalised",
    title: "Wellness Programmes",
    desc: "Structured exercise, posture and lifestyle plans for long-term prevention.",
    to: "/services/exercise-therapy",
    Icon: Activity,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    tag: "Exercise Therapy",
    iconBg: "gradient-emerald",
    scrim: "from-emerald-900/75",
    badge: "text-emerald-700",
    arrow: "text-emerald-700",
  },
  {
    eyebrow: "Trusted Recovery",
    title: "Sports Rehabilitation",
    desc: "Return-to-play pathways for athletes — from acute injury to peak performance.",
    to: "/services/sports-rehabilitation",
    Icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1200&q=80",
    tag: "Sports Rehab",
    iconBg: "gradient-coral",
    scrim: "from-orange-900/75",
    badge: "text-orange-700",
    arrow: "text-orange-700",
  },
  {
    eyebrow: "Long-Term Support",
    title: "Neurological Rehab",
    desc: "Post-stroke, Parkinson's and neuro-recovery programmes with measurable outcomes.",
    to: "/services/neurological-physiotherapy",
    Icon: Brain,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
    tag: "Neuro Rehab",
    iconBg: "gradient-violet",
    scrim: "from-violet-900/75",
    badge: "text-violet-700",
    arrow: "text-violet-700",
  },
  {
    eyebrow: "Gentle Relief",
    title: "Wax Therapy",
    desc: "Warm, soothing therapy for stiff joints, muscle tension and everyday pain relief.",
    to: "/services/wax-therapy",
    Icon: Sparkles,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
    tag: "Wax Therapy",
    iconBg: "gradient-amber",
    scrim: "from-amber-900/75",
    badge: "text-amber-700",
    arrow: "text-amber-700",
  },
];

export function FeaturedTreatments() {
  return (
    <section className="pt-20 md:pt-28 pb-8">
      <div className="container-page">
        <SectionHeader
          eyebrow="What We Do"
          title="Care Built Around Your Recovery"
          subtitle="Four core programmes that cover almost every patient at Arnav Physiotherapy — each led by a specialist, backed by evidence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link
                to={c.to}
                className="group relative flex flex-col h-full rounded-3xl bg-white border border-border/70 shadow-card hover:shadow-glow hover:-translate-y-1.5 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden rounded-t-3xl">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.scrim} via-transparent to-transparent`} />
                  <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${c.badge} border border-white shadow-sm`}>
                    {c.eyebrow}
                  </span>
                </div>

                {/* Icon badge — sits on the seam, not clipped */}
                <div
                  className={`absolute left-5 top-[10.5rem] z-10 grid h-12 w-12 place-items-center rounded-2xl ${c.iconBg} text-white shadow-lg ring-4 ring-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}
                  aria-hidden
                >
                  <c.Icon className="h-[22px] w-[22px]" strokeWidth={2} />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 pt-9">
                  <h3 className="text-[17px] font-bold text-foreground leading-snug">{c.title}</h3>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed flex-1">{c.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{c.tag}</span>
                    <span className={`inline-flex items-center gap-1 text-[12px] font-semibold ${c.arrow} group-hover:gap-2 transition-all`}>
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

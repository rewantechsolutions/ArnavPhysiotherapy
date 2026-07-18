import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui-primitives/Section";
import { site } from "@/lib/site";
import aboutImage from '../../assets/about.png';
const points = [
  "Led by Dr. Dushyant Singh, BPT, MPT (Sports)",
  "Physiotherapist at District Hospital, Jhansi",
  "Modern equipment in a calm, private clinic",
  "One-on-one, unhurried sessions",
];

export function AboutBlock() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-3xl bg-primary/10 -z-10" />
          <div className="absolute -right-6 -bottom-6 h-40 w-40 rounded-full bg-brand-cyan/15 -z-10" />
          <img
            src={aboutImage}
            alt="Arnav Physiotherapy Centre"
            className="rounded-3xl shadow-glow w-full aspect-[4/5] object-cover"
          />
          <div className="absolute -right-4 bottom-8 md:right-6 md:bottom-14 rounded-2xl bg-white shadow-card border border-border px-5 py-4 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl gradient-teal text-white font-bold">20+</div>
            <div>
              <div className="text-sm font-bold">Years of care</div>
              <div className="text-xs text-muted-foreground">Serving Jhansi families</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow>About Arnav Physio</Eyebrow>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            A calmer, more personal way to <span className="text-gradient-teal">recover</span>.
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            {site.name} is a modern rehabilitation practice in the heart of Jhansi. We combine hands-on
            manual therapy, movement science and modern technology to help you recover fully — and stay
            that way. No rushed appointments. No cookie-cutter plans.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm md:text-[15px] text-foreground/80">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/about" className="inline-flex items-center gap-2 rounded-full gradient-teal px-6 py-3 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition">
              Our Story <ArrowRight className="h-4 w-4" />
            </Link>
            {/* <Link to="/team" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary/40 hover:text-primary transition">
              Meet the Team
            </Link> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

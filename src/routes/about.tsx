import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { AboutBlock } from "@/components/home/AboutBlock";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { WhyChoose } from "@/components/home/WhyChoose";
import { BookCTA } from "@/components/home/BookCTA";
import { motion } from "framer-motion";
import { DoctorProfile } from "@/components/home/DoctorProfile";
import { StatsCounter } from "@/components/home/StatsCounter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Arnav Physiotherapy Centre — Jhansi" },
      { name: "description", content: "Meet Dr. Dushyant Singh and learn how Arnav Physiotherapy Centre delivers evidence-based care for patients across Jhansi and nearby areas." },
      { property: "og:title", content: "About Arnav Physiotherapy Centre — Jhansi" },
      { property: "og:description", content: "A modern, evidence-based rehabilitation practice in Jhansi with a human-centred approach to recovery." },
    ],
    links: [{ rel: "canonical", href: "https://arnavpyhsiotherapy.com/about" }],
  }),
  component: AboutPage,
});

const stats = [
  { n: "20+", l: "Years of practice" },
  { n: "10,000+", l: "Patients treated" },
  { n: "12+", l: "Conditions treated" },
  { n: "98%", l: "Would recommend" },
];

import aboutBanner from "../assets/aboutbanner.jpg";

function AboutPage() {
  return (
    <>
      <PageHero
        image={aboutBanner}

        accent="violet"
        eyebrow="About Us"
        title="A quieter, more human way to recover"
        subtitle="We are a modern physiotherapy and rehabilitation practice in Jhansi, blending evidence-based care with genuine, unhurried attention."
        breadcrumbs={[{ label: "About" }]}
      />


      <AboutBlock />
      <StatsCounter />

      <WhyChoose />

      <DoctorProfile />


      <ProcessTimeline />
      <BookCTA />
    </>
  );
}

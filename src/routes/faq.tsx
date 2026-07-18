import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { FAQ } from "@/components/home/FAQ";
import { BookCTA } from "@/components/home/BookCTA";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Physiotherapy FAQs — Arnav Physio Jhansi" },
      { name: "description", content: "Answers to common physiotherapy questions from our patients." },
    ],
  }),
  component: () => (
    <>
      <PageHero accent="sky" eyebrow="FAQ" title="Your questions, answered"
        subtitle="Everything you need to know before booking your first session."
        breadcrumbs={[{ label: "FAQ" }]} />
      <FAQ />
      <BookCTA />
    </>
  ),
});

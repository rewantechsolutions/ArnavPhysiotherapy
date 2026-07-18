import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { TeamGrid } from "@/components/home/TeamGrid";
import { BookCTA } from "@/components/home/BookCTA";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Physiotherapists — Arnav Physio Jhansi" },
      { name: "description", content: "Meet the certified physiotherapists at Arnav Physio, Jhansi." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <>
      <PageHero accent="violet" eyebrow="Our Team" title="Certified physiotherapists who care"
        subtitle="A small, senior team led by a MPT (Sports) specialist — trained in evidence-based rehabilitation."
        breadcrumbs={[{ label: "Team" }]} />
      <TeamGrid />
      <BookCTA />
    </>
  );
}

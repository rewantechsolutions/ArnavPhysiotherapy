import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { QuickServices } from "@/components/home/QuickServices";
import { FeaturedTreatments } from "@/components/home/FeaturedTreatments";
import { WhyChoose } from "@/components/home/WhyChoose";
import { StatsCounter } from "@/components/home/StatsCounter";
import { BodyMapFinder } from "@/components/home/BodyMapFinder";
import { ConditionsSlider } from "@/components/home/ConditionsSlider";
import { TreatmentsGrid } from "@/components/home/TreatmentsGrid";
import { AboutBlock } from "@/components/home/AboutBlock";
import { DoctorProfile } from "@/components/home/DoctorProfile";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { BlogPreview } from "@/components/home/BlogPreview";
import { BookCTA } from "@/components/home/BookCTA";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arnav Physiotherapy Centre — Move Better. Live Pain-Free. | Jhansi" },
      { name: "description", content: `Premium physiotherapy & rehabilitation in Jhansi led by ${site.doctor} (${site.credentials}). Book personalised care for back pain, sports injury, neuro rehab and post-surgery recovery.` },
      { property: "og:title", content: "Arnav Physiotherapy Centre — Move Better. Live Pain-Free." },
      { property: "og:description", content: "Evidence-based physiotherapy, sports rehab and neurological recovery in Jhansi." },
      { property: "og:url", content: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["MedicalBusiness", "Physiotherapist"],
          name: site.name,
          image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
          telephone: site.phone1,
          email: site.email,
          address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: site.city, addressCountry: "IN" },
          openingHours: "Mo-Sa 17:00-20:00",
          medicalSpecialty: "Physiotherapy",
          founder: { "@type": "Person", name: site.doctor, jobTitle: "Physiotherapist" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <QuickServices />
      <ConditionsSlider />

      <TreatmentsGrid />

      {/* <FeaturedTreatments /> */}
      <StatsCounter />

      <WhyChoose />
      {/* <AboutBlock /> */}
      <DoctorProfile />
      <ProcessTimeline />
      {/* <VideoShowcase /> */}
      <GalleryPreview />
      <Testimonials />
      <FAQ />
      <BlogPreview />
      <BookCTA />
    </>
  );
}

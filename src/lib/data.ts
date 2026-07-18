export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  benefits: string[];
};

import manualTherapyImage from "../assets/services/manualtherapy.jpg";
import exerciseTherapyImage from "../assets/services/ExerciseTherapy.jpg";
import electrotherapyImage from "../assets/services/Electrotherapy.jpg";
import dryNeedlingImage from "../assets/services/DryNeedling.jpg";
import shockwaveTherapyImage from "../assets/services/ShockwaveTherapy.jpg";
import sportsRehabilitationImage from "../assets/services/SportsRehabilitation.jpg";
import cuppingTherapyImage from "../assets/services/CuppingTherapy.jpg";
import womensHealthImage from "../assets/services/WomenHealthPhysiotherapy.jpg";
import neurologicalPhysiotherapyImage from "../assets/services/NeurologicalPhysiotherapy.jpg";
import waxTherapyImage from "../assets/gallery/wax.png";


export const services: Service[] = [
  {
    slug: "manual-therapy",
    name: "Manual Therapy",
    short: "Hands-on techniques to release pain and restore joint mobility.",
    description:
      "Skilled manual mobilisation and soft-tissue work to relieve stiffness, improve joint play and calm the nervous system — the foundation of every recovery plan at Arnav Physio.",
    image: manualTherapyImage,
    benefits: ["Immediate pain relief", "Restores mobility", "Improves circulation", "Reduces muscle tension"],
  },
  {
    slug: "exercise-therapy",
    name: "Exercise Therapy",
    short: "Guided movement to rebuild strength, flexibility and balance.",
    description:
      "Personalised, progressive exercise programmes designed around your goals — from re-learning basic movement after injury to returning to full sport performance.",
    image:
      exerciseTherapyImage,
    benefits: ["Rebuilds strength", "Improves posture", "Long-term prevention", "Boosts confidence"],
  },
  {
    slug: "electrotherapy",
    name: "Electrotherapy",
    short: "Modern modalities like TENS, IFT and ultrasound for faster healing.",
    description:
      "Precision electrotherapy — TENS, IFT, ultrasound and muscle stimulation — used alongside hands-on care to reduce pain, calm inflammation and accelerate tissue repair.",
    image:
      electrotherapyImage,
    benefits: ["Non-invasive relief", "Reduces inflammation", "Speeds recovery", "Pairs with manual therapy"],
  },
  {
    slug: "dry-needling",
    name: "Dry Needling",
    short: "Targeted needling to release stubborn trigger points.",
    description:
      "Thin, sterile needles applied to myofascial trigger points to switch off tight, painful bands of muscle — especially effective for chronic neck, back and shoulder pain.",
    image:
      dryNeedlingImage,
    benefits: ["Releases trigger points", "Chronic pain relief", "Improves range", "Minimally invasive"],
  },
  {
    slug: "shockwave-therapy",
    name: "Shockwave Therapy",
    short: "Focused acoustic waves for tendon and heel pain.",
    description:
      "Radial shockwave therapy for tendinopathies, plantar fasciitis and stubborn calcifications — stimulating the body's own regenerative response.",
    image:
      shockwaveTherapyImage,
    benefits: ["Tendon healing", "Non-surgical", "Fast sessions", "Long-lasting results"],
  },
  {
    slug: "sports-rehabilitation",
    name: "Sports Rehabilitation",
    short: "Return-to-play programmes led by a sports specialist.",
    description:
      "Led by a MPT (Sports) specialist, our return-to-play pathway blends strength, mobility, and sport-specific drills to get athletes back — stronger than before.",
    image:
      sportsRehabilitationImage,
    benefits: ["Sport-specific", "Injury prevention", "Performance gains", "Confidence to return"],
  },
  {
    slug: "cupping-therapy",
    name: "Cupping Therapy",
    short: "Traditional cupping for muscle tension and circulation.",
    description:
      "Dry and sliding cupping techniques to release fascia, improve blood flow and complement modern rehabilitation.",
    image:
      cuppingTherapyImage,
    benefits: ["Releases fascia", "Boosts circulation", "Deep muscle relief", "Complementary care"],
  },
  {
    slug: "wax-therapy",
    name: "Wax Therapy",
    short: "Deep heating therapy for stiff joints, chronic pain and improved mobility.",
    description:
      "Wax therapy is a soothing, heat-based treatment that helps relax tight tissues, reduce stiffness and improve circulation for people with chronic pain, arthritis and joint stiffness.",
    image: waxTherapyImage,
    benefits: ["Relieves stiffness", "Improves circulation", "Gentle heat-based care", "Supports arthritis and chronic pain recovery"],
  },

  {
    slug: "womens-health",
    name: "Women's Health Physiotherapy",
    short: "Pre- and post-natal care and pelvic health.",
    description:
      "Confidential care for pre- and post-natal recovery, pelvic floor rehabilitation and posture support — with dignity and privacy.",
    image:
      womensHealthImage,
    benefits: ["Pre & post natal", "Pelvic floor", "Private setting", "Certified guidance"],
  },
  {
    slug: "neurological-physiotherapy",
    name: "Neurological Physiotherapy",
    short: "Recovery programmes for stroke, Parkinson's and nerve injury.",
    description:
      "Structured neuro-rehabilitation for stroke, Parkinson's, Bell's palsy and peripheral nerve injuries — combining hands-on facilitation, task training and home programmes.",
    image:
      neurologicalPhysiotherapyImage,
    benefits: ["Stroke recovery", "Balance & gait", "Task training", "Home programmes"],
  },
];

export type Condition = {
  slug: string;
  name: string;
  image: string;
  summary: string;
};


import kneePainImage from "../assets/conditions/kneepain.jpg";
import shoulderPainImage from "../assets/conditions/shoulderpain.jpg";
import neckPainImage from "../assets/conditions/neckpain.jpg";
import backPainImage from "../assets/conditions/backpain.jpg";
import sciaticaImage from "../assets/conditions/sciaticapain.jpg";
import slipDiscImage from "../assets/conditions/slipdisc.jpg";
import frozenShoulderImage from "../assets/conditions/frozenshoulder.jpg";
import sportsInjuryImage from "../assets/conditions/sportsinjury.jpg";
import arthritisImage from "../assets/conditions/arthritis.jpg";
import strokeRehabImage from "../assets/conditions/strokerehab.jpg";
import neurologicalRehabImage from "../assets/conditions/neurologicalrehab.jpg";
import postSurgeryRehabImage from "../assets/conditions/postsurgeryrehab.jpg";
export const conditions: Condition[] = [
  {
    slug: "back-pain", name: "Back Pain",
    image: backPainImage,
    summary: "Chronic and acute low-back pain, disc issues and postural strain."
  },
  {
    slug: "neck-pain", name: "Neck Pain",
    image: neckPainImage,
    summary: "Cervical spondylosis, tech-neck, whiplash and headaches of cervical origin."
  },
  {
    slug: "shoulder-pain", name: "Shoulder Pain",
    image: shoulderPainImage,
    summary: "Rotator cuff strain, impingement and post-injury stiffness."
  },
  {
    slug: "knee-pain", name: "Knee Pain",
    image: kneePainImage,
    summary: "Ligament sprains, meniscus injuries, arthritis and post-op knees."
  },
  {
    slug: "sciatica", name: "Sciatica",
    image: sciaticaImage,
    summary: "Nerve-root pain radiating down the leg — relieved with a structured plan."
  },
  {
    slug: "slip-disc", name: "Slip Disc",
    image: slipDiscImage,
    summary: "Prolapsed or herniated discs managed conservatively without surgery."
  },
  {
    slug: "frozen-shoulder", name: "Frozen Shoulder",
    image: frozenShoulderImage,
    summary: "Adhesive capsulitis — restore range in stages, painlessly."
  },
  {
    slug: "sports-injury", name: "Sports Injury",
    image: sportsInjuryImage,
    summary: "ACL, hamstring, ankle sprains — return-to-play from a sports specialist."
  },
  {
    slug: "arthritis", name: "Arthritis",
    image: arthritisImage,
    summary: "Osteoarthritis and rheumatoid arthritis — long-term movement plans."
  },
  {
    slug: "stroke-rehab", name: "Stroke Rehab",
    image: strokeRehabImage,
    summary: "Regain strength, balance and independence after stroke."
  },
  {
    slug: "neurological-rehab", name: "Neurological Rehab",
    image: neurologicalRehabImage,
    summary: "Parkinson's, Bell's palsy and peripheral neuropathies."
  },
  {
    slug: "post-surgery-rehab", name: "Post-Surgery Rehab",
    image: postSurgeryRehabImage,
    summary: "Structured recovery after orthopaedic or joint replacement surgery."
  },
];

export type Doctor = {
  slug: string;
  name: string;
  qualification: string;
  role: string;
  experience: string;
  specialization: string;
  image: string;
  bio: string;
};

import dushyantImage from "../assets/drdushyant.jpg";

export const doctors: Doctor[] = [
  {
    slug: "dushyant-singh",
    name: "Dr. Dushyant Singh",
    qualification: "BPT, MPT (Sports)",
    role: "Founder & Chief Physiotherapist",
    experience: "20+ years clinical experience",
    specialization: "Sports Injury, Manual Therapy, Neuro Rehab",
    image: dushyantImage,
    bio: "Dr. Dushyant Singh serves as a Physiotherapist at the District Hospital, Jhansi and heads Arnav Physiotherapy Centre. With a Master's in Sports Physiotherapy and a decade of clinical practice, he blends evidence-based care with hands-on craftsmanship — helping thousands of patients return to work, sport and everyday life.",
  },
  {
    slug: "associate-therapist",
    name: "Associate Physiotherapist",
    qualification: "BPT",
    role: "Rehabilitation Specialist",
    experience: "5+ years",
    specialization: "Orthopaedic & Post-surgery Rehab",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
    bio: "Supporting the clinic's rehabilitation programmes with a focus on post-operative recovery and long-term joint health.",
  },
  {
    slug: "womens-health-specialist",
    name: "Women's Health Specialist",
    qualification: "BPT, Certified Pelvic Health",
    role: "Women's Health Physiotherapist",
    experience: "6+ years",
    specialization: "Pre & Post Natal, Pelvic Floor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    bio: "Confidential, dignified care for pre-natal, post-natal and pelvic floor rehabilitation programmes.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ritika Sharma",
    role: "Recovered from lower back pain",
    quote:
      "I struggled with back pain for two years. In six weeks at Arnav Physio I was back to yoga and long walks — without painkillers.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    name: "Amit Verma",
    role: "Post ACL surgery",
    quote:
      "Dr. Dushyant's sports rehab plan got me back on the football field stronger than before. Every session had a clear purpose.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    role: "Frozen shoulder",
    quote:
      "I couldn't lift my arm to comb my hair. The team was patient, kind and professional. Today I can move freely again.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    name: "Rahul Yadav",
    role: "Sciatica recovery",
    quote:
      "Honest advice, no shortcuts. The clinic feels calm, modern and completely trustworthy.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "Do I need a doctor's referral to book physiotherapy?",
    a: "No. You can book an appointment directly with us. If you already have a referral or investigation reports, please bring them along.",
  },
  {
    q: "How long does a typical session last?",
    a: "Your first assessment lasts around 45–60 minutes. Follow-up treatment sessions are typically 30–45 minutes depending on the plan.",
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on your condition. Most acute issues respond in 4–8 sessions; chronic and post-surgical cases follow a longer, staged plan we design with you.",
  },
  {
    q: "Do you offer home physiotherapy in Jhansi?",
    a: "Yes. We provide select home visits within Jhansi for post-surgical, elderly and neurological patients. Please call to confirm availability.",
  },
  {
    q: "Is physiotherapy painful?",
    a: "Sessions are designed to reduce pain, not create it. Some techniques may feel intense but should always be within your comfort — we adjust every step.",
  },
  {
    q: "What should I wear to my appointment?",
    a: "Loose, comfortable clothing that allows easy access to the area being treated works best.",
  },
];

export const blogs = [
  {
    slug: "5-desk-exercises-for-back-pain",
    title: "5 Simple Desk Exercises to Beat Back Pain",
    excerpt: "Short, effective movements you can do between meetings to keep your spine happy.",
    image: "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?auto=format&fit=crop&w=1400&q=80",
    date: "Jun 12, 2026",
    read: "4 min read",
    category: "Back Care",
  },
  {
    slug: "return-to-sport-after-acl",
    title: "Returning to Sport After an ACL Injury",
    excerpt: "A physiotherapist's guide to a safe, staged return-to-play — without setbacks.",
    image: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=1400&q=80",
    date: "May 28, 2026",
    read: "6 min read",
    category: "Sports Rehab",
  },
  {
    slug: "understanding-frozen-shoulder",
    title: "Understanding Frozen Shoulder — And How to Treat It",
    excerpt: "Why it happens, how long it lasts and what actually helps you regain movement.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80",
    date: "May 10, 2026",
    read: "5 min read",
    category: "Shoulder",
  },
  {
    slug: "posture-guide-for-students",
    title: "The Modern Posture Guide for Students",
    excerpt: "Small daily habits that protect your neck, shoulders and back through exam season.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80",
    date: "Apr 22, 2026",
    read: "4 min read",
    category: "Wellness",
  },
];

export type GalleryItem = {
  src: string;
  category: "Clinic" | "Treatments" | "Equipment" | "Sessions" | "Team";
  title: string;
  type?: "image" | "video";
};

import cuppingImage from "../assets/gallery/cupping.jpeg";
import laserImage from "../assets/gallery/laser.jpeg";
import manualtherapyImage from "../assets/gallery/manual.jpeg";
import consultingRoomImage from "../assets/gallery/consulting.png";
import waitingAreaImage from "../assets/gallery/waitingarea.png";
import electroImage from "../assets/gallery/electro.jpeg";
import kneeRehabImage from "../assets/gallery/knee.png";
import womensImage from "../assets/gallery/womanhealth.png";
import neuroImage from "../assets/gallery/neuro.png";
import excerciseImage from "../assets/gallery/excerciseImage.png";
import sportsImage from "../assets/gallery/sportsImage.png";
export const galleryItems: GalleryItem[] = [
  { src: cuppingImage, category: "Treatments", title: "Cupping Therapy" },

  { src: consultingRoomImage, category: "Clinic", title: "Consultation Room" },
  { src: waitingAreaImage, category: "Clinic", title: "Waiting Area" },


  { src: electroImage, category: "Equipment", title: "Electrotherapy Unit" },
  { src: laserImage, category: "Treatments", title: "Laser Therapy" },
  { src: manualtherapyImage, category: "Treatments", title: "Manual Therapy" },
  { src: waxTherapyImage, category: "Treatments", title: "Wax Therapy" },
  { src: electroImage, category: "Treatments", title: "Electrotherapy" },


  { src: excerciseImage, category: "Sessions", title: "Exercise Therapy" },
  { src: sportsImage, category: "Sessions", title: "Sports Recovery" },
  { src: kneeRehabImage, category: "Sessions", title: "Knee Rehabilitation" },
  { src: womensImage, category: "Sessions", title: "Women's Health" },
  { src: neuroImage, category: "Sessions", title: "Neuro Rehab" },
];

/** Back-compat: flat URL list still used by a few components */
export const galleryImages = galleryItems.map((g) => g.src);


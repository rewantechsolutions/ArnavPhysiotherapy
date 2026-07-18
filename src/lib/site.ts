export const site = {
  name: "Arnav Physiotherapy Centre",
  short: "Arnav Physio",
  tagline: "Move Better. Live Pain-Free.",
  doctor: "Dr. Dushyant Singh",
  credentials: "BPT, MPT (Sports)",
  role: "Physiotherapist — District Hospital, Jhansi (U.P.)",
  phone1: "+91 98898 36012",
  phone2: "+91 70075 98509",
  phoneRaw1: "+919889836012",
  phoneRaw2: "+917007598509",
  whatsapp: "919889836012",
  email: "dushyant.singhdr@gmail.com",
  hours: "Evening 5:00 PM – 8:00 PM",
  address: "Near Amma Ji Ki Dharamshala, Rani Mahal Road, Jhansi (U.P.)",
  city: "Jhansi",
  mapQuery: "Rani Mahal Road, Jhansi, Uttar Pradesh",
  formspree: "https://formspree.io/f/mojgekjv",
  formspreeContact: "https://formspree.io/f/mojgekjv",
  formspreeAppointment: "https://formspree.io/f/xpqvpyqp",
  social: {
    instagram: "https://www.instagram.com/arnavphysiotherapy?igsh=amFiaGM2cWwxNTFo&utm_source=qr",
    facebook: "https://www.facebook.com/share/1E7FUhtpza/?mibextid=wwXIfr",
  },
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/conditions", label: "Conditions" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

import dushyantImage from "../assets/drdushyant.jpg";

/** Doctor profile — replaces the generic "Physiotherapists Who Listen" section */
export const doctorProfile = {
  name: "Dr. Dushyant Singh",
  title: "Founder & Chief Physiotherapist",
  qualifications: ["Bachelor of Physiotherapy (BPT)", "Master of Physiotherapy — Sports (MPT)"],
  role: "Physiotherapist, District Hospital, Jhansi (U.P.)",
  experience: "20+ years of clinical practice",
  image: dushyantImage,
  specializations: [
    "Sports Injury & Return-to-Play",
    "Manual Therapy & Joint Mobilisation",
    "Neurological Rehabilitation",
    "Post-Surgical Recovery",
  ],
  certifications: [
    "Certified Manual Therapist",
    "Dry Needling Practitioner",
    "Sports Taping & Kinesiology",
    "Neurodevelopmental Therapy",
  ],
  awards: [
    "Recognition for community physiotherapy service — District Hospital, Jhansi",
    "Excellence in Sports Rehabilitation",
  ],
  philosophy:
    "Great physiotherapy is not about a machine or a technique — it's about a plan that fits your life. I combine hands-on treatment with modern science, then coach you until you're doing what you love again — pain-free.",
  reasons: [
    "One-on-one, unhurried sessions — never rushed",
    "Evidence-based plans, honest timelines",
    "Modern equipment in a calm, private clinic",
    "Transparent pricing — no unnecessary sessions",
  ],
};

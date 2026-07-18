import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Arnav Physio, I'd like to book an appointment.")}`}
        target="_blank" rel="noreferrer"
        aria-label="WhatsApp"
        className="grid h-14 min-h-11 w-14 min-w-11 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_-10px_rgba(37,211,102,0.55)] hover:scale-110 transition"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-12 min-h-11 w-12 min-w-11 place-items-center rounded-full gradient-teal text-white shadow-soft hover:scale-110 transition"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

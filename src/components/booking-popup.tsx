import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";

export function BookingPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 px-4 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-popup-title"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-white shadow-2xl animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-brand-gold" />
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-brand-slate hover:text-brand-navy"
        >
          <X size={20} />
        </button>
        <div className="p-8 text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-gold-soft px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
            Welcome
          </span>
          <h2 id="booking-popup-title" className="mb-3 font-serif text-2xl font-bold text-brand-navy">
            Ready to see your doctor?
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-brand-slate">
            Book a consultation with Bellcrest Family Clinic online. Choose a time that works for you — appointments are open now.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://app.avaros.ca/av/weblink/bellcrest"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-navy transition-all hover:brightness-95"
            >
              Book a Consultation <ArrowRight size={14} />
            </a>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-border px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-slate hover:text-brand-navy"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

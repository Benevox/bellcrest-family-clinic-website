import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/bellcrest-logo.avif";

const navItems = [
  { to: "/services", label: "Services" },
  { to: "/team", label: "Meet the Doctors" },
  { to: "/after-hours", label: "After Hours" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Link
        to="/contact"
        className="block bg-brand-gold px-6 py-2 text-center text-[11px] font-bold tracking-widest text-brand-navy uppercase transition-colors hover:bg-brand-gold/90"
      >
        We are accepting new patients
      </Link>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Bellcrest Family Clinic" className="size-10 md:size-14 object-contain transition-all" width={56} height={56} />
            <div>
              <h1 className="font-serif text-sm md:text-xl font-bold tracking-tight text-brand-navy">Bellcrest</h1>
              <p className="text-[10px] md:text-xs tracking-widest text-brand-slate uppercase">Family Clinic</p>
            </div>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-brand-slate transition-colors hover:text-brand-navy"
                activeProps={{ className: "text-brand-navy" }}
              >
                {item.label}
              </Link>
            ))}
             <a
              href="https://form.jotform.com/260983913712058"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-brand-blue bg-brand-blue/5 px-5 py-2 text-xs font-bold tracking-wider text-brand-blue uppercase transition-all hover:bg-brand-blue hover:text-white shadow-[0_0_12px_rgba(59,130,246,0.15)]"
            >
              FHO Enrolment
            </a>
            <a
              href="https://app.avaros.ca/av/weblink/bellcrest"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-gold px-6 py-2.5 text-xs font-bold tracking-wider text-brand-navy uppercase transition-all hover:brightness-95"
            >
              Book Online
            </a>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-brand-navy"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-brand-slate"
              >
                {item.label}
              </Link>
            ))}
             <a
              href="https://form.jotform.com/260983913712058"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-full border-2 border-brand-blue bg-brand-blue/5 px-6 py-2 text-center text-xs font-bold tracking-wider text-brand-blue uppercase"
            >
              FHO Enrolment
            </a>
            <a
              href="https://app.avaros.ca/av/weblink/bellcrest"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-gold px-6 py-2.5 text-center text-xs font-bold tracking-wider text-brand-navy uppercase"
            >
              Book Online
            </a>
          </div>
        )}
      </nav>
    </>
  );
}

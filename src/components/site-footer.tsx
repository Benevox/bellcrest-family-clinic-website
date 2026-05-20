import { Link } from "@tanstack/react-router";
import logo from "@/assets/bellcrest-logo.avif";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="" className="size-8 object-contain" width={32} height={32} />
              <span className="font-serif text-sm font-bold text-brand-navy">Bellcrest Family Clinic</span>
            </div>
            <p className="text-xs leading-relaxed text-brand-slate">
              Primary care for Burlington and surrounding areas, focused on prevention and lifelong wellness.
            </p>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-brand-navy">Visit</h5>
            <p className="text-sm text-brand-slate">Unit 407 — 672 Brant Street</p>
            <p className="text-sm text-brand-slate mb-4">Burlington, ON L7R 2H3</p>
            <p className="text-sm font-bold text-brand-navy">289-245-1071</p>
            <p className="text-xs text-brand-slate">Fax: 289-245-1486</p>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-brand-navy">Reach Us</h5>
            <a href="mailto:contact@bellcrestfamilyclinic.ca" className="block text-sm text-brand-slate hover:text-brand-blue mb-2">
              contact@bellcrestfamilyclinic.ca
            </a>
            <p className="text-xs text-brand-slate leading-relaxed">
              Mon–Thu 9am–12pm<br />
              Mon, Tue, Thu 1:30pm–4:30pm
            </p>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-brand-navy">Patients</h5>
            <ul className="space-y-2 text-sm text-brand-slate">
              <li><Link to="/services" className="hover:text-brand-blue">Services</Link></li>
              <li><Link to="/after-hours" className="hover:text-brand-blue">After Hours Care</Link></li>
              <li><Link to="/contact" className="hover:text-brand-blue">Become a Patient</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-[10px] uppercase tracking-widest text-brand-slate">
            © {new Date().getFullYear()} Bellcrest Family Clinic. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-brand-slate">
            Burlington · Ontario · Canada
          </p>
        </div>
      </div>
    </footer>
  );
}

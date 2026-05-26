import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MapPin, Phone, Printer, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Bellcrest Family Clinic" },
      { name: "description", content: "Visit Bellcrest Family Clinic at 672 Brant Street, Unit 407, Burlington, Ontario. Call 289-245-1071 or request to become a patient." },
      { property: "og:title", content: "Contact Us — Bellcrest Family Clinic" },
      { property: "og:description", content: "Visit Bellcrest Family Clinic in Burlington, Ontario." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {

  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy">
      <SiteHeader />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full bg-brand-blue-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
            Get in touch
          </span>
          <h1 className="mb-6 font-serif text-5xl font-bold text-brand-navy md:text-6xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-brand-slate">
            We're located in downtown Burlington in the Brant Arts Medical Building.
          </p>
        </div>
      </section>

      {/* Contact + Map */}
      <section className="pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
          <div className="space-y-5">
            <ContactRow icon={MapPin} label="Address" value={<>Unit 407 — 672 Brant Street<br />Burlington, ON L7R 2H3</>} />
            <ContactRow icon={Phone} label="Phone" value="289-245-1071" />
            <ContactRow icon={Printer} label="Fax" value="289-245-1486" />
            <ContactRow icon={Mail} label="Email" value="contact@bellcrestfamilyclinic.ca" />
            <ContactRow
              icon={Clock}
              label="Hours"
              value={<>Mon–Wed & Fri: 9am–5pm<br />Thu: 9am–1pm<br />Sat: Subject to availability<br />Sun: Closed</>}
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="Bellcrest Family Clinic location"
              src="https://www.google.com/maps?q=672+Brant+Street,+Burlington,+ON&output=embed"
              width="100%"
              height="100%"
              className="h-full min-h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* New patient form */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-brand-navy md:text-4xl">Looking to become a patient?</h2>
            <p className="mx-auto max-w-xl text-brand-slate">
              Submit your information below and we will get back to you when a spot becomes available. New patient requests are maintained and offered in the order received.
            </p>
          </div>

          <div className="mx-auto flex justify-center overflow-hidden rounded-2xl border border-border bg-brand-surface p-2 md:p-6 shadow-sm">
            <iframe
              title="New patient registration form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdV5eVqLHxQ8QU1d4ZLDjZL4DAw2QThNIFzmj_CuTnFSC91sw/viewform?embedded=true"
              width="640"
              height="1698"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full max-w-[640px] min-h-[1720px] border-0"
              loading="lazy"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-white p-6">
      <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
        <Icon size={18} />
      </div>
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-brand-slate">{label}</p>
        <p className="text-sm font-medium text-brand-navy">{value}</p>
      </div>
    </div>
  );
}

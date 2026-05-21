import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AlertTriangle, Phone, Clock } from "lucide-react";

export const Route = createFileRoute("/after-hours")({
  head: () => ({
    meta: [
      { title: "After Hours Care — Bellcrest Family Clinic" },
      { name: "description", content: "After Hours Care through the Harvester Rd. Family Health Organization. Locations, hours and protocol for Bellcrest Family Clinic patients in Burlington." },
      { property: "og:title", content: "After Hours Care — Bellcrest Family Clinic" },
      { property: "og:description", content: "After Hours Care through the Harvester Rd. FHO in Burlington." },
      { property: "og:url", content: "/after-hours" },
    ],
    links: [{ rel: "canonical", href: "/after-hours" }],
  }),
  component: AfterHoursPage,
});

const locations = [
  { name: "Bellcrest Family Clinic", doctor: "Dr. Samuel Onuekwa", address: "Unit 407 – 672 Brant Street", phone: "289-245-1071" },
  { name: "Harvester Road Medical Clinic", doctor: "Dr. Chemparathy, Dr. Sabera Ahmed, Dr. Sadaf Ahmed", address: "Suite 409 – 3155 Harvester Road", phone: "905-632-3000" },
  { name: "Harvester Road Medical Clinic", doctor: "Dr. Nayar", address: "Suite 201 – 3155 Harvester Road", phone: "905-632-4640" },
  { name: "Harvester Road Medical Clinic", doctor: "Dr. Kozac", address: "Suite 410 – 3155 Harvester Road", phone: "905-333-0259" },
  { name: "Remedy's Rx Building", doctor: "Dr. Krantz", address: "Unit 4A – 678 Guelph Line", phone: "905-637-0852" },
  { name: "Remedy's Rx Building", doctor: "Dr. Piskozub, Dr. Cymerys, Dr. Sedykh", address: "Unit 4A – 678 Guelph Line", phone: "905-333-0116" },
  { name: "Dr. Jerome", doctor: "Dr. Jerome", address: "Suite 602 – 2319 Fairview Street", phone: "905-635-3632" },
  { name: "St. Joseph's Medical Clinic", doctor: "Dr. Hersi", address: "2nd Floor – 906 Brant Street", phone: "905-631-8898" },
  { name: "Dr. Turliuk", doctor: "Dr. Turliuk", address: "Unit 4A – 678 Guelph Line", phone: "905-637-2323" },
];

function AfterHoursPage() {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy">
      <SiteHeader />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full bg-brand-blue-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
            Harvester Rd. FHO
          </span>
          <h1 className="mb-6 font-serif text-5xl font-bold text-brand-navy md:text-6xl">After Hours Care</h1>
          <p className="mx-auto max-w-2xl text-lg text-brand-slate">
            The Harvester Rd Family Health Organization has 14 doctors providing After Hours Care across 9 offices in Burlington.
          </p>
        </div>
      </section>

      {/* Hours card */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="size-5 text-brand-blue" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-slate">Weeknights</p>
              </div>
              <p className="font-serif text-2xl font-bold text-brand-navy">Mon–Thu</p>
              <p className="text-brand-slate">5:00pm – 8:00pm</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="size-5 text-brand-blue" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-slate">Weekends</p>
              </div>
              <p className="font-serif text-2xl font-bold text-brand-navy">Saturday</p>
              <p className="text-brand-slate">9:00am – 2:30pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why use FHO */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 font-serif text-2xl font-bold text-brand-navy">Why use the Harvester Rd FHO clinics?</h2>
          <ol className="space-y-4 text-brand-slate">
            <li className="flex gap-4 rounded-xl border border-border bg-white p-5">
              <span className="flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-xs font-bold text-brand-blue">1</span>
              <span>It ensures we receive your after-hours visit information immediately, preserving continuity of care.</span>
            </li>
            <li className="flex gap-4 rounded-xl border border-border bg-white p-5">
              <span className="flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-xs font-bold text-brand-blue">2</span>
              <span>It reduces healthcare costs and duplication of services.</span>
            </li>
            <li className="flex gap-4 rounded-xl border border-border bg-white p-5">
              <span className="flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-xs font-bold text-brand-blue">3</span>
              <span>For every visit at a clinic not associated with the FHO, OHIP charges the cost of your visit back to Dr. Onuekwa.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Alert */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex gap-4 rounded-2xl border border-brand-alert/20 bg-brand-alert/5 p-6">
            <AlertTriangle className="size-6 flex-shrink-0 text-brand-alert" />
            <div className="space-y-2 text-sm">
              <p className="font-bold text-brand-alert">The AHC is not a walk-in.</p>
              <p className="text-brand-slate">
                You must call the appropriate location during AHC hours to receive an appointment. Have your health card ready, as not all clinics are connected.
              </p>
              <p className="text-brand-slate">
                <span className="font-semibold text-brand-navy">Masking is mandatory</span> if you have respiratory or contagious symptoms, or have been in close contact with someone who does, within the past 48 hours. Masks will not be provided.
              </p>
              <p className="text-xs text-brand-slate">
                For information on clinic location and contact number each day, call <span className="font-semibold text-brand-navy">905-635-2344</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations table */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-2 font-serif text-3xl font-bold text-brand-navy">Participating clinics</h2>
          <p className="mb-8 text-brand-slate">Locations rotate between the following offices. Call the appropriate office at the start of clinic hours.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white p-6">
                <p className="font-serif text-base font-bold text-brand-navy">{loc.name}</p>
                <p className="mt-1 text-sm text-brand-slate">{loc.doctor}</p>
                <p className="mt-3 text-xs text-brand-slate">{loc.address}</p>
                <a
                  href={`tel:${loc.phone.replaceAll("-", "")}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-navy"
                >
                  <Phone size={14} /> {loc.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

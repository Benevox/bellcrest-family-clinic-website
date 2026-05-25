import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShieldCheck, Users, Activity, Syringe, Stethoscope, HeartPulse, ArrowRight, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Bellcrest Family Clinic" },
      { name: "description", content: "Family medicine, preventive care, chronic disease management, immunizations and more at Bellcrest Family Clinic in Burlington, Ontario." },
      { property: "og:title", content: "Services — Bellcrest Family Clinic" },
      { property: "og:description", content: "Primary care services in Burlington, Ontario." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const allServices = [
  { icon: ShieldCheck, title: "Preventive Care", body: "Annual physicals, age-appropriate screenings, lifestyle counseling and proactive health planning." },
  { icon: Users, title: "Family Medicine", body: "Personalized longitudinal care for patients of every age, from infants through seniors." },
  { icon: Activity, title: "Chronic Disease Management", body: "Structured care for diabetes, hypertension, asthma, COPD, thyroid disease and more." },
  { icon: Syringe, title: "Immunizations", body: "Childhood, adult and travel immunizations per Ministry of Ontario guidelines." },
  { icon: Stethoscope, title: "Acute Concerns", body: "Same-day or next-day appointments for new or worsening symptoms during clinic hours." },
  { icon: HeartPulse, title: "Mental Health Support", body: "Initial assessment, ongoing follow-up and coordinated referrals when needed." },
];


function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy">
      <SiteHeader />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full bg-brand-blue-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
            What we offer
          </span>
          <h1 className="mb-6 font-serif text-5xl font-bold text-brand-navy md:text-6xl">Our Services</h1>
          <p className="mx-auto max-w-2xl text-lg text-brand-slate">
            Dr. Samuel Onuekwa &amp; Dr. Joy Onuekwa (coming soon) are proud to offer primary care to residents of Burlington and surrounding areas.
          </p>
        </div>
      </section>

      {/* Emergency notice */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex gap-4 rounded-2xl border border-brand-alert/20 bg-brand-alert/5 p-6">
            <AlertTriangle className="size-6 flex-shrink-0 text-brand-alert" />
            <div>
              <p className="mb-2 text-sm font-bold text-brand-alert">If you have a medical emergency, call 911 or head to your nearest Emergency Room.</p>
              <p className="text-sm text-brand-slate">
                Please do not leave urgent messages — calls may not be responded to right away. If you can't reach us during regular hours, please try calling back as we may be assisting another patient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allServices.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-8 shadow-sm transition-all hover:border-brand-blue hover:shadow-md">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-brand-blue-soft text-brand-blue">
                  <Icon size={22} />
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-brand-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-slate">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-24 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">Book an appointment online</h2>
          <p className="mx-auto mb-8 max-w-xl text-white/70">
            Review the booking guidelines before selecting an appointment type.
          </p>
          <a
            href="https://app.avaros.ca/av/weblink/bellcrest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-navy transition-all hover:gap-3"
          >
            Book Now <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

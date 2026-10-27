import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingPopup } from "@/components/booking-popup";
import { ShieldCheck, Users, Activity, Syringe, ArrowRight, Phone, Clock, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-clinic.jpg";
import afterHoursImg from "@/assets/after-hours.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bellcrest Family Clinic — Primary Care in Burlington, ON" },
      { name: "description", content: "Comprehensive family medicine in downtown Burlington. Book online with Dr. Samuel Onuekwa for preventive care, chronic disease management and immunizations." },
      { property: "og:title", content: "Bellcrest Family Clinic — Burlington, Ontario" },
      { property: "og:description", content: "Comprehensive family medicine in downtown Burlington. Book online with Dr. Samuel Onuekwa." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const services = [
  { icon: ShieldCheck, title: "Preventive Care", body: "Routine screenings and tailored wellness advice to keep you healthy year-round." },
  { icon: Users, title: "Family Medicine", body: "Dedicated primary care for family members of all ages, prioritizing continuity." },
  { icon: Activity, title: "Chronic Disease", body: "Expert management and ongoing support for chronic health conditions." },
  { icon: Syringe, title: "Immunizations", body: "Routine immunizations following the Ministry of Ontario guidelines." },
];

function Home() {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy">
      <BookingPopup />
      <SiteHeader />


      {/* Hero */}
      <header className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <div className="min-w-0">
            <span className="mb-6 inline-block rounded-full bg-brand-blue-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
              Burlington, Ontario
            </span>
            <h2 className="mb-8 font-serif text-4xl font-bold leading-[1.1] text-brand-navy sm:text-5xl md:text-6xl">
              Comprehensive care for your family's lifelong health.
            </h2>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-brand-slate">
              Dr. Samuel Onuekwa and our dedicated team offer primary healthcare services with a focus on prevention and long-term wellness.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://app.avaros.ca/av/weblink/bellcrest"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-brand-gold px-8 py-4 text-sm font-bold text-brand-navy transition-all hover:brightness-95"
              >
                Schedule an Appointment
              </a>
              <Link
                to="/services"
                className="rounded-lg border border-border bg-white px-8 py-4 text-sm font-bold text-brand-navy transition-all hover:bg-secondary"
              >
                View All Services
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Bright modern examination room at Bellcrest Family Clinic"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl outline outline-1 -outline-offset-1 outline-black/5"
            />
          </div>
        </div>
      </header>

      {/* Quick info strip */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          <InfoItem icon={Phone} label="Reception" value="289-245-1071" />
          <InfoItem icon={Clock} label="Office Hours" value="Mon–Wed & Fri 9am–5pm | Thu 9am–1pm" />
          <InfoItem icon={MapPin} label="Location" value="Unit 407 — 672 Brant Street, Burlington, ON L7R 2H3" />
        </div>
      </section>

      {/* Services */}
      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <h3 className="mb-4 font-serif text-3xl font-bold text-brand-navy md:text-4xl">Our Clinical Services</h3>
            <p className="text-brand-slate">Providing personalized care for all stages of life, from infants to seniors.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-white p-8 shadow-sm transition-all hover:border-brand-blue hover:shadow-md"
              >
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-brand-blue-soft text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h4 className="mb-3 font-serif text-lg font-bold text-brand-navy">{title}</h4>
                <p className="text-sm leading-relaxed text-brand-slate">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:gap-3 transition-all">
              See full list of services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* After Hours Spotlight */}
      <section className="relative overflow-hidden bg-brand-navy py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 md:flex-row">
          <div className="z-10 flex-1">
            <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-widest text-brand-blue">
              Harvester Rd. FHO
            </span>
            <h3 className="mb-6 font-serif text-4xl font-bold">After Hours Care</h3>
            <p className="mb-8 text-lg leading-relaxed text-white/70">
              Our patients have access to 14 doctors across 9 offices in Burlington for urgent needs outside regular hours.
            </p>
            <ul className="mb-10 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 flex-shrink-0 rounded-full bg-brand-blue" />
                <span className="text-white/85">Mon–Thu: 5:00pm – 8:00pm</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 flex-shrink-0 rounded-full bg-brand-blue" />
                <span className="text-white/85">Saturday: 9:00am – 2:30pm (Immediate concerns only)</span>
              </li>
            </ul>
            <Link
              to="/after-hours"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-navy transition-all hover:gap-3"
            >
              Learn more <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative flex-1">
            <img
              src={afterHoursImg}
              alt="Medical office at dusk"
              loading="lazy"
              width={960}
              height={960}
              className="aspect-square w-full rounded-3xl border border-white/10 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Clinic Gallery */}
      <section className="bg-brand-surface py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-brand-blue-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
              Our Clinic
            </span>
            <h3 className="mb-4 font-serif text-3xl font-bold text-brand-navy md:text-4xl">Modern & Welcoming Facilities</h3>
            <p className="mx-auto max-w-xl text-brand-slate">
              Take a tour of Bellcrest Family Clinic. Our professional spaces are designed to provide a comfortable, pristine, and comforting environment for your care.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm transition-all hover:border-brand-blue hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src="/reception area.jpeg"
                  alt="Reception Area at Bellcrest Family Clinic"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider text-brand-navy">Reception & Welcome Lounge</p>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm transition-all hover:border-brand-blue hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
              <div className="overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src="/reception area 2a.jpeg"
                  alt="Welcome lounge at Bellcrest Family Clinic"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider text-brand-navy">Serene Welcome Lounge</p>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm transition-all hover:border-brand-blue hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <div className="overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src="/patient waiting area.jpeg"
                  alt="Patient Waiting Area"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider text-brand-navy">Comfortable Waiting Area</p>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm transition-all hover:border-brand-blue hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
              <div className="overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src="/consulting room 1st.jpeg"
                  alt="Modern Consulting Room 1"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider text-brand-navy">Modern Consulting Room</p>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm transition-all hover:border-brand-blue hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src="/consulting room 2.jpeg"
                  alt="Modern Consulting Room 2"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider text-brand-navy">Pristine Examination Room</p>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm transition-all hover:border-brand-blue hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <div className="overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src="/consulting room 3.jpeg"
                  alt="Modern Consulting Room 3"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider text-brand-navy">Professional Consultation Space</p>
            </div>
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h3 className="mb-4 font-serif text-3xl font-bold text-brand-navy md:text-4xl">Book an appointment online</h3>
          <p className="mx-auto mb-8 max-w-xl text-brand-slate">
            Review the booking guidelines before selecting an appointment type. Questions? Call our clinic during regular business hours at <span className="font-semibold text-brand-navy">289-245-1071</span>.
          </p>
          <a
            href="https://app.avaros.ca/av/weblink/bellcrest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-navy transition-all hover:brightness-95"
          >
            Book Now <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 px-6 py-6">
      <div className="flex size-10 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate">{label}</p>
        <p className="text-sm font-semibold text-brand-navy">{value}</p>
      </div>
    </div>
  );
}

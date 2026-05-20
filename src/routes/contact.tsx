import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  const [submitted, setSubmitted] = useState(false);

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
              value={<>Mon–Thu: 9am–12pm<br />Mon, Tue, Thu: 1:30pm–4:30pm</>}
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

          {submitted ? (
            <div className="rounded-2xl border border-brand-blue/20 bg-brand-blue-soft p-8 text-center">
              <h3 className="mb-2 font-serif text-2xl font-bold text-brand-navy">Thank you</h3>
              <p className="text-brand-slate">We've received your request and will be in touch when a spot opens up.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6 rounded-2xl border border-border bg-brand-surface p-8"
            >
              <Field label="Full name" required>
                <input required type="text" className={inputClass} placeholder="Jane Doe" />
              </Field>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label="Phone number" required>
                  <input required type="tel" className={inputClass} placeholder="(289) 555-0123" />
                </Field>
                <Field label="Email address" required>
                  <input required type="email" className={inputClass} placeholder="you@example.com" />
                </Field>
              </div>
              <Field label="Preferred contact method">
                <select className={inputClass} defaultValue="email">
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </Field>
              <Field label="Do you currently have a family doctor?">
                <select className={inputClass} defaultValue="no">
                  <option value="yes">Yes</option>
                  <option value="retiring">Yes, but they are retiring / I moved away</option>
                  <option value="no">No</option>
                </select>
              </Field>
              <Field label="Reason for requesting to become a patient">
                <textarea
                  rows={4}
                  className={inputClass}
                  placeholder="Please do not leave any specific medical information."
                />
              </Field>
              <p className="text-xs text-brand-slate">
                I acknowledge that submission of this form is only a request, not acceptance.
              </p>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-navy px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-blue"
              >
                Send Request
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-brand-slate/60 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-brand-slate">
        {label}{required && <span className="text-brand-alert"> *</span>}
      </span>
      {children}
    </label>
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

import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { User } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Team — Bellcrest Family Clinic" },
      { name: "description", content: "Meet the physicians of Bellcrest Family Clinic in Burlington — Dr. Samuel Onuekwa and Dr. Joy Onuekwa." },
      { property: "og:title", content: "Meet the Team — Bellcrest Family Clinic" },
      { property: "og:description", content: "Meet the physicians of Bellcrest Family Clinic in Burlington." },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

function PortraitPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl border border-dashed border-brand-blue/30 bg-brand-blue-soft/40">
      <div className="flex flex-col items-center gap-2 text-brand-slate">
        <User className="size-10" />
        <p className="text-xs uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}

function TeamPage() {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy">
      <SiteHeader />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full bg-brand-blue-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
            Our Physicians
          </span>
          <h1 className="mb-6 font-serif text-5xl font-bold text-brand-navy md:text-6xl">Meet the Team</h1>
          <p className="mx-auto max-w-2xl text-lg text-brand-slate">
            Compassionate, evidence-based family medicine led by experienced physicians dedicated to your long-term health.
          </p>
        </div>
      </section>

      {/* Dr. Samuel Onuekwa */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 rounded-2xl border border-border bg-white p-8 md:grid-cols-[280px_1fr] md:p-12">
            <div>
              <PortraitPlaceholder label="Portrait" />
              <p className="mt-4 text-center font-serif text-lg font-bold text-brand-navy">Dr. Samuel Onuekwa</p>
              <p className="text-center text-xs uppercase tracking-widest text-brand-slate">MBBS, MPH, MRCGP</p>
            </div>
            <div>
              <h2 className="mb-4 font-serif text-3xl font-bold text-brand-navy">About Dr. Samuel Onuekwa</h2>
              <p className="mb-4 text-brand-slate leading-relaxed">
                Dr. Samuel Onuekwa is an experienced family physician with over a decade of medical practice experience, including several years working in the United Kingdom before relocating to Canada. His background spans both public and private healthcare settings, where he gained extensive experience managing a wide range of acute and chronic medical conditions while providing comprehensive, patient-focused care.
              </p>
              <p className="mb-4 text-brand-slate leading-relaxed">
                He obtained his medical degree from the University of Port Harcourt and later earned a Master of Public Health with Distinction from the University of Wolverhampton. He completed his postgraduate residency training in the United Kingdom and was awarded Membership of the Royal College of General Practitioners (MRCGP).
              </p>
              <p className="text-brand-slate leading-relaxed">
                Dr. Onuekwa has also served in a variety of leadership roles throughout his career and has contributed to published research focused on improving healthcare delivery and patient outcomes. He is committed to providing compassionate, evidence-based, and patient-centred care, and is known for his approachable manner, attention to detail, and dedication to supporting patients in achieving their best possible health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dr. Joy Onuekwa */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 rounded-2xl border border-border bg-white p-8 md:grid-cols-[280px_1fr] md:p-12">
            <div>
              <PortraitPlaceholder label="Portrait" />
              <p className="mt-4 text-center font-serif text-lg font-bold text-brand-navy">Dr. Joy Onuekwa</p>
              <p className="text-center text-xs uppercase tracking-widest text-brand-slate">Family Physician</p>
            </div>
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-block w-fit rounded-full bg-brand-blue-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
                Coming Soon
              </span>
              <h2 className="mb-4 font-serif text-3xl font-bold text-brand-navy">Dr. Joy Onuekwa</h2>
              <p className="text-brand-slate leading-relaxed">
                A full biography for Dr. Joy Onuekwa will be available here soon. Please check back shortly to learn more about her background, training, and clinical interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

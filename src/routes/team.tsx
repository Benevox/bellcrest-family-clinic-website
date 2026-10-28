import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Doctors — Bellcrest Family Clinic" },
      { name: "description", content: "Meet the physicians of Bellcrest Family Clinic in Burlington — Dr. Samuel Onuekwa and Dr. Joy Onuekwa." },
      { property: "og:title", content: "Meet the Doctors — Bellcrest Family Clinic" },
      { property: "og:description", content: "Meet the physicians of Bellcrest Family Clinic in Burlington." },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy">
      <SiteHeader />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full bg-brand-gold-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-gold">
            Our Physicians
          </span>
          <h1 className="mb-6 font-serif text-5xl font-bold text-brand-navy md:text-6xl">Meet the Doctors</h1>
          <p className="mx-auto max-w-2xl text-lg text-brand-slate">
            Compassionate, evidence-based family medicine led by experienced physicians dedicated to your long-term health.
          </p>
        </div>
      </section>

      {/* Dr. Samuel Onuekwa */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-border bg-white p-8 md:p-12">
            <p className="mb-1 text-xs uppercase tracking-widest text-brand-gold">Family Physician</p>
            <h2 className="mb-1 font-serif text-3xl font-bold text-brand-navy">Dr. Samuel Onuekwa</h2>
            <p className="mb-6 text-sm uppercase tracking-widest text-brand-slate">MBBS, MPH, MRCGP, CCFP</p>
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
      </section>

      {/* Dr. Joy Onuekwa */}
      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-border bg-white p-8 md:p-12">
            <h2 className="mb-1 font-serif text-3xl font-bold text-brand-navy">Dr. Joy Onuekwa</h2>
            <p className="mb-6 text-sm uppercase tracking-widest text-brand-slate">MBBS, MRCGP, DRCOG, DCOSRH</p>
            <p className="mb-4 text-brand-slate leading-relaxed">
              Dr. Joy Onuekwa is a dedicated and enthusiastic medical professional with a strong commitment to delivering compassionate, patient-centred care. She obtained her MBBS from the University of Port Harcourt in 2015 and subsequently completed her medical residency and MRCGP in the United Kingdom.
            </p>
            <p className="mb-4 text-brand-slate leading-relaxed">
              With a special interest in women’s sexual and reproductive health, Dr. Onuekwa is passionate about supporting women through every stage of their healthcare journey, promoting wellbeing, and providing evidence-based, holistic care.
            </p>
            <p className="mb-4 text-brand-slate leading-relaxed">
              She holds additional UK qualifications, including the Diploma of the Royal College of Obstetricians and Gynaecologists (DRCOG) and the Diploma of the College/Faculty of Sexual and Reproductive Healthcare (DCoSRH).
            </p>
            <p className="mb-4 text-brand-slate leading-relaxed">
              Dr. Onuekwa is enthusiastic about collaborative working and values building strong professional relationships to achieve positive outcomes for patients. She is committed to continuous professional development, empowering patients through education, and contributing to a supportive and inclusive healthcare environment.
            </p>
            <p className="text-brand-slate leading-relaxed">
              Her approach combines clinical knowledge, empathy, and a genuine passion for improving health and wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Clinic environment banner */}
      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-2 shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl">
              <img
                src="/WhatsApp Image 2026-05-21 at 19.15.32 (6).jpeg"
                alt="Serene and welcoming clinic waiting area"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6 text-center">
              <h4 className="font-serif text-xl font-bold text-brand-navy mb-2">Our Clinic Environment</h4>
              <p className="text-sm text-brand-slate max-w-xl mx-auto">
                We believe that a serene, clean, and highly professional medical office plays a vital role in a positive healthcare experience. Visit us in downtown Burlington.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

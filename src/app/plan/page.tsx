import type { Metadata } from "next";
import Link from "next/link";

import { getAllSections } from "@/lib/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Adebayo's Chapter II Plan",
  description:
    "Policy commitments mapped to Chapter II of the Nigerian Constitution.",
};

export default function PlanPage() {
  const sections = getAllSections();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
            Commitments
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
            A governing plan mapped to Chapter II.
          </h1>
        </div>
        <p className="text-lg leading-8 text-stone-600">
          The platform positions {site.candidate} as a constitutionalist whose
          policy agenda is tested against Sections 13-24, not detached from
          them.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.slug}
            href={`/sections/${section.slug}#commitment`}
            className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
              Section {section.sectionNumber} / {section.theme}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">
              {section.shortTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              {section.commitment}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

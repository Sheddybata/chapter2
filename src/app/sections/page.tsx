import type { Metadata } from "next";

import { SectionCard } from "@/components/section-card";
import { getAllSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Explore Chapter 2",
  description:
    "Browse Sections 13 to 24 of Chapter II of the Nigerian Constitution.",
};

export default function SectionsPage() {
  const sections = getAllSections();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
          All sections
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
          Sections 13–24
        </h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">
          Browse every section of Chapter II with constitutional text, reality
          gaps, and campaign commitments.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <SectionCard key={section.slug} section={section} />
        ))}
      </div>
    </section>
  );
}

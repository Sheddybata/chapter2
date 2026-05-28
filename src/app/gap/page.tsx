import type { Metadata } from "next";
import Link from "next/link";

import { getAllSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "The Chapter II Gap",
  description:
    "A dashboard-style overview of the gap between Chapter II promises and Nigerian reality.",
};

export default function GapPage() {
  const sections = getAllSections();
  const prioritySections = sections.filter((section) =>
    ["14", "16A", "18", "20", "24"].includes(section.sectionNumber),
  );

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
              Promise vs reality
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
              The gap between constitutional objectives and daily life.
            </h1>
          </div>
          <p className="text-lg leading-8 text-stone-600">
            This is still frontend-only, but the layout is ready for real
            indicators, charts, source links, and progress scoring when the data
            set is prepared.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["13", "Chapter II sections tracked"],
            ["5", "Priority sections for early campaign storytelling"],
            ["0", "Live data integrations for now"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm"
            >
              <p className="text-5xl font-black tracking-tight text-emerald-900">
                {number}
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-stone-600">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
                Early focus
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950">
                Five sections to explain first
              </h2>
            </div>
            <Link
              href="/real-life"
              className="rounded-full bg-emerald-800 px-5 py-3 text-center text-sm font-black text-white"
            >
              View real-life examples
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {prioritySections.map((section) => (
              <Link
                key={section.slug}
                href={`/sections/${section.slug}`}
                className="rounded-[1.5rem] bg-stone-50 p-4 text-center transition hover:bg-emerald-50"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                  Section {section.sectionNumber}
                </p>
                <p className="mt-2 text-sm font-black leading-5 text-stone-800">
                  {section.shortTitle}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4">
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={`/sections/${section.slug}`}
              className="grid gap-4 rounded-[2rem] border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:border-emerald-700/40 md:grid-cols-[160px_1fr_0.8fr]"
            >
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                  Section {section.sectionNumber}
                </p>
                <p className="mt-2 text-lg font-black text-emerald-950">
                  {section.shortTitle}
                </p>
              </div>
              <p className="text-sm leading-6 text-stone-600">
                {section.realityTitle}
              </p>
              <p className="rounded-2xl bg-stone-50 p-4 text-sm font-semibold leading-6 text-stone-700">
                {section.realityStat}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

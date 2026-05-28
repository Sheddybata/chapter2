import Link from "next/link";

import type { ChapterSection } from "@/lib/sections";

type SectionCardProps = {
  section: ChapterSection;
};

export function SectionCard({ section }: SectionCardProps) {
  return (
    <Link
      href={`/sections/${section.slug}`}
      className="group flex h-full flex-col rounded-[2rem] border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
          Section {section.sectionNumber}
        </span>
        <span className="text-sm font-bold text-stone-400 transition group-hover:text-emerald-800">
          Read
        </span>
      </div>

      <h3 className="mt-5 text-xl font-black tracking-tight text-emerald-950">
        {section.shortTitle}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-stone-600">
        {section.plainEnglish}
      </p>
      <p className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm font-semibold leading-6 text-stone-700">
        {section.readerSummary}
      </p>
    </Link>
  );
}

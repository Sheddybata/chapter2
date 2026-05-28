import type { Metadata } from "next";
import Link from "next/link";

import { realLifeExamples } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Chapter II in Real Life",
  description:
    "Everyday examples that connect Chapter II of the Nigerian Constitution to real public problems.",
};

export default function RealLifePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
            Chapter II in real life
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
            The Constitution is not abstract when people are hungry, unsafe, or
            out of school.
          </h1>
        </div>
        <p className="text-lg leading-8 text-stone-600">
          Use these examples for classrooms, town halls, WhatsApp explainers,
          and campaign training. Each card turns a public problem into a Chapter
          II conversation.
        </p>
      </div>

      <div className="mt-10 grid gap-5">
        {realLifeExamples.map((example) => (
          <article
            key={example.issue}
            className="grid gap-5 rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.9fr]"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                Section {example.section}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">
                {example.issue}
              </h2>
              <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-950">
                Chapter II link: {example.chapter2Link}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-stone-50 p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-stone-500">
                Civic question
              </p>
              <p className="mt-3 text-lg font-black leading-7 text-stone-900">
                {example.civicQuestion}
              </p>
              <Link
                href={`/sections/${sectionSlug(example.section)}`}
                className="mt-5 inline-flex rounded-full bg-emerald-800 px-5 py-3 text-sm font-black text-white"
              >
                Read Section {example.section}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function sectionSlug(section: string) {
  const slugs: Record<string, string> = {
    "14": "14-government-and-the-people",
    "16A": "16a-food-security",
    "18": "18-educational-objectives",
    "20": "20-environmental-objectives",
    "24": "24-duties-of-the-citizen",
  };

  return slugs[section] ?? "sections";
}

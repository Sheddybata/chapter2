import type { Metadata } from "next";
import Link from "next/link";

import { audioLessons } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Downloadable constitutional resources, speeches, videos, and campaign materials.",
};

const resources = [
  {
    title: "Chapter II annotated PDF",
    description:
      "Placeholder for a campaign-ready PDF with constitutional text, plain-English notes, and Adebayo commitments.",
    href: "#",
  },
  {
    title: "Presidential Acceptance Speech at Bauchi",
    description:
      "Placeholder for the PDF and transcript referenced in the campaign brief.",
    href: "#",
  },
  {
    title: "13-reel video series",
    description:
      "Placeholder for vertical and horizontal embeds tied to each section page.",
    href: "#",
  },
];

const sourceGroups = [
  {
    label: "Legal sources",
    items: [
      "1999 Constitution of the Federal Republic of Nigeria, as amended",
      "Chapter II extract and amendment notes",
      "Plain-English explainer on Section 6(6)(c) and justiciability",
    ],
  },
  {
    label: "Data sources to connect later",
    items: [
      "National Bureau of Statistics",
      "UNICEF and UNESCO education datasets",
      "World Bank governance and development indicators",
      "Official ministry, INEC, NEMA, and sector reports",
    ],
  },
  {
    label: "Campaign assets",
    items: [
      "Presidential Acceptance Speech at Bauchi",
      "Manifesto excerpts mapped to Chapter II",
      "13-reel video series and QR links",
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
            Resource library
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
            Credibility lives here.
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            Keep the downloadable Constitution PDF, campaign speeches, videos,
            citations, classroom materials, audio explainers, and media assets
            in one trusted place.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40"
            >
              <h2 className="text-2xl font-black tracking-tight text-emerald-950">
                {resource.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-stone-600">
                {resource.description}
              </p>
              <p className="mt-6 text-sm font-black text-emerald-800">
                Add file or link
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {sourceGroups.map((group) => (
              <article
                key={group.label}
                className="rounded-[2rem] border border-emerald-950/10 bg-stone-50 p-6"
              >
                <h2 className="text-2xl font-black tracking-tight text-emerald-950">
                  {group.label}
                </h2>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-stone-600">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-2xl bg-white p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
              Audio lessons
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-emerald-950">
              Voice-note friendly explainers
            </h2>
          </div>
          <Link
            href="/share-kit"
            className="rounded-full bg-emerald-800 px-6 py-3 text-center text-sm font-black text-white"
          >
            Open share kit
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {audioLessons.map((lesson) => (
            <article
              key={lesson.title}
              className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-lg font-black text-emerald-900">
                Play
              </div>
              <h3 className="mt-5 text-xl font-black tracking-tight text-emerald-950">
                {lesson.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {lesson.description}
              </p>
              <p className="mt-5 text-sm font-black text-emerald-800">
                Placeholder / {lesson.duration}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { YouTubeEmbed } from "@/components/youtube-embed";
import { chapterTwoVideoSeries, constitutionPdf } from "@/lib/resources";
export const metadata: Metadata = {
  title: "Resources",
  description:
    "Downloadable constitutional resources, speeches, videos, and campaign materials.",
};

const resources = [
  {
    title: constitutionPdf.title,
    description: constitutionPdf.description,
    href: constitutionPdf.href,
    external: true,
  },
  {
    title: "Presidential Acceptance Speech at Bauchi",
    description:
      "Read the full acceptance speech online or download the official document.",
    href: "/acceptance-speech",
    external: false,
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
            Keep the Constitution PDF, campaign speeches, videos, and classroom
            materials in one trusted place.
          </p>        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {resources.map((resource) =>
            resource.external ? (
              <a
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40"
              >
                <h2 className="text-2xl font-black tracking-tight text-emerald-950">
                  {resource.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-stone-600">
                  {resource.description}
                </p>
                <p className="mt-6 text-sm font-black text-emerald-800">
                  Download PDF
                </p>
              </a>
            ) : (
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
                  Open resource
                </p>
              </Link>
            ),
          )}
        </div>
      </section>

      <section id="video-series" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
              Video series
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-emerald-950">
              13-reel video series
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              Watch the Chapter II video reels below.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {chapterTwoVideoSeries.map((video, index) => (
              <div key={`${video.title}-${index}`}>
                <h3 className="mb-3 text-lg font-black text-emerald-950">
                  {video.title}
                </h3>
                <YouTubeEmbed videoId={video.id} title={video.title} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
import type { Metadata } from "next";
import Link from "next/link";

import { acceptanceSpeech } from "@/lib/acceptance-speech";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Presidential Acceptance Speech",
  description:
    "Read Prince Adewole Adebayo's SDP presidential acceptance speech delivered in Bauchi on May 9, 2026.",
};

export default function AcceptanceSpeechPage() {
  const { title, subtitle, paragraphs } = acceptanceSpeech;
  const [headingLine, dateLine, ...bodyParagraphs] = paragraphs;

  return (
    <>
      <section className="border-b border-emerald-950/10 bg-emerald-950 text-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/sections"
            className="text-sm font-bold text-emerald-100 hover:text-white"
          >
            Back to Explore Chapter 2
          </Link>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
            {site.candidate}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-emerald-50/85">{subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/acceptancespeech.docx"
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-emerald-950"
            >
              Download speech
            </a>
            <Link
              href="/#acceptance-speech"
              className="rounded-full border border-white/25 px-6 py-3 text-center text-sm font-black text-white"
            >
              Watch video
            </Link>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="border-b border-emerald-950/10 pb-10">
          <p className="text-xl font-black leading-8 text-emerald-950">
            {headingLine}
          </p>
          <p className="mt-3 text-base font-semibold text-stone-600">
            {dateLine}
          </p>
          <div className="mt-8 space-y-2">
            {bodyParagraphs.slice(0, 3).map((line) => (
              <p
                key={line}
                className="text-center text-lg font-black uppercase tracking-[0.18em] text-emerald-800"
              >
                {line}
              </p>
            ))}
          </div>
        </header>

        <div className="prose-speech mt-10 space-y-6">
          {bodyParagraphs.slice(3).map((paragraph) => (
            <p key={paragraph} className="text-lg leading-9 text-stone-700">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-emerald-950/10 bg-stone-50 p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
            Chapter 2 connection
          </p>
          <p className="mt-4 text-base leading-8 text-stone-700">
            This speech frames the constitutional mission of the platform. Explore
            each section of Chapter II and connect the speech to policy
            commitments across the site.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sections"
              className="rounded-full bg-emerald-800 px-6 py-3 text-center text-sm font-black text-white"
            >
              Explore Chapter 2
            </Link>
            <Link
              href="/plan"
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-stone-800"
            >
              View Adebayo&apos;s plan
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

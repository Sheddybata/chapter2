import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
            Constitution explorer
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
            Explore Chapter 2 with Prince Adewole Adebayo.
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            Read each constitutional objective, compare it with Nigerian
            reality, and connect it to Adebayo&apos;s policy commitments.
          </p>
        </div>
        <div className="rounded-[2rem] border border-emerald-950/10 bg-white p-4 shadow-sm">
          <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] bg-emerald-950">
            <Image
              src="/princewole.jpg"
              alt="Prince Adewole Adebayo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950 via-emerald-950/75 to-transparent p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100">
                Prince Adewole Adebayo
              </p>
              <p className="mt-2 text-2xl font-black tracking-tight">
                Constitutional leadership for Chapter 2.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="acceptance-speech"
        className="mt-10 grid gap-6 rounded-[2rem] border border-emerald-950/10 bg-white p-5 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-6"
      >
        <div className="overflow-hidden rounded-[1.5rem] bg-black">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/CBb5wehpX3k?si=JUI582o6WNmUudvh"
              title="Prince Adewole Adebayo acceptance speech"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        <div className="flex flex-col justify-center p-2 sm:p-4">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
            Acceptance speech
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950">
            The speech that frames the constitutional mission.
          </h2>
          <p className="mt-4 text-sm leading-6 text-stone-600">
            Watch the video and keep the acceptance speech document close as the
            platform grows into publications, events, and organizing tools.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/acceptancespeech.docx"
              className="rounded-full bg-emerald-800 px-5 py-3 text-center text-sm font-black text-white"
            >
              Download speech
            </a>
            <Link
              href="/acceptance-speech"
              className="rounded-full bg-stone-100 px-5 py-3 text-center text-sm font-black text-stone-800"
            >
              Read full speech
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <SectionCard key={section.slug} section={section} />
        ))}
      </div>
    </section>
  );
}

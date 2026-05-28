import Link from "next/link";

import { SectionCard } from "@/components/section-card";
import { getAllSections } from "@/lib/sections";
import { site } from "@/lib/site";

export default function Home() {
  const sections = getAllSections();
  const featuredSections = sections.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,#ffffff_0,transparent_28%),linear-gradient(135deg,#047857_0%,#064e3b_45%,#f8f7f2_45%,#f8f7f2_55%,#064e3b_55%,#022c22_100%)]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-50">
              1999 Constitution, Chapter II
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/85">
              A high-conviction civic education platform showing what Nigeria&apos;s
              Constitution already promises and how {site.candidate} will turn
              those promises into a governing standard.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sections"
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-emerald-950 shadow-xl transition hover:bg-emerald-50"
              >
                Explore the 13 Sections
              </Link>
              <Link
                href="/action"
                className="rounded-full border border-white/25 px-6 py-4 text-center text-sm font-black text-white transition hover:bg-white/10"
              >
                Sign for Justiciability
              </Link>
              <Link
                href="/students"
                className="rounded-full border border-white/25 px-6 py-4 text-center text-sm font-black text-white transition hover:bg-white/10"
              >
                Student Zone
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <div className="constitutional-quote rounded-[1.5rem] bg-white p-6 text-emerald-950">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                Flagship promise
              </p>
              <blockquote className="mt-5 text-3xl font-black leading-tight tracking-tight">
                &quot;The security and welfare of the people shall be the primary
                purpose of government.&quot;
              </blockquote>
              <p className="mt-5 text-sm font-bold text-stone-600">
                Section 14 is the clearest doorway into the Chapter II message:
                government exists for citizens.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
              Start here
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-emerald-950">
              Explore Chapter II by section
            </h2>
          </div>
          <Link
            href="/sections"
            className="text-sm font-black text-emerald-800 hover:text-emerald-950"
          >
            View all {sections.length} sections
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredSections.map((section) => (
            <SectionCard key={section.slug} section={section} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ["Educate", "Plain-English summaries make constitutional objectives understandable without overstating their legal effect."],
            ["Expose the gap", "Each section can carry sourced stats showing the gap between law and reality."],
            ["Convert", "Every page points voters toward joining, signing, sharing, and organizing."],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-[2rem] border border-emerald-950/10 bg-stone-50 p-6"
            >
              <h3 className="text-2xl font-black text-emerald-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["/students", "Student Zone", "Quizzes, glossary, classroom prompts, and a completion badge for young citizens."],
            ["/real-life", "Chapter II in Real Life", "Everyday examples that connect constitutional objectives to food, school, safety, and environment."],
            ["/share-kit", "Share Kit", "Frontend quote cards ready for social graphics and future OG image automation."],
          ].map(([href, title, body]) => (
            <Link
              key={href}
              href={href}
              className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40"
            >
              <h3 className="text-2xl font-black tracking-tight text-emerald-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{body}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { ChapterQuiz } from "@/components/chapter-quiz";
import { studentGlossary, studentModules } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Student Zone",
  description:
    "A secondary-school friendly guide to Chapter II of the Nigerian Constitution.",
};

export default function StudentsPage() {
  return (
    <>
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
              Student Zone
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">
              Chapter II for schools and young citizens.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/85">
              A simple classroom-friendly space for secondary school students
              to understand government duties, citizen duties, and the promise
              of Chapter II.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quiz"
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-emerald-950"
              >
                Take the quiz
              </a>
              <Link
                href="/real-life"
                className="rounded-full border border-white/25 px-6 py-4 text-center text-sm font-black text-white"
              >
                See real-life examples
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              Teacher note
            </p>
            <p className="mt-4 text-2xl font-black leading-tight">
              Use Chapter II to discuss public problems without turning the
              classroom into a partisan rally.
            </p>
            <p className="mt-4 text-sm leading-6 text-emerald-50/80">
              The goal is civic literacy: what the Constitution says, what
              government should do, what citizens can ask for, and what citizens
              owe the country.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {studentModules.map((module) => (
            <article
              key={module.title}
              className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                {module.section}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">
                {module.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {module.summary}
              </p>
              <p className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm font-semibold leading-6 text-stone-700">
                Classroom prompt: {module.classroomPrompt}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="quiz" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <ChapterQuiz />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
              Glossary
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-emerald-950">
              Words students should know
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {studentGlossary.map((item) => (
              <div
                key={item.term}
                className="rounded-[1.5rem] border border-emerald-950/10 bg-stone-50 p-5"
              >
                <h3 className="text-xl font-black text-emerald-950">
                  {item.term}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

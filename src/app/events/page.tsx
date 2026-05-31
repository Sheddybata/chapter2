import type { Metadata } from "next";

import { pastEvents, upcomingEvents } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events for Achieving Chapter II - Adewole 2027.",
};

export default function EventsPage() {
  return (
    <>
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
            Events
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.05em]">
            Town halls, student sessions, petition drives, and campaign
            briefings.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/85">
            A frontend-ready events hub for upcoming and past programs. Later,
            this can connect to registration, reminders, check-ins, and event
            galleries.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
              Upcoming
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-emerald-950">
              Upcoming events
            </h2>
          </div>
          <button
            type="button"
            className="rounded-full bg-emerald-800 px-6 py-3 text-sm font-black text-white"
          >
            Registration coming soon
          </button>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article
              key={event.title}
              className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                {event.date}
              </p>
              <h3 className="mt-4 text-2xl font-black tracking-tight text-emerald-950">
                {event.title}
              </h3>
              <p className="mt-2 text-sm font-bold text-stone-500">
                {event.location}
              </p>
              <p className="mt-4 text-sm leading-6 text-stone-600">
                {event.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
            Archive
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-emerald-950">
            Past events
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {pastEvents.map((event) => (
              <article
                key={event.title}
                className="rounded-[2rem] border border-emerald-950/10 bg-stone-50 p-6"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                  {event.date}
                </p>
                <h3 className="mt-4 text-2xl font-black tracking-tight text-emerald-950">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm font-bold text-stone-500">
                  {event.location}
                </p>
                <p className="mt-4 text-sm leading-6 text-stone-600">
                  {event.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

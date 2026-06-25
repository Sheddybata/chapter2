import type { Metadata } from "next";

import { getCampaignEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events for Achieving Chapter II - Adewole 2027.",
};

function EventCard({
  eventDate,
  title,
  location,
  description,
  muted = false,
}: {
  eventDate: string;
  title: string;
  location: string;
  description: string;
  muted?: boolean;
}) {
  return (
    <article
      className={[
        "rounded-[2rem] border border-emerald-950/10 p-6",
        muted ? "bg-stone-50" : "bg-white shadow-sm",
      ].join(" ")}
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
        {eventDate}
      </p>
      <h3 className="mt-4 text-2xl font-black tracking-tight text-emerald-950">
        {title}
      </h3>
      <p className="mt-2 text-sm font-bold text-stone-500">{location}</p>
      <p className="mt-4 text-sm leading-6 text-stone-600">{description}</p>
    </article>
  );
}

export default async function EventsPage() {
  const events = await getCampaignEvents();
  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const pastEvents = events.filter((event) => event.status === "past");

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
            Follow upcoming programs and revisit past campaign events here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
            Upcoming
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-emerald-950">
            Upcoming events
          </h2>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {upcomingEvents.length === 0 ? (
            <p className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 text-sm text-stone-600 lg:col-span-3">
              No upcoming events yet. Check back soon.
            </p>
          ) : (
            upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                eventDate={event.event_date}
                title={event.title}
                location={event.location}
                description={event.description}
              />
            ))
          )}
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
            {pastEvents.length === 0 ? (
              <p className="rounded-[2rem] border border-emerald-950/10 bg-stone-50 p-6 text-sm text-stone-600 md:col-span-2">
                No past events yet.
              </p>
            ) : (
              pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  eventDate={event.event_date}
                  title={event.title}
                  location={event.location}
                  description={event.description}
                  muted
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

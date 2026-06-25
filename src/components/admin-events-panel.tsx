"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import {
  addEvent,
  removeAllEvents,
  removeEvent,
} from "@/app/admin/events/actions";
import type { CampaignEvent, EventStatus } from "@/types/content";

type AdminEventsPanelProps = {
  events: CampaignEvent[];
};

const inputClassName =
  "rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4";

export function AdminEventsPanel({ events }: AdminEventsPanelProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<EventStatus>("upcoming");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await addEvent({
      title,
      eventDate,
      location,
      description,
      status,
    });

    if (result.error) {
      setMessage(result.error);
      setIsLoading(false);
      return;
    }

    setTitle("");
    setEventDate("");
    setLocation("");
    setDescription("");
    setStatus("upcoming");
    router.refresh();
    setIsLoading(false);
  }

  async function handleDelete(eventId: string) {
    setIsLoading(true);
    setMessage(null);

    const result = await removeEvent(eventId);

    if (result.error) {
      setMessage(result.error);
      setIsLoading(false);
      return;
    }

    router.refresh();
    setIsLoading(false);
  }

  async function handleDeleteAll() {
    if (!window.confirm("Remove all events? This cannot be undone.")) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const result = await removeAllEvents();

    if (result.error) {
      setMessage(result.error);
      setIsLoading(false);
      return;
    }

    router.refresh();
    setIsLoading(false);
  }

  const upcoming = events.filter((item) => item.status === "upcoming");
  const past = events.filter((item) => item.status === "past");

  return (
    <div className="grid gap-10">
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm"
      >
        <h2 className="text-2xl font-black text-emerald-950">Add event</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-stone-700 md:col-span-2">
            Title
            <input
              className={inputClassName}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Date
            <input
              className={inputClassName}
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
              placeholder="e.g. 12 June 2026"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Location
            <input
              className={inputClassName}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700 md:col-span-2">
            Description
            <textarea
              className={`${inputClassName} min-h-28`}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Section
            <select
              className={inputClassName}
              value={status}
              onChange={(event) => setStatus(event.target.value as EventStatus)}
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 rounded-full bg-emerald-800 px-6 py-3 text-sm font-black text-white disabled:opacity-60"
        >
          {isLoading ? "Saving..." : "Add event"}
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-emerald-950">Current events</h2>
        {events.length > 0 ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => void handleDeleteAll()}
            className="rounded-full bg-stone-700 px-5 py-3 text-sm font-black text-white disabled:opacity-60"
          >
            Remove all events
          </button>
        ) : null}
      </div>

      {message ? (
        <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{message}</p>
      ) : null}

      <EventSection
        title="Upcoming events"
        events={upcoming}
        emptyMessage="No upcoming events yet."
        onDelete={(eventId) => void handleDelete(eventId)}
        isLoading={isLoading}
      />

      <EventSection
        title="Past events"
        events={past}
        emptyMessage="No past events yet."
        onDelete={(eventId) => void handleDelete(eventId)}
        isLoading={isLoading}
      />
    </div>
  );
}

function EventSection({
  title,
  events,
  emptyMessage,
  onDelete,
  isLoading,
}: {
  title: string;
  events: CampaignEvent[];
  emptyMessage: string;
  onDelete: (eventId: string) => void;
  isLoading: boolean;
}) {
  return (
    <section className="grid gap-4">
      <h3 className="text-xl font-black text-emerald-950">{title}</h3>
      {events.length === 0 ? (
        <p className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 text-sm text-stone-600">
          {emptyMessage}
        </p>
      ) : (
        events.map((event) => (
          <article
            key={event.id}
            className="flex flex-col justify-between gap-4 rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm sm:flex-row sm:items-start"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                {event.event_date}
              </p>
              <h4 className="mt-2 text-xl font-black text-emerald-950">{event.title}</h4>
              <p className="mt-2 text-sm font-bold text-stone-500">{event.location}</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">{event.description}</p>
            </div>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onDelete(event.id)}
              className="rounded-full bg-stone-700 px-5 py-3 text-sm font-black text-white disabled:opacity-60"
            >
              Remove
            </button>
          </article>
        ))
      )}
    </section>
  );
}

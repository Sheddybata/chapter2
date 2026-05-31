"use client";

import { FormEvent, useState } from "react";

import { openWhatsApp } from "@/lib/whatsapp";

export function ActionJoinForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "I want to join the Chapter II movement.",
      "",
      `Name: ${name.trim() || "Not provided"}`,
      `Email: ${email.trim() || "Not provided"}`,
      `State / LGA: ${location.trim() || "Not provided"}`,
    ].join("\n");

    openWhatsApp(message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-black tracking-tight text-emerald-950">
        Join the Chapter II movement
      </h2>
      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Full name
          <input
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Email address
          <input
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
            name="email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          State / LGA
          <input
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
            name="location"
            placeholder="Lagos / Ikeja"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-emerald-800 px-6 py-4 text-sm font-black text-white transition hover:bg-emerald-900"
        >
          Join via WhatsApp
        </button>
      </div>
    </form>
  );
}

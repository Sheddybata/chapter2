"use client";

import { openWhatsApp } from "@/lib/whatsapp";

const pollOptions = [
  "Make all Chapter II provisions justiciable",
  "Pass enabling laws section by section",
  "Start with education, food, and security",
  "Use public reporting before court enforcement",
];

export function ChapterPoll() {
  function handleSelect(option: string) {
    openWhatsApp(
      `I support making Chapter II operational. My priority is: ${option}.`,
    );
  }

  return (
    <div className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
        Your priority
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">
        What should happen first?
      </h2>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        Tap your answer to send it to the campaign team on WhatsApp.
      </p>
      <div className="mt-5 grid gap-3">
        {pollOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-left text-sm font-bold text-stone-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-950"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

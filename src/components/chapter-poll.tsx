"use client";

import { useState } from "react";

const pollOptions = [
  "Make all Chapter II provisions justiciable",
  "Pass enabling laws section by section",
  "Start with education, food, and security",
  "Use public reporting before court enforcement",
];

export function ChapterPoll() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
        Frontend poll
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">
        What should happen first?
      </h2>
      <div className="mt-5 grid gap-3">
        {pollOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={[
              "rounded-2xl border px-4 py-3 text-left text-sm font-bold transition",
              selected === option
                ? "border-emerald-700 bg-emerald-50 text-emerald-950"
                : "border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-300",
            ].join(" ")}
          >
            {option}
          </button>
        ))}
      </div>
      {selected ? (
        <p className="mt-4 rounded-2xl bg-emerald-900 p-4 text-sm font-semibold leading-6 text-white">
          You selected: {selected}. Later, this can save responses to Supabase
          or your CRM with state/LGA segmentation.
        </p>
      ) : null}
    </div>
  );
}

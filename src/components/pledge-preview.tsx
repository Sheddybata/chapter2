"use client";

import { useState } from "react";

const pledgeSections = [
  "Section 14: Security and welfare",
  "Section 16A: Food security",
  "Section 18: Education",
  "Section 20: Environment",
  "Section 24: Citizen duties",
];

export function PledgePreview() {
  const [selected, setSelected] = useState(pledgeSections[0]);

  return (
    <div className="rounded-[2rem] border border-emerald-950/10 bg-emerald-950 p-6 text-white shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-200">
        Adopt a section
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-tight">
        Choose the Chapter II promise you want to champion.
      </h2>
      <div className="mt-5 grid gap-2">
        {pledgeSections.map((section) => (
          <button
            key={section}
            type="button"
            onClick={() => setSelected(section)}
            className={[
              "rounded-2xl border px-4 py-3 text-left text-sm font-bold transition",
              selected === section
                ? "border-white bg-white text-emerald-950"
                : "border-white/15 bg-white/10 text-emerald-50 hover:bg-white/15",
            ].join(" ")}
          >
            {section}
          </button>
        ))}
      </div>
      <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-semibold leading-6 text-emerald-50">
        Preview pledge: I will learn, share, and organize around {selected}.
      </p>
    </div>
  );
}

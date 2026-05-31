"use client";

import { openWhatsApp } from "@/lib/whatsapp";

const pledgeSections = [
  "Section 14: Security and welfare",
  "Section 16A: Food security",
  "Section 18: Education",
  "Section 20: Environment",
  "Section 24: Citizen duties",
];

export function PledgePreview() {
  function handlePledge(section: string) {
    openWhatsApp(`I have pledged to ${section}.`);
  }

  return (
    <div className="rounded-[2rem] border border-emerald-950/10 bg-emerald-950 p-6 text-white shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-200">
        Adopt a section
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-tight">
        Choose the Chapter II promise you want to champion.
      </h2>
      <p className="mt-3 text-sm leading-6 text-emerald-100/90">
        Tap a section to send your pledge to the campaign team on WhatsApp.
      </p>
      <div className="mt-5 grid gap-2">
        {pledgeSections.map((section) => (
          <button
            key={section}
            type="button"
            onClick={() => handlePledge(section)}
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-left text-sm font-bold text-emerald-50 transition hover:border-white hover:bg-white hover:text-emerald-950"
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
}

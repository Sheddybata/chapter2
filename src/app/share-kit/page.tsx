import type { Metadata } from "next";

import { shareQuotes } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Share Kit",
  description:
    "Frontend social quote cards for Chapter II sections, ready for design export or OG image automation later.",
};

export default function ShareKitPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
          Share kit
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
          Quote cards ready for WhatsApp, Instagram, X, and campaign graphics.
        </h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">
          These are frontend previews. Later, the same data can power automatic
          Open Graph images, downloadable PNGs, and section-specific QR codes.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {shareQuotes.map((item) => (
          <article
            key={item.quote}
            className="overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-white shadow-sm"
          >
            <div className="bg-emerald-950 p-8 text-white">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200">
                Section {item.section}
              </p>
              <blockquote className="mt-5 text-3xl font-black leading-tight tracking-tight">
                &quot;{item.quote}&quot;
              </blockquote>
              <p className="mt-6 text-sm font-bold text-emerald-50/80">
                {item.caption}
              </p>
            </div>
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-800">
                Chapter II Now
              </p>
              <button
                type="button"
                className="rounded-full bg-stone-100 px-5 py-3 text-sm font-black text-stone-700"
              >
                Export later
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import type { Metadata } from "next";

import { ChapterPoll } from "@/components/chapter-poll";
import { PledgePreview } from "@/components/pledge-preview";

export const metadata: Metadata = {
  title: "Join the Movement",
  description:
    "Join, sign, share, and organize around Chapter II of the Nigerian Constitution.",
};

export default function ActionPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
              Join the Movement
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
              Make Chapter II operational.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
              This v1 action hub is ready for a real petition backend later.
              For now, it gives the campaign a clear conversion page, petition
              preview, pledge experience, and poll layout.
            </p>
          </div>

          <form className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm">
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
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-stone-700">
                Email address
                <input
                  className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-stone-700">
                State / LGA
                <input
                  className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
                  name="location"
                  placeholder="Lagos / Ikeja"
                />
              </label>
              <button
                type="button"
                className="rounded-full bg-emerald-800 px-6 py-4 text-sm font-black text-white transition hover:bg-emerald-900"
              >
                Form backend coming next
              </button>
            </div>
            <p className="mt-4 text-xs leading-5 text-stone-500">
              Before launch, connect this form to Tally, Brevo, Supabase, or
              your campaign CRM and add NDPR consent language.
            </p>
          </form>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Sign", "Primary petition: make Chapter II justiciable or operational through legislation."],
            ["Share", "Use WhatsApp, X, Instagram, and QR codes from each reel to drive people here."],
            ["Organize", "Route supporters by state, LGA, and adopted section once the backend is live."],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-black text-emerald-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[2rem] border border-emerald-950/10 bg-stone-50 p-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
              Petition preview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950">
              Make Chapter II operational and enforceable.
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              We call for legal and policy action to make the Fundamental
              Objectives and Directive Principles of State Policy meaningful in
              budgeting, public reporting, and governance.
            </p>
            <div className="mt-6 overflow-hidden rounded-full bg-white">
              <div className="h-4 w-2/3 rounded-full bg-emerald-800" />
            </div>
            <p className="mt-3 text-sm font-black text-emerald-900">
              Demo progress: 6,700 / 10,000 supporters
            </p>
          </div>
          <ChapterPoll />
          <PledgePreview />
          <div className="rounded-[2rem] border border-emerald-950/10 bg-stone-50 p-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
              Production integration later
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">
              Backend-ready, but not backend-dependent.
            </h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-stone-600">
              <li className="rounded-2xl bg-white p-4">Petition signatures can go to Supabase.</li>
              <li className="rounded-2xl bg-white p-4">Newsletter consent can go to Brevo or Mailchimp.</li>
              <li className="rounded-2xl bg-white p-4">Polls and pledges can store state, LGA, and adopted section.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

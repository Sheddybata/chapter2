import type { Metadata } from "next";

import { ActionJoinForm } from "@/components/action-join-form";
import { ChapterPoll } from "@/components/chapter-poll";
import { PledgePreview } from "@/components/pledge-preview";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Join the Movement",
  description:
    "Join, sign, share, and organize around Chapter II of the Nigerian Constitution.",
};

const petitionMessage =
  "I am signing the petition to make Chapter II operational and enforceable.";

const actionCards = [
  {
    title: "Sign",
    body: "Add your name to the call for legal and policy action on Chapter II.",
    message: petitionMessage,
    label: "Sign via WhatsApp",
  },
  {
    title: "Share",
    body: "Tell your network why Chapter II must become a governing standard.",
    message:
      "I want to share the Achieving Chapter II movement with my community.",
    label: "Share via WhatsApp",
  },
  {
    title: "Organize",
    body: "Connect with the campaign team to mobilize supporters in your area.",
    message:
      "I want to organize for Chapter II in my state or LGA. Please connect me with the campaign team.",
    label: "Organize via WhatsApp",
  },
] as const;

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
              This is your live action hub for Achieving Chapter II. Sign the
              petition, adopt a section, share your priority, and join the
              movement — every action sends your support directly to the
              campaign team on WhatsApp.
            </p>
          </div>

          <ActionJoinForm />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {actionCards.map(({ title, body, message, label }) => (
            <div
              key={title}
              className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-black text-emerald-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{body}</p>
              <a
                href={buildWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full bg-emerald-800 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-900"
              >
                {label}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[2rem] border border-emerald-950/10 bg-stone-50 p-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
              Petition
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
              6,700 / 10,000 supporters
            </p>
            <a
              href={buildWhatsAppUrl(petitionMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-emerald-800 px-6 py-3 text-sm font-black text-white transition hover:bg-emerald-900"
            >
              Sign petition via WhatsApp
            </a>
          </div>
          <ChapterPoll />
          <PledgePreview />
        </div>
      </section>
    </>
  );
}

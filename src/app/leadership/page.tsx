import type { Metadata } from "next";
import Image from "next/image";

import { leadership, zonalLeadership } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Leadership and zonal leadership structure for Achieving Chapter II - Adewole 2027.",
};

type Leader = (typeof leadership)[number];

function LeadershipCard({ leader }: { leader: Leader }) {
  if ("image" in leader && leader.image) {
    return (
      <article className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-emerald-950/10 shadow-sm">
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-950/20" />
        <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 text-white">
          <h3 className="text-2xl font-black tracking-tight">{leader.name}</h3>
          <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-emerald-100">
            {leader.role}
          </p>
          <p className="mt-4 text-sm leading-6 text-emerald-50/90">{leader.focus}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-xl font-black text-emerald-900">
        {leader.name
          .split(" ")
          .slice(0, 2)
          .map((part) => part[0])
          .join("")}
      </div>
      <h3 className="mt-5 text-2xl font-black tracking-tight text-emerald-950">
        {leader.name}
      </h3>
      <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-emerald-800">
        {leader.role}
      </p>
      <p className="mt-4 text-sm leading-6 text-stone-600">{leader.focus}</p>
    </article>
  );
}

export default function LeadershipPage() {
  return (
    <>
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
              Leadership
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">
              A movement needs constitutional clarity and field structure.
            </h1>
          </div>
          <p className="text-lg leading-8 text-emerald-50/85 lg:pt-12">
            National leadership, advisory roles, and zonal coordination for
            Achieving Chapter II across Nigeria.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
            Platform leadership
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-emerald-950">
            National leadership
          </h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {leadership.map((leader) => (
            <LeadershipCard key={leader.name} leader={leader} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
              Zonal leadership
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-emerald-950">
              Six zones, one constitutional message.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {zonalLeadership.map((zone) => (
              <article
                key={zone.zone}
                className="rounded-[2rem] border border-emerald-950/10 bg-stone-50 p-6"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                  {zone.coordinator}
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">
                  {zone.zone}
                </h3>
                <p className="mt-4 text-sm leading-6 text-stone-600">
                  {zone.focus}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

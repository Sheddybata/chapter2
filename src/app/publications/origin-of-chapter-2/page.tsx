import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Origin of Chapter 2",
  description:
    "Publications on the origin of Chapter II of the Nigerian Constitution.",
};

export default function OriginPublicationsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Link
        href="/publications"
        className="text-sm font-bold text-emerald-800 hover:text-emerald-950"
      >
        Back to publications
      </Link>
      <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
        Publication series
      </p>
      <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
        Origin of Chapter 2
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
        Articles for this series will be added here as they are prepared.
      </p>
    </section>
  );
}

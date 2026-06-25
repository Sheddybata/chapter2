import type { Metadata } from "next";
import Link from "next/link";

import { AdminEventsPanel } from "@/components/admin-events-panel";
import { requireAdmin } from "@/lib/admin";
import { listAdminEvents } from "@/lib/supabase/service";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Manage events",
  description: "Add and remove campaign events for Achieving Chapter II.",
};

export default async function AdminEventsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-emerald-950">Manage events</h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          Supabase is not configured yet.
        </p>
      </section>
    );
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.ADMIN_EMAILS) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-emerald-950">Manage events</h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          Add `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_EMAILS` to your environment,
          then redeploy.
        </p>
      </section>
    );
  }

  await requireAdmin();

  const events = await listAdminEvents();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href="/account" className="text-sm font-bold text-emerald-800 hover:text-emerald-950">
        Back to account
      </Link>
      <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
        Admin
      </p>
      <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
        Manage events
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
        Add upcoming and past events for the public Events page, or remove all
        events to start fresh.
      </p>

      <div className="mt-10">
        <AdminEventsPanel events={events} />
      </div>
    </section>
  );
}

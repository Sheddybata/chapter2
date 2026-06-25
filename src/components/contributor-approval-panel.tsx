"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  approveContributor,
  revokeContributor,
} from "@/app/admin/contributors/actions";
import type { Profile } from "@/types/articles";

type ContributorApprovalPanelProps = {
  pending: Profile[];
  approved: Profile[];
};

function ContributorRow({
  profile,
  action,
  actionLabel,
  pending,
}: {
  profile: Profile;
  action: (profileId: string) => Promise<{ error: string | null }>;
  actionLabel: string;
  pending?: boolean;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await action(profile.id);

      if (result.error) {
        setMessage(result.error);
        return;
      }

      router.refresh();
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-between gap-4 rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
          {pending ? "Awaiting approval" : "Approved contributor"}
        </p>
        <h3 className="mt-2 text-xl font-black text-emerald-950">
          {profile.display_name}
        </h3>
        <p className="mt-2 text-sm text-stone-600">
          {profile.email ?? "Email not synced yet"}
        </p>
        <p className="mt-1 text-xs text-stone-500">
          Joined{" "}
          {new Date(profile.created_at).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => void handleClick()}
          className={[
            "rounded-full px-5 py-3 text-sm font-black text-white transition disabled:opacity-60",
            pending ? "bg-emerald-800 hover:bg-emerald-900" : "bg-stone-700 hover:bg-stone-800",
          ].join(" ")}
        >
          {isLoading ? "Saving..." : actionLabel}
        </button>
        {message ? <p className="text-xs text-red-700">{message}</p> : null}
      </div>
    </div>
  );
}

export function ContributorApprovalPanel({
  pending,
  approved,
}: ContributorApprovalPanelProps) {
  return (
    <div className="grid gap-10">
      <section className="grid gap-4">
        <div>
          <h2 className="text-2xl font-black text-emerald-950">Awaiting approval</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            These accounts can log in but cannot publish until you approve them.
          </p>
        </div>
        {pending.length === 0 ? (
          <p className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 text-sm text-stone-600">
            No pending contributors.
          </p>
        ) : (
          pending.map((profile) => (
            <ContributorRow
              key={profile.id}
              profile={profile}
              action={approveContributor}
              actionLabel="Approve contributor"
              pending
            />
          ))
        )}
      </section>

      <section className="grid gap-4">
        <div>
          <h2 className="text-2xl font-black text-emerald-950">Approved contributors</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            These accounts can publish articles immediately from their dashboard.
          </p>
        </div>
        {approved.length === 0 ? (
          <p className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 text-sm text-stone-600">
            No approved contributors yet.
          </p>
        ) : (
          approved.map((profile) => (
            <ContributorRow
              key={profile.id}
              profile={profile}
              action={revokeContributor}
              actionLabel="Revoke publishing"
            />
          ))
        )}
      </section>
    </div>
  );
}

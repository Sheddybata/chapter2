import type { Metadata } from "next";
import Link from "next/link";

import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a contributor account for Achieving Chapter II.",
};

export default function SignupPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
      <div>
        <Link href="/" className="text-sm font-bold text-emerald-800 hover:text-emerald-950">
          Back to home
        </Link>
        <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
          Contributors
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
          Request contributor access.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
          Accounts are invite-only. After signup, the campaign team enables
          publishing on your profile before you can post articles live.
        </p>
      </div>
      <AuthForm mode="signup" />
    </section>
  );
}

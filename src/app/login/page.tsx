import type { Metadata } from "next";
import Link from "next/link";

import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Achieving Chapter II contributor account.",
};

type LoginPageProps = {
  searchParams: Promise<{
    registered?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { registered } = await searchParams;
  const successMessage =
    registered === "1" ? "Account created successfully. Please log in." : null;

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
          Welcome back.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
          Log in to manage your drafts and publish articles for Origin, History,
          or Potentiality of Chapter II.
        </p>
      </div>
      <AuthForm mode="login" successMessage={successMessage} />
    </section>
  );
}

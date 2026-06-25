"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { loginAction, signupAction } from "@/lib/auth-actions";

type AuthFormProps = {
  mode: "login" | "signup";
  successMessage?: string | null;
};

export function AuthForm({ mode, successMessage = null }: AuthFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      if (mode === "signup") {
        if (!consent) {
          setMessage("Please accept the data use notice before creating an account.");
          return;
        }

        const result = await signupAction(fullName, email, password);

        if (result?.error) {
          setMessage(result.error);
          return;
        }

        if (result?.success && result.redirectTo) {
          window.location.href = result.redirectTo;
        }

        return;
      }

      const result = await loginAction(email, password);

      if (result?.error) {
        setMessage(result.error);
        return;
      }

      if (result?.success) {
        window.location.href = "/account";
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-black tracking-tight text-emerald-950">
        {mode === "login" ? "Log in" : "Create account"}
      </h1>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        {mode === "login"
          ? "Access your contributor dashboard."
          : "Create an account to request contributor access. Publishing is enabled invite-only by the campaign team."}
      </p>

      {successMessage ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
          {successMessage}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4">
        {mode === "signup" ? (
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Full name
            <input
              className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
              required
            />
          </label>
        ) : null}

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Email address
          <input
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Password
          <input
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            minLength={8}
            placeholder="At least 8 characters"
            required
          />
        </label>

        {mode === "signup" ? (
          <label className="flex items-start gap-3 text-sm leading-6 text-stone-600">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-1"
            />
            <span>
              I agree that my account details may be processed to manage contributor
              access and publication activity on Achieving Chapter II.
            </span>
          </label>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-emerald-800 px-6 py-4 text-sm font-black text-white transition hover:bg-emerald-900 disabled:opacity-60"
        >
          {isLoading
            ? "Please wait..."
            : mode === "login"
              ? "Log in"
              : "Create account"}
        </button>
      </div>

      {message ? (
        <p className="mt-4 rounded-2xl bg-stone-100 p-4 text-sm leading-6 text-stone-700">
          {message}
        </p>
      ) : null}

      <p className="mt-4 text-sm text-stone-600">
        {mode === "login" ? (
          <>
            Need an account?{" "}
            <Link href="/signup" className="font-bold text-emerald-800">
              Create one
            </Link>
          </>
        ) : (
          <>
            Already registered?{" "}
            <Link href="/login" className="font-bold text-emerald-800">
              Log in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

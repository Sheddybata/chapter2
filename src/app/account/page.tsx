import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/sign-out-button";
import { isAdminEmail } from "@/lib/admin";
import {
  getAuthorArticles,
  getCurrentProfile,
} from "@/lib/articles";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSeriesLabel } from "@/types/articles";

export const metadata: Metadata = {
  title: "My account",
  description: "Manage your contributor articles on Achieving Chapter II.",
};

export default async function AccountPage() {
  if (!isSupabaseConfigured()) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-emerald-950">Contributor account</h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          Supabase is not configured yet. Add `NEXT_PUBLIC_SUPABASE_URL` and
          `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your environment, then run the SQL
          migration in `supabase/migrations/001_articles.sql`.
        </p>
      </section>
    );
  }

  const { user, profile } = await getCurrentProfile();

  if (!user) {
    redirect("/login");
  }

  const articles = await getAuthorArticles(user.id);
  const isAdmin = isAdminEmail(user.email);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
            My account
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-emerald-950">
            {profile?.display_name ?? user.email}
          </h1>
          <p className="mt-3 text-sm text-stone-600">{user.email}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {isAdmin ? (
            <Link
              href="/admin/contributors"
              className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-900"
            >
              Approve contributors
            </Link>
          ) : null}
          <SignOutButton />
        </div>
      </div>

      {!profile?.can_publish ? (
        <div className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-2xl font-black text-amber-950">Publishing not enabled yet</h2>
          <p className="mt-3 text-sm leading-6 text-amber-900">
            Your account exists, but an administrator still needs to approve
            your contributor access. Once approved, you can publish articles
            immediately.
          </p>
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/account/new"
            className="rounded-full bg-emerald-800 px-6 py-3 text-sm font-black text-white transition hover:bg-emerald-900"
          >
            Publish new article
          </Link>
        </div>
      )}

      <div className="mt-10 grid gap-4">
        <h2 className="text-2xl font-black text-emerald-950">Your articles</h2>
        {articles.length === 0 ? (
          <p className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 text-sm leading-6 text-stone-600">
            No articles yet.
          </p>
        ) : (
          articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col justify-between gap-4 rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
            >
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                  {getSeriesLabel(article.series)} · {article.status}
                </p>
                <h3 className="mt-2 text-xl font-black text-emerald-950">{article.title}</h3>
                <p className="mt-2 text-sm text-stone-600">By {article.author_name}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {profile?.can_publish ? (
                  <Link
                    href={`/account/edit/${article.id}`}
                    className="rounded-full bg-stone-100 px-5 py-3 text-sm font-black text-stone-800"
                  >
                    Edit
                  </Link>
                ) : null}
                {article.status === "published" ? (
                  <Link
                    href={`/publications/article/${article.slug}`}
                    className="rounded-full bg-emerald-800 px-5 py-3 text-sm font-black text-white"
                  >
                    View live
                  </Link>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

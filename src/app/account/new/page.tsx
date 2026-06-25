import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ArticleEditorForm } from "@/components/article-editor-form";
import { getCurrentProfile } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Publish article",
  description: "Publish a new contributor article.",
};

export default async function NewArticlePage() {
  const { user, profile } = await getCurrentProfile();

  if (!user) {
    redirect("/login");
  }

  if (!profile?.can_publish) {
    redirect("/account");
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href="/account" className="text-sm font-bold text-emerald-800 hover:text-emerald-950">
        Back to account
      </Link>
      <div className="mt-8">
        <ArticleEditorForm
          authorId={user.id}
          authorName={profile.display_name}
        />
      </div>
    </section>
  );
}

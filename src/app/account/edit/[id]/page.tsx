import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ArticleEditorForm } from "@/components/article-editor-form";
import { getAuthorArticleById, getCurrentProfile } from "@/lib/articles";

type EditArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: EditArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const { user } = await getCurrentProfile();

  if (!user) {
    return { title: "Edit article" };
  }

  const article = await getAuthorArticleById(user.id, id);

  return {
    title: article ? `Edit ${article.title}` : "Edit article",
  };
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const { user, profile } = await getCurrentProfile();

  if (!user) {
    redirect("/login");
  }

  if (!profile?.can_publish) {
    redirect("/account");
  }

  const article = await getAuthorArticleById(user.id, id);

  if (!article) {
    notFound();
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
          article={article}
        />
      </div>
    </section>
  );
}

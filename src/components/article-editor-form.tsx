"use client";

import Link from "next/link";
import { useState } from "react";

import { excerptFromMarkdown, slugify } from "@/lib/slugify";
import { createClient } from "@/lib/supabase/client";
import type { Article, ArticleSeries } from "@/types/articles";
import { articleSeriesOptions } from "@/types/articles";

type ArticleEditorFormProps = {
  authorId: string;
  authorName: string;
  article?: Article;
};

export function ArticleEditorForm({
  authorId,
  authorName,
  article,
}: ArticleEditorFormProps) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [body, setBody] = useState(article?.body ?? "");
  const [series, setSeries] = useState<ArticleSeries>(
    article?.series ?? "potentiality",
  );
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function uploadCoverImage(userId: string) {
    if (!coverFile) {
      return article?.cover_image_url ?? null;
    }

    const supabase = createClient();
    const extension = coverFile.name.split(".").pop() ?? "jpg";
    const filePath = `${userId}/${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("article-covers")
      .upload(filePath, coverFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("article-covers").getPublicUrl(filePath);

    return publicUrl;
  }

  async function saveArticle(status: "draft" | "published") {
    setMessage(null);
    setIsLoading(true);

    try {
      if (!title.trim() || !body.trim()) {
        setMessage("Title and body are required.");
        return;
      }

      const supabase = createClient();
      const coverImageUrl = await uploadCoverImage(authorId);

      if (!coverImageUrl) {
        setMessage("Please upload a cover image for this article.");
        return;
      }

      const payload = {
        title: title.trim(),
        body: body.trim(),
        excerpt: excerptFromMarkdown(body),
        series,
        cover_image_url: coverImageUrl,
        author_id: authorId,
        author_name: authorName,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
        slug: article?.slug ?? slugify(title),
      };

      if (article) {
        const { error } = await supabase
          .from("articles")
          .update(payload)
          .eq("id", article.id)
          .eq("author_id", authorId);

        if (error) {
          setMessage(error.message);
          return;
        }
      } else {
        const { error } = await supabase.from("articles").insert(payload);

        if (error) {
          setMessage(error.message);
          return;
        }
      }

      window.location.href = "/account";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-black tracking-tight text-emerald-950">
        {article ? "Edit article" : "Publish article"}
      </h1>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        Write in Markdown. Your name ({authorName}) will appear on the published
        article.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Header
          <input
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Article title"
            required
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Series
          <select
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
            value={series}
            onChange={(event) => setSeries(event.target.value as ArticleSeries)}
          >
            {articleSeriesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Cover image
          <input
            className="rounded-2xl border border-stone-200 px-4 py-3"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => setCoverFile(event.target.files?.[0] ?? null)}
            required={!article}
          />
        </label>
        {article?.cover_image_url ? (
          <p className="text-xs text-stone-500">
            Current cover image will stay unless you upload a new one.
          </p>
        ) : null}

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Body (Markdown)
          <textarea
            className="min-h-[320px] rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write your article here..."
            required
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => void saveArticle("draft")}
            className="rounded-full bg-stone-100 px-6 py-4 text-sm font-black text-stone-800 transition hover:bg-stone-200 disabled:opacity-60"
          >
            Save draft
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => void saveArticle("published")}
            className="rounded-full bg-emerald-800 px-6 py-4 text-sm font-black text-white transition hover:bg-emerald-900 disabled:opacity-60"
          >
            Publish now
          </button>
          <Link
            href="/account"
            className="rounded-full border border-stone-200 px-6 py-4 text-center text-sm font-black text-stone-700"
          >
            Cancel
          </Link>
        </div>
      </div>

      {message ? (
        <p className="mt-4 rounded-2xl bg-stone-100 p-4 text-sm leading-6 text-stone-700">
          {message}
        </p>
      ) : null}
    </form>
  );
}

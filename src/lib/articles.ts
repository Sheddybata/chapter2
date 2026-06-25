import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import type { Article, ArticleSeries, Profile } from "@/types/articles";

async function createPublicReadClient() {
  const serviceClient = createServiceClient();

  if (serviceClient) {
    return serviceClient;
  }

  return await createClient();
}

export async function getPublishedArticlesBySeries(series: ArticleSeries) {
  const supabase = await createPublicReadClient();

  if (!supabase) {
    return [] as Article[];
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("series", series)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getPublishedArticlesBySeries", error.message);
    return [] as Article[];
  }

  return (data ?? []) as Article[];
}

export async function getPublishedArticleBySlug(slug: string) {
  const supabase = await createPublicReadClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getPublishedArticleBySlug", error.message);
    return null;
  }

  return (data as Article | null) ?? null;
}

export async function getPublishedArticleSlugs() {
  const supabase = createServiceClient();

  if (!supabase) {
    return [] as string[];
  }

  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error("getPublishedArticleSlugs", error.message);
    return [] as string[];
  }

  return (data ?? []).map((row) => row.slug as string);
}

export async function getCurrentProfile() {
  const supabase = await createClient();

  if (!supabase) {
    return { user: null, profile: null };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("getCurrentProfile", error.message);
    return { user, profile: null };
  }

  return { user, profile: (profile as Profile | null) ?? null };
}

export async function getAuthorArticles(authorId: string) {
  const supabase = await createClient();

  if (!supabase) {
    return [] as Article[];
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("author_id", authorId)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("getAuthorArticles", error.message);
    return [] as Article[];
  }

  return (data ?? []) as Article[];
}

export async function getAuthorArticleById(authorId: string, articleId: string) {
  const supabase = await createClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .eq("author_id", authorId)
    .maybeSingle();

  if (error) {
    console.error("getAuthorArticleById", error.message);
    return null;
  }

  return (data as Article | null) ?? null;
}

export async function getPublishedArticleCountBySeries(series: ArticleSeries) {
  const articles = await getPublishedArticlesBySeries(series);
  return articles.length;
}

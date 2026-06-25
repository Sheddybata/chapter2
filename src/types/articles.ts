export type ArticleSeries = "origin" | "history" | "potentiality";

export type ArticleStatus = "draft" | "published";

export type Profile = {
  id: string;
  full_name: string;
  display_name: string;
  email: string | null;
  avatar_url: string | null;
  can_publish: boolean;
  created_at: string;
  updated_at: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  series: ArticleSeries;
  cover_image_url: string;
  author_id: string;
  author_name: string;
  status: ArticleStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export const articleSeriesOptions: {
  value: ArticleSeries;
  label: string;
  href: string;
}[] = [
  {
    value: "origin",
    label: "Origin of Chapter II",
    href: "/publications/origin-of-chapter-2",
  },
  {
    value: "history",
    label: "Chapter II in History",
    href: "/publications/chapter-2-in-history",
  },
  {
    value: "potentiality",
    label: "Potentiality of Chapter II",
    href: "/publications/potentiality-of-chapter-2",
  },
];

export function getSeriesLabel(series: ArticleSeries) {
  return (
    articleSeriesOptions.find((option) => option.value === series)?.label ??
    series
  );
}

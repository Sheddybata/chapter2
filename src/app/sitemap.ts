import type { MetadataRoute } from "next";

import { getPublishedArticleSlugs } from "@/lib/articles";
import { getAllSections } from "@/lib/sections";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url;
  const staticRoutes = [
    "",
    "/sections",
    "/acceptance-speech",
    "/students",
    "/real-life",
    "/gap",
    "/plan",
    "/publications",
    "/publications/potentiality-of-chapter-2",
    "/publications/origin-of-chapter-2",
    "/publications/chapter-2-in-history",
    "/leadership",
    "/events",
    "/action",
    "/resources",
    "/share-kit",
    "/login",
    "/signup",
  ];
  const sectionRoutes = getAllSections().map((section) => `/sections/${section.slug}`);
  const articleRoutes = (await getPublishedArticleSlugs()).map(
    (slug) => `/publications/article/${slug}`,
  );

  return [...staticRoutes, ...sectionRoutes, ...articleRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}

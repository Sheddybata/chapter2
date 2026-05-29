import type { MetadataRoute } from "next";

import { getAllSections } from "@/lib/sections";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
  const sectionRoutes = getAllSections().map((section) => `/sections/${section.slug}`);

  return [...staticRoutes, ...sectionRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}

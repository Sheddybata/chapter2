import type { MetadataRoute } from "next";

import { getAllSections } from "@/lib/sections";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  const staticRoutes = [
    "",
    "/sections",
    "/students",
    "/real-life",
    "/gap",
    "/plan",
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

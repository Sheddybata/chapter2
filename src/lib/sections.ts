import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const sectionsDirectory = path.join(process.cwd(), "content", "sections");

export type ChapterSection = {
  sortOrder: number;
  sectionNumber: string;
  title: string;
  shortTitle: string;
  slug: string;
  theme: string;
  plainEnglish: string;
  readerSummary: string;
  constitutionText: string;
  realityTitle: string;
  realityStat: string;
  realitySource: string;
  commitment: string;
  cta: string;
  keywords: string[];
  content: string;
};

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" ? value : fallback;
}

function asStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function readSectionFile(fileName: string): ChapterSection {
  const fullPath = path.join(sectionsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    sortOrder: asNumber(data.sortOrder),
    sectionNumber: asString(data.sectionNumber),
    title: asString(data.title),
    shortTitle: asString(data.shortTitle),
    slug: asString(data.slug, fileName.replace(/\.mdx$/, "")),
    theme: asString(data.theme),
    plainEnglish: asString(data.plainEnglish),
    readerSummary: asString(data.readerSummary),
    constitutionText: asString(data.constitutionText),
    realityTitle: asString(data.realityTitle),
    realityStat: asString(data.realityStat),
    realitySource: asString(data.realitySource),
    commitment: asString(data.commitment),
    cta: asString(data.cta),
    keywords: asStringArray(data.keywords),
    content,
  };
}

export function getAllSections() {
  return fs
    .readdirSync(sectionsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readSectionFile)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getSectionBySlug(slug: string) {
  return getAllSections().find((section) => section.slug === slug);
}

export function getAdjacentSections(slug: string) {
  const sections = getAllSections();
  const currentIndex = sections.findIndex((section) => section.slug === slug);

  return {
    previous: currentIndex > 0 ? sections[currentIndex - 1] : undefined,
    next:
      currentIndex >= 0 && currentIndex < sections.length - 1
        ? sections[currentIndex + 1]
        : undefined,
  };
}

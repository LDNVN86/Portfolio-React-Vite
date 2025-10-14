import { Buffer } from "buffer";
import matter from "gray-matter";

if (typeof globalThis !== "undefined" && !globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}

const markdownModules = import.meta.glob("./**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const toParagraphs = (body) =>
  body
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const calculateReadingStats = (text) => {
  const trimmed = text?.trim() ?? "";
  if (!trimmed) {
    return { words: 0, minutes: 1 };
  }
  const words = trimmed.split(/\s+/).filter(Boolean).length;
  return {
    words,
    minutes: Math.max(1, Math.round(words / 200)),
  };
};

const blogPosts = Object.entries(markdownModules).map(([path, rawContent]) => {
  const { data, content } = matter(rawContent);
  const cleanedContent = content.trim();
  const { words, minutes } = calculateReadingStats(cleanedContent);

  return {
    id: data.id ?? data.slug ?? path,
    locale: data.locale ?? "vi",
    slug: data.slug ?? (data.title ? data.title.toLowerCase().replace(/\s+/g, "-") : path),
    title: data.title ?? "Untitled post",
    excerpt: data.excerpt ?? "",
    publishedAt: data.publishedAt ?? new Date().toISOString(),
    wordCount: data.wordCount ?? words,
    readingTimeMinutes: data.readingTimeMinutes ?? minutes,
    tags: Array.isArray(data.tags) ? data.tags : [],
    content: toParagraphs(cleanedContent),
  };
});

export const getPostsByLocale = (language) => {
  const localizedPosts = blogPosts.filter((post) => post.locale === language);
  if (localizedPosts.length > 0) {
    return localizedPosts;
  }
  return blogPosts.filter((post) => post.locale === "en");
};

export default blogPosts.sort(
  (a, b) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
);

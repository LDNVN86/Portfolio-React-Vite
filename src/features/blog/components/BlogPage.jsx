import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiTag,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { getPostsByLocale } from "../../../content/blog/posts";
import { useTranslation } from "../../../shared/hooks/useTranslation";

const formatDate = (date, locale) => {
  try {
    return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  } catch (error) {
    return date;
  }
};

const PAGE_SIZE = 10;

const listVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.06,
      },
    },
  };

const listItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
};

const DOTS = Symbol("dots");

const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + siblingCount * 2;
    const leftRange = Array.from({ length: leftItemCount }, (_, index) => index + 1);
    return [...leftRange, DOTS, totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + siblingCount * 2;
    const rightRange = Array.from({ length: rightItemCount }, (_, index) => totalPages - rightItemCount + 1 + index);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, index) => leftSiblingIndex + index
  );
  return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
};

const BlogPage = () => {
  const { t, language } = useTranslation();
  const strings = t("blog");

  const posts = useMemo(() => {
    const localizedPosts = getPostsByLocale(language);
    return [...localizedPosts].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  }, [language]);

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (strings?.documentTitle) {
      document.title = strings.documentTitle;
    }
  }, [strings]);

  useEffect(() => {
    setSelectedPostId(null);
    setCurrentPage(1);
  }, [posts]);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [posts, currentPage]);

  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedPostId) ?? null,
    [posts, selectedPostId]
  );

  const selectedPostIndex = selectedPost
    ? posts.findIndex((post) => post.id === selectedPost.id)
    : -1;

  useEffect(() => {
    if (selectedPostId === null) return;
    const index = posts.findIndex((post) => post.id === selectedPostId);
    if (index >= 0) {
      const page = Math.floor(index / PAGE_SIZE) + 1;
      if (page !== currentPage) {
        setCurrentPage(page);
      }
    }
  }, [selectedPostId, posts, currentPage]);

  const nextPost =
    selectedPostIndex >= 0 && selectedPostIndex < posts.length - 1
      ? posts[selectedPostIndex + 1]
      : null;

  if (posts.length === 0) {
    return (
      <section className="theme-card theme-card--strong p-4 md:p-6">
        <header className="flex items-center gap-3">
          <div
            className="h-9 w-1.5 rounded-full"
            style={{ background: "var(--accent-gradient)" }}
          />
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              {strings?.title ?? "Blog"}
            </h2>
          </div>
        </header>
        <p className="mt-6 text-sm text-[var(--text-muted)] md:text-base">
          {strings?.empty ?? "No posts available yet."}
        </p>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="theme-card theme-card--strong p-4 md:p-6"
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-1.5 rounded-full"
            style={{ background: "var(--accent-gradient)" }}
          />
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              {strings?.title ?? "Blog"}
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)] md:text-base">
              {strings?.description ?? ""}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="blog-list"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full max-w-5xl"
            >
              <motion.ul
                variants={listVariants}
                initial="hidden"
              animate="show"
              className="custom-scrollbar space-y-4"
            >
                  {paginatedPosts.map(
                    ({
                      id,
                      title,
                      excerpt,
                      publishedAt,
                      readingTimeMinutes,
                      tags,
                      wordCount,
                    }) => {
                      const isActive = id === selectedPostId;
                      const locale = language === "vi" ? "vi-VN" : "en-US";
                      const dateLabel = formatDate(publishedAt, language)
                        .toLocaleUpperCase(locale)
                        .replace(",", "");
                      const readingLabelRaw = readingTimeMinutes
                        ? strings?.readingTime
                          ? strings.readingTime.replace("{minutes}", readingTimeMinutes)
                          : `${readingTimeMinutes} min`
                        : "";
                      const readingLabel = readingLabelRaw
                        ? readingLabelRaw.toLocaleUpperCase(locale)
                        : "";

                      return (
                        <motion.li key={id} variants={listItemVariants}>
                          <motion.button
                            type="button"
                            onClick={() => setSelectedPostId(id)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`group relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-ring)] md:flex-row md:items-stretch ${
                              isActive
                                ? "border-[var(--accent-soft)] bg-[var(--accent-soft)]/80 text-[var(--accent-contrast)] shadow-lg"
                                : "border-[var(--surface-border)] bg-[var(--surface-elevated)]/90 text-[var(--text-primary)] hover:border-[var(--accent-soft)]/70 hover:bg-[var(--accent-soft)]/30"
                            }`}
                          >
                            <div className="flex-1 space-y-4 px-4 py-5 md:px-6 md:py-6">
                              <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                                <span className="inline-flex items-center gap-2">
                                  <FiCalendar className="text-sm text-[var(--accent-contrast)]" />
                                  {dateLabel}
                                </span>
                                {tags?.[0] ? (
                                  <span className="inline-flex items-center gap-2">
                                    <FiTag className="text-sm text-[var(--accent-contrast)]" />
                                    {tags[0].toUpperCase()}
                                  </span>
                                ) : null}
                                {readingLabel ? (
                                  <span className="inline-flex items-center gap-2">
                                    <FiClock className="text-sm text-[var(--accent-contrast)]" />
                                    {readingLabel}
                                  </span>
                                ) : null}
                              </div>

                              <h3
                                className={`text-xl font-semibold leading-snug md:text-2xl ${
                                  isActive
                                    ? "text-[var(--accent-contrast)]"
                                    : "text-[var(--text-primary)]"
                                }`}
                              >
                                {title}
                              </h3>

                              <p className="text-sm leading-relaxed text-[var(--text-muted)] line-clamp-3 md:text-base">
                                {excerpt}
                              </p>

                              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] md:text-sm">
                                {typeof wordCount === "number" ? (
                                  <span>
                                    {strings?.wordCountLabel
                                      ? strings.wordCountLabel.replace("{count}", wordCount)
                                      : `${wordCount} words`}
                                  </span>
                                ) : null}
                                {typeof wordCount === "number" && readingLabel ? (
                                  <span className="opacity-40">|</span>
                                ) : null}
                                {readingLabel ? <span>{readingLabel}</span> : null}
                              </div>
                            </div>

                            <div className="flex w-full items-center justify-end px-4 pb-4 md:w-[3.25rem] md:flex-col md:justify-center md:pb-0 md:pl-0 md:pr-0">
                              <div
                                className="flex h-12 w-12 items-center justify-center rounded-xl text-[var(--accent-contrast)] shadow-sm transition group-hover:translate-x-1 group-hover:shadow-md md:h-full md:w-full md:rounded-none md:rounded-r-2xl"
                                style={{
                                  background: "var(--accent-gradient)",
                                }}
                              >
                                <FiArrowRight className="text-lg" />
                              </div>
                            </div>
                          </motion.button>
                        </motion.li>
                      );
                    }
                  )}
              </motion.ul>
              {totalPages > 1 ? (
                <nav
                  className="mt-8 flex justify-center"
                  aria-label={strings?.paginationLabel ?? "Pagination"}
                >
                  <div className="flex items-center gap-2 rounded-2xl bg-[var(--surface-elevated)]/60 px-2 py-2 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                      aria-label={strings?.paginationPrev ?? "Previous page"}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[var(--accent-soft)]"
                    >
                      <FiChevronLeft className="text-base" />
                    </button>
                    {paginationRange.map((item, index) => {
                      if (item === DOTS) {
                        return (
                          <span
                            key={`dots-${index}`}
                            className="px-2 text-sm font-medium text-[var(--text-muted)]"
                          >
                            …
                          </span>
                        );
                      }

                      const pageNumber = item;
                      const isActive = currentPage === pageNumber;
                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() => setCurrentPage(pageNumber)}
                          aria-current={isActive ? "page" : undefined}
                          className={`inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
                            isActive
                              ? "bg-[var(--accent-soft)] text-[var(--accent-contrast)] shadow"
                              : "text-[var(--text-primary)] hover:bg-[var(--accent-soft)]/60"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((page) => Math.min(totalPages, page + 1))
                      }
                      disabled={currentPage === totalPages}
                      aria-label={strings?.paginationNext ?? "Next page"}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[var(--accent-soft)]"
                    >
                      <FiChevronRight className="text-base" />
                    </button>
                  </div>
                </nav>
              ) : null}
            </motion.div>
          ) : (
            <motion.article
              key={selectedPost.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-elevated)] p-6 md:p-8 shadow-lg"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, var(--accent-soft) 45%, rgba(255,255,255,0.02) 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[var(--accent-soft)]/40" />

              <div className="relative flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedPostId(null)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[var(--surface-elevated)]/70 px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]/70 md:text-sm"
                  >
                    <FiArrowLeft className="text-base md:text-lg" />
                    {strings?.backToList ?? "Back to list"}
                  </motion.button>
                  {nextPost ? (
                    <motion.button
                      type="button"
                      onClick={() => setSelectedPostId(nextPost.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--accent-contrast)] transition"
                      style={{ background: "var(--accent-gradient)" }}
                    >
                      <FiArrowRight className="text-lg" />
                    </motion.button>
                  ) : null}
                </div>

                <header className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-contrast)] md:text-sm">
                      <FiBookOpen className="text-sm md:text-base" />
                      {strings?.articleLabel ?? "Featured note"}
                    </span>
                    <h3 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                      {selectedPost.title}
                    </h3>
                  </div>
                  {selectedPostIndex <= 0 ? (
                    <motion.span
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      className="inline-flex w-max items-center gap-1 rounded-full bg-[var(--accent-soft)]/60 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--text-muted)]"
                    >
                      {strings?.latestLabel ?? "Latest entry"}
                    </motion.span>
                  ) : null}
                  {selectedPost.excerpt ? (
                    <p className="text-sm text-[var(--text-muted)] md:text-base">
                      {selectedPost.excerpt}
                    </p>
                  ) : null}
                </header>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elevated)]/65 px-3 py-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-contrast)]">
                      <FiCalendar className="text-base md:text-lg" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[var(--text-primary)] md:text-base">
                        {formatDate(selectedPost.publishedAt, language)}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {strings?.publishedOn ?? "Published"}
                      </span>
                    </div>
                  </div>

                  {selectedPost.tags?.[0] ? (
                    <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elevated)]/65 px-3 py-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-contrast)]">
                        <FiTag className="text-base md:text-lg" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[var(--text-primary)] md:text-base">
                          {selectedPost.tags[0]}
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">
                          {strings?.tagsLabel ?? "Tags"}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {(selectedPost.wordCount !== undefined || selectedPost.readingTimeMinutes) && (
                    <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elevated)]/65 px-3 py-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-contrast)]">
                        <FiClock className="text-base md:text-lg" />
                      </span>
                      <div className="flex flex-col">
                        {selectedPost.wordCount !== undefined ? (
                          <span className="text-sm font-semibold text-[var(--text-primary)] md:text-base">
                            {strings?.wordCountLabel
                              ? strings.wordCountLabel.replace(
                                  "{count}",
                                  selectedPost.wordCount
                                )
                              : `${selectedPost.wordCount} words`}
                          </span>
                        ) : null}
                        {selectedPost.readingTimeMinutes ? (
                          <span className="text-xs text-[var(--text-muted)]">
                            {strings?.readingTime
                              ? strings.readingTime.replace(
                                  "{minutes}",
                                  selectedPost.readingTimeMinutes
                                )
                              : `${selectedPost.readingTimeMinutes} min`}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>

                <motion.div
                  key={`${selectedPost.id}-content`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  className="mt-2 space-y-4 text-sm leading-relaxed text-[var(--text-primary)] md:text-base"
                >
                  {selectedPost.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </motion.div>

                {selectedPost.tags?.length ? (
                  <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] md:text-sm">
                    <span className="font-semibold uppercase tracking-wide">
                      {strings?.tagsLabel ?? "Tags"}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--text-primary)] md:text-sm"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  {selectedPostIndex > 0 ? (
                    <motion.button
                      type="button"
                      onClick={() => setSelectedPostId(posts[selectedPostIndex - 1].id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[var(--surface-elevated)]/70 px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]/70 md:text-sm"
                    >
                      <FiArrowLeft className="text-base md:text-lg" />
                      {strings?.readPrevious ?? "Previous post"}
                    </motion.button>
                  ) : (
                    <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)] md:text-sm">
                      {strings?.latestLabel ?? "Latest entry"}
                    </span>
                  )}

                  {nextPost ? (
                    <motion.button
                      type="button"
                      onClick={() => setSelectedPostId(nextPost.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-xs font-semibold text-[var(--accent-contrast)] transition md:text-sm"
                      style={{ background: "var(--accent-gradient)" }}
                    >
                      {strings?.readNext ?? "Read next"}
                      <FiArrowRight className="text-base md:text-lg" />
                    </motion.button>
                  ) : null}
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default BlogPage;

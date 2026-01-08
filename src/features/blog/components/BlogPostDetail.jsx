import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiTag,
} from "react-icons/fi";

const formatDate = (date, locale) => {
  try {
    return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
};

const BlogPostDetail = ({
  post,
  postIndex,
  totalPosts,
  onBack,
  onNext,
  onPrevious,
  language,
  strings,
}) => {
  const hasNext = postIndex < totalPosts - 1;
  const hasPrevious = postIndex > 0;
  const isLatest = postIndex === 0;

  return (
    <motion.article
      key={post.id}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -32 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-elevated)] p-6 shadow-lg md:p-8"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, var(--accent-soft) 45%, rgba(255,255,255,0.02) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[var(--accent-soft)]/40" />

      <div className="relative flex flex-col gap-6">
        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <motion.button
            type="button"
            onClick={onBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[var(--surface-elevated)]/70 px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]/70 md:text-sm"
          >
            <FiArrowLeft className="text-base md:text-lg" />
            {strings?.backToList ?? "Back to list"}
          </motion.button>
          {hasNext && (
            <motion.button
              type="button"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--accent-contrast)] transition"
              style={{ background: "var(--accent-gradient)" }}
            >
              <FiArrowRight className="text-lg" />
            </motion.button>
          )}
        </div>

        {/* Header */}
        <header className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-contrast)] md:text-sm">
              <FiBookOpen className="text-sm md:text-base" />
              {strings?.articleLabel ?? "Featured note"}
            </span>
            <h3 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              {post.title}
            </h3>
          </div>
          {isLatest && (
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="inline-flex w-max items-center gap-1 rounded-full bg-[var(--accent-soft)]/60 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--text-muted)]"
            >
              {strings?.latestLabel ?? "Latest entry"}
            </motion.span>
          )}
          {post.excerpt && (
            <p className="text-sm text-[var(--text-muted)] md:text-base">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Meta cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elevated)]/65 px-3 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-contrast)]">
              <FiCalendar className="text-base md:text-lg" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[var(--text-primary)] md:text-base">
                {formatDate(post.publishedAt, language)}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {strings?.publishedOn ?? "Published"}
              </span>
            </div>
          </div>

          {post.tags?.[0] && (
            <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elevated)]/65 px-3 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-contrast)]">
                <FiTag className="text-base md:text-lg" />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[var(--text-primary)] md:text-base">
                  {post.tags[0]}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  {strings?.tagsLabel ?? "Tags"}
                </span>
              </div>
            </div>
          )}

          {(post.wordCount !== undefined || post.readingTimeMinutes) && (
            <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elevated)]/65 px-3 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-contrast)]">
                <FiClock className="text-base md:text-lg" />
              </span>
              <div className="flex flex-col">
                {post.wordCount !== undefined && (
                  <span className="text-sm font-semibold text-[var(--text-primary)] md:text-base">
                    {strings?.wordCountLabel
                      ? strings.wordCountLabel.replace(
                          "{count}",
                          post.wordCount
                        )
                      : `${post.wordCount} words`}
                  </span>
                )}
                {post.readingTimeMinutes && (
                  <span className="text-xs text-[var(--text-muted)]">
                    {strings?.readingTime
                      ? strings.readingTime.replace(
                          "{minutes}",
                          post.readingTimeMinutes
                        )
                      : `${post.readingTimeMinutes} min`}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <motion.div
          key={`${post.id}-content`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mt-2 space-y-4 text-sm leading-relaxed text-[var(--text-primary)] md:text-base"
        >
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] md:text-sm">
            <span className="font-semibold uppercase tracking-wide">
              {strings?.tagsLabel ?? "Tags"}:
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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
        )}

        {/* Navigation footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          {hasPrevious ? (
            <motion.button
              type="button"
              onClick={onPrevious}
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

          {hasNext && (
            <motion.button
              type="button"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-xs font-semibold text-[var(--accent-contrast)] transition md:text-sm"
              style={{ background: "var(--accent-gradient)" }}
            >
              {strings?.readNext ?? "Read next"}
              <FiArrowRight className="text-base md:text-lg" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPostDetail;

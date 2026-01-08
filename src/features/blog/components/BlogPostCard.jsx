import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiClock, FiTag } from "react-icons/fi";

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

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
};

const BlogPostCard = ({ post, isActive, onClick, language, strings }) => {
  const {
    id,
    title,
    excerpt,
    publishedAt,
    readingTimeMinutes,
    tags,
    wordCount,
  } = post;

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
    <motion.li variants={cardVariants}>
      <motion.button
        type="button"
        onClick={() => onClick(id)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`group relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-ring)] md:flex-row md:items-stretch ${
          isActive
            ? "border-[var(--accent-soft)] bg-[var(--accent-soft)]/80 text-[var(--accent-contrast)] shadow-lg"
            : "border-[var(--surface-border)] bg-[var(--surface-elevated)]/90 text-[var(--text-primary)] hover:border-[var(--accent-soft)]/70 hover:bg-[var(--accent-soft)]/30"
        }`}
      >
        <div className="flex-1 space-y-4 px-4 py-5 md:px-6 md:py-6">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-2">
              <FiCalendar className="text-sm text-[var(--accent-contrast)]" />
              {dateLabel}
            </span>
            {tags?.[0] && (
              <span className="inline-flex items-center gap-2">
                <FiTag className="text-sm text-[var(--accent-contrast)]" />
                {tags[0].toUpperCase()}
              </span>
            )}
            {readingLabel && (
              <span className="inline-flex items-center gap-2">
                <FiClock className="text-sm text-[var(--accent-contrast)]" />
                {readingLabel}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={`text-xl font-semibold leading-snug md:text-2xl ${
              isActive
                ? "text-[var(--accent-contrast)]"
                : "text-[var(--text-primary)]"
            }`}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm leading-relaxed text-[var(--text-muted)] line-clamp-3 md:text-base">
            {excerpt}
          </p>

          {/* Word count */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] md:text-sm">
            {typeof wordCount === "number" && (
              <span>
                {strings?.wordCountLabel
                  ? strings.wordCountLabel.replace("{count}", wordCount)
                  : `${wordCount} words`}
              </span>
            )}
            {typeof wordCount === "number" && readingLabel && (
              <span className="opacity-40">|</span>
            )}
            {readingLabel && <span>{readingLabel}</span>}
          </div>
        </div>

        {/* Arrow button */}
        <div className="flex w-full items-center justify-end px-4 pb-4 md:w-[3.25rem] md:flex-col md:justify-center md:pb-0 md:pl-0 md:pr-0">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-[var(--accent-contrast)] shadow-sm transition group-hover:translate-x-1 group-hover:shadow-md md:h-full md:w-full md:rounded-none md:rounded-r-2xl"
            style={{ background: "var(--accent-gradient)" }}
          >
            <FiArrowRight className="text-lg" />
          </div>
        </div>
      </motion.button>
    </motion.li>
  );
};

export default BlogPostCard;

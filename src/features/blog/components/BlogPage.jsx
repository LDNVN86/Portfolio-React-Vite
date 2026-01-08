import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getPostsByLocale } from "../../../content/blog/posts";
import { useTranslation } from "../../../shared/hooks/useTranslation";
import BlogPostCard from "./BlogPostCard";
import BlogPostDetail from "./BlogPostDetail";
import BlogPagination from "./BlogPagination";

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

  const handleBack = () => setSelectedPostId(null);
  const handleNext = () => {
    if (selectedPostIndex < posts.length - 1) {
      setSelectedPostId(posts[selectedPostIndex + 1].id);
    }
  };
  const handlePrevious = () => {
    if (selectedPostIndex > 0) {
      setSelectedPostId(posts[selectedPostIndex - 1].id);
    }
  };

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
                {paginatedPosts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    isActive={post.id === selectedPostId}
                    onClick={setSelectedPostId}
                    language={language}
                    strings={strings}
                  />
                ))}
              </motion.ul>

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                strings={strings}
              />
            </motion.div>
          ) : (
            <BlogPostDetail
              post={selectedPost}
              postIndex={selectedPostIndex}
              totalPosts={posts.length}
              onBack={handleBack}
              onNext={handleNext}
              onPrevious={handlePrevious}
              language={language}
              strings={strings}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default BlogPage;

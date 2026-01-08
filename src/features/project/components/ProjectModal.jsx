import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiStar,
} from "react-icons/fi";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
};

const ProjectModal = ({ project, isOpen, onClose, strings }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!project) return null;

  const hasLiveUrl = Boolean(project.liveUrl);
  const hasGithub = Boolean(project.githubUrl);
  const hasFrontendRepo = Boolean(project.githubFrontend);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop - increased opacity for better visibility */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-strong)] text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)] hover:scale-110"
            >
              <FiX className="text-xl" />
            </button>

            {/* Thumbnail */}
            <div className="aspect-video w-full overflow-hidden bg-[var(--accent-soft)]/20">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-6xl text-[var(--accent-color)]">
                    📁
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-6 p-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                    {project.title}
                  </h2>
                  {project.stars > 0 && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--surface-strong)] px-3 py-1 text-sm font-medium text-[var(--text-primary)]">
                      <FiStar className="text-yellow-500" />
                      {project.stars}
                    </span>
                  )}
                </div>
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-color)] px-3 py-1 text-xs font-semibold text-[var(--accent-contrast)]">
                    <FiStar className="text-xs" />
                    {strings?.featured ?? "Featured"}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed text-[var(--text-muted)]">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  {strings?.techStack ?? "Tech Stack"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-sm font-medium text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-2">
                {hasLiveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--accent-contrast)] transition hover:opacity-90 hover:scale-105"
                    style={{ background: "var(--accent-gradient)" }}
                  >
                    <FiExternalLink className="text-base" />
                    {strings?.liveDemo ?? "Live Demo"}
                  </a>
                )}
                {hasGithub && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--surface-border)] bg-[var(--surface-strong)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)] hover:scale-105"
                  >
                    <FiGithub className="text-base" />
                    {strings?.viewCode ?? "Backend"}
                  </a>
                )}
                {hasFrontendRepo && (
                  <a
                    href={project.githubFrontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--surface-border)] bg-[var(--surface-strong)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)] hover:scale-105"
                  >
                    <FiLayers className="text-base" />
                    {strings?.frontend ?? "Frontend"}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use Portal to render modal at document.body level for true fullscreen overlay
  return createPortal(modalContent, document.body);
};

export default ProjectModal;

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiStar,
  FiCode,
  FiLayers,
} from "react-icons/fi";
import { useTranslation } from "../../shared/hooks/useTranslation";
import { getLocalizedProjects } from "../../content/projects/projects";
import ProjectModal from "./components/ProjectModal";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const TechBadge = ({ tech }) => (
  <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--text-primary)]">
    {tech}
  </span>
);

const STATUS_STYLES = {
  production: {
    classes:
      "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30",
    dot: "bg-emerald-500 animate-pulse",
  },
  wip: {
    classes: "bg-amber-500/15 text-amber-500 border border-amber-500/30",
    dot: "bg-amber-500 animate-pulse",
  },
  archived: {
    classes: "bg-zinc-500/15 text-zinc-400 border border-zinc-500/30",
    dot: "bg-zinc-400",
  },
};

const StatusBadge = ({ status, label }) => {
  const style = STATUS_STYLES[status];
  if (!style || !label) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {label}
    </span>
  );
};

const ProjectCard = ({ project, strings, onClick }) => {
  const hasLiveUrl = Boolean(project.liveUrl);
  const hasGithub = Boolean(project.githubUrl);
  const hasFrontendRepo = Boolean(project.githubFrontend);

  return (
    <motion.article
      variants={cardVariants}
      onClick={onClick}
      className="cursor-pointer group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-lg transition-all hover:border-[var(--accent-soft)] hover:shadow-xl"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[var(--accent-soft)]/20">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="h-full w-full items-center justify-center absolute inset-0"
          style={{ display: project.thumbnail ? "none" : "flex" }}
        >
          <FiCode className="text-4xl text-[var(--accent-color)]" />
        </div>

        {/* Featured + Status badges */}
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-color)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-contrast)]">
              <FiStar className="text-xs" />
              {strings?.featured ?? "Featured"}
            </span>
          )}
          {project.status && (
            <StatusBadge
              status={project.status}
              label={strings?.status?.[project.status]}
            />
          )}
        </div>
        {/* Stars */}
        {project.stars > 0 && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--surface-strong)] px-2 py-1 text-xs font-medium text-[var(--text-primary)]">
            <FiStar className="text-xs text-yellow-500" />
            {project.stars}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
        <header>
          <h3 className="text-lg font-bold text-[var(--text-primary)] md:text-xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] line-clamp-3">
            {project.description}
          </p>
        </header>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
          {project.techStack.length > 5 && (
            <span className="inline-flex items-center text-xs text-[var(--text-muted)]">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {hasLiveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] transition hover:opacity-90"
              style={{ background: "var(--accent-gradient)" }}
            >
              <FiExternalLink className="text-sm" />
              {strings?.liveDemo ?? "Live Demo"}
            </a>
          )}
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]"
            >
              <FiGithub className="text-sm" />
              {strings?.viewCode ?? "Backend"}
            </a>
          )}
          {hasFrontendRepo && (
            <a
              href={project.githubFrontend}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]"
            >
              <FiLayers className="text-sm" />
              {strings?.frontend ?? "Frontend"}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const ProjectPage = () => {
  const { t, language } = useTranslation();
  const strings = t("project");
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = useMemo(() => getLocalizedProjects(language), [language]);

  useEffect(() => {
    if (strings?.documentTitle) {
      document.title = strings.documentTitle;
    }
  }, [strings]);

  return (
    <section className="theme-card theme-card--strong p-4 md:p-6">
      <header className="flex items-center gap-3">
        <div
          className="h-9 w-1.5 rounded-full"
          style={{ background: "var(--accent-gradient)" }}
        />
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            {strings?.title ?? "Projects"}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)] md:text-base">
            {strings?.description ?? ""}
          </p>
        </div>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            strings={strings}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </motion.div>

      {/* GitHub profile link */}
      <div className="mt-8 flex justify-center">
        <a
          href="https://github.com/LDNVN86"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]"
        >
          <FiGithub className="text-lg" />
          {strings?.viewAllOnGithub ?? "View all on GitHub"}
        </a>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        strings={strings}
      />
    </section>
  );
};

export default ProjectPage;

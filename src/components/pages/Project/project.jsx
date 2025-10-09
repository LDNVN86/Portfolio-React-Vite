import { useEffect } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

const ProjectPage = () => {
  const { t } = useTranslation();
  const strings = t("project");

  useEffect(() => {
    if (strings?.documentTitle) {
      document.title = strings.documentTitle;
    }
  }, [strings]);

  return (
    <section className="theme-card theme-card--strong p-4 md:p-6">
      <header className="flex items-center gap-3">
        <div className="h-9 w-1.5 rounded-full" style={{ background: "var(--accent-gradient)" }} />
        <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          {strings?.title ?? "Projects"}
        </h2>
      </header>
      <p className="mt-6 text-base text-[var(--text-muted)]">
        {strings?.description ?? ""}
      </p>
    </section>
  );
};

export default ProjectPage;

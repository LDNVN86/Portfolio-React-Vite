import { useEffect, useMemo } from "react";
import { skillGroupsConfig, skillsDictionary } from "./components/SkillDetails";
import { useTranslation } from "../../shared/hooks/useTranslation";

const SkillsPage = () => {
  const { t } = useTranslation();
  const strings = t("skills");

  useEffect(() => {
    if (strings?.documentTitle) {
      document.title = strings.documentTitle;
    }
  }, [strings]);

  const groups = useMemo(
    () =>
      skillGroupsConfig.map((group) => ({
        title: strings?.groupTitles?.[group.key] ?? group.key,
        icons: group.skillKeys
          .map((key) => skillsDictionary[key])
          .filter(Boolean)
          .map((skill) => ({
            name: skill.name,
            image: skill.image,
            link: skill.link,
          })),
      })),
    [strings?.groupTitles]
  );

  return (
    <section className="theme-card theme-card--strong p-4 md:p-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-1.5 rounded-full" style={{ background: "var(--accent-gradient)" }} />
          <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            {strings?.title ?? "Skills"}
          </h2>
        </div>
        {strings?.intro && (
          <p className="max-w-2xl text-sm text-[var(--text-muted)]">{strings.intro}</p>
        )}
      </header>
      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">
              {group.title}
            </h3>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {group.icons.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-20 w-full items-center justify-center rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    loading="lazy"
                    className="h-full max-h-14 w-auto object-contain transition group-hover:scale-105"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsPage;

import { useEffect, useMemo } from "react";
import { skillGroupsConfig, skillsDictionary } from "./components/SkillDetails";
import SkillCard from "./components/SkillList";
import { useTranslation } from "../../shared/hooks/useTranslation";

const SkillsPage = () => {
  const { t, language } = useTranslation();
  const strings = t("skills");
  const groupTitles = strings?.groupTitles ?? {};

  useEffect(() => {
    if (strings?.documentTitle) {
      document.title = strings.documentTitle;
    }
  }, [strings]);

  const groups = useMemo(() => {
    return skillGroupsConfig.map((group) => {
      const title = groupTitles[group.key] ?? group.key;
      const items = group.skillKeys
        .map((key) => {
          const detail = skillsDictionary[key];
          if (!detail) return null;
          const description =
            detail.description?.[language] ?? detail.description?.vi ?? "";
          return {
            ...detail,
            description,
          };
        })
        .filter(Boolean);
      return { title, skills: items };
    });
  }, [groupTitles, language]);

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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {group.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsPage;

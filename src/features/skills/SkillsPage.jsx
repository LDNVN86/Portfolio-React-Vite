import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { skillGroupsConfig, skillsDictionary } from "./components/SkillDetails";
import SkillProgressBar from "./components/SkillProgressBar";
import { useTranslation } from "../../shared/hooks/useTranslation";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

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
        key: group.key,
        title: strings?.groupTitles?.[group.key] ?? group.key,
        skills: group.skillKeys
          .map((key) => skillsDictionary[key])
          .filter(Boolean)
          .map((skill) => ({
            name: skill.name,
            image: skill.image,
            link: skill.link,
            proficiency: skill.proficiency,
          })),
      })),
    [strings?.groupTitles]
  );

  return (
    <section className="theme-card theme-card--strong p-4 md:p-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-1.5 rounded-full"
            style={{ background: "var(--accent-gradient)" }}
          />
          <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            {strings?.title ?? "Skills"}
          </h2>
        </div>
        {strings?.intro && (
          <p className="max-w-2xl text-sm text-[var(--text-muted)]">
            {strings.intro}
          </p>
        )}
      </header>
      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">
              {group.title}
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {group.skills.map((skill) => (
                <SkillProgressBar
                  key={skill.name}
                  skill={skill}
                  showProgress={skill.proficiency !== undefined}
                />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsPage;

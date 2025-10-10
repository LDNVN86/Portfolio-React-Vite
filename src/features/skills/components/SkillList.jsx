import { useTranslation } from "../../../shared/hooks/useTranslation";

const SkillCard = ({ skill }) => {
  const { t, language } = useTranslation();
  const learnMoreLabel = t("skills.learnMore");
  const badgeLabel = skill.badge?.[language] ?? skill.badge?.vi ?? skill.badge?.en ?? null;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-3">
        {badgeLabel ? (
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-color)]">
            {badgeLabel}
          </span>
        ) : (
          <span className="h-5" aria-hidden="true" />
        )}
        <a href={skill.link} target="_blank" rel="noopener noreferrer">
          <img className="h-10 w-10 object-contain" src={skill.image} alt={skill.name} loading="lazy" />
        </a>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <a href={skill.link} target="_blank" rel="noopener noreferrer">
          <h5 className="text-lg font-bold text-[var(--text-primary)]">{skill.name}</h5>
        </a>
        <p className="flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{skill.description}</p>
        <a
          href={skill.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-color)] transition hover:text-[var(--accent-contrast)]"
        >
          {learnMoreLabel}
          <svg className="h-3.5 w-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SkillCard;

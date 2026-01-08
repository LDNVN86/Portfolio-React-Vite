import { motion } from "framer-motion";

const SkillProgressBar = ({ skill, showProgress = true }) => {
  const hasProficiency = typeof skill.proficiency === "number";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col gap-2"
    >
      <a
        href={skill.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <img
          src={skill.image}
          alt={skill.name}
          loading="lazy"
          className="h-10 w-10 object-contain transition group-hover:scale-110"
          decoding="async"
        />
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <span className="text-sm font-semibold text-[var(--text-primary)] truncate">
            {skill.name}
          </span>
          {showProgress && hasProficiency && (
            <div className="flex items-center gap-2">
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-strong)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2,
                  }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: "var(--accent-gradient)" }}
                />
              </div>
              <span className="text-xs font-medium text-[var(--text-muted)] min-w-[2.5rem] text-right">
                {skill.proficiency}%
              </span>
            </div>
          )}
        </div>
      </a>
    </motion.div>
  );
};

export default SkillProgressBar;

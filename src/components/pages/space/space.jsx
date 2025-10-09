import { useEffect } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

const WORKSPACE_IMAGE =
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Maomao.jpg";

const SpacePage = () => {
  const { t } = useTranslation();
  const strings = t("space");
  const sections = Array.isArray(strings?.sections) ? strings.sections : [];

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
          {strings?.title ?? "Workspace"}
        </h2>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {sections.map((section, index) => (
          <div
            key={`${section.title}-${index}`}
            className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {section.title}
              {section.subtitle && (
                <span className="ml-1 text-sm font-medium text-[var(--text-muted)]">
                  {section.subtitle}
                </span>
              )}
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
              {Array.isArray(section.items) &&
                section.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border-4 border-[var(--accent-soft)]">
        <img
          src={WORKSPACE_IMAGE}
          alt={strings?.imageAlt || "Workspace"}
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default SpacePage;

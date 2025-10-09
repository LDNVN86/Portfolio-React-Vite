import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../../hooks/useTranslation";

const Error404 = () => {
  const { t } = useTranslation();
  const strings = t("error");

  useEffect(() => {
    if (strings?.documentTitle) {
      document.title = strings.documentTitle;
    }
  }, [strings]);

  return (
    <section className="theme-card theme-card--strong flex min-h-[22rem] flex-col items-center justify-center gap-6 p-6 text-center md:p-8">
      <h1 className="text-4xl font-black tracking-wide text-[var(--text-primary)]">404</h1>
      <div className="space-y-3">
        <p className="text-lg font-semibold text-[var(--text-primary)]">
          {strings?.heading ?? "Page not found"}
        </p>
        <p className="text-sm text-[var(--text-muted)]">
          {strings?.description ?? "The link might be broken or the page may have moved."}
        </p>
      </div>
      <Link
        to="/about"
        className="theme-button px-6 py-2 text-sm"
      >
        {strings?.back ?? "Back to homepage"}
      </Link>
    </section>
  );
};

export default Error404;

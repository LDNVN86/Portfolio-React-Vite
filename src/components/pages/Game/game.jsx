import { useEffect } from "react";
import GameGallery from "./gameArray";
import { useTranslation } from "../../../hooks/useTranslation";

const GamePage = () => {
  const { t } = useTranslation();
  const pageStrings = t("game");

  useEffect(() => {
    if (pageStrings?.documentTitle) {
      document.title = pageStrings.documentTitle;
    }
  }, [pageStrings]);

  return (
    <section className="theme-card theme-card--strong p-4 md:p-6">
      <header className="flex items-center gap-3">
        <div className="h-9 w-1.5 rounded-full" style={{ background: "var(--accent-gradient)" }} />
        <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          {pageStrings?.title ?? "Game"}
        </h2>
      </header>
      <p className="mt-4 text-base text-[var(--text-muted)]">
        {pageStrings?.description ?? ""}
      </p>
      <div className="mt-8">
        <GameGallery imageAltPrefix={pageStrings?.imageAltPrefix} />
      </div>
    </section>
  );
};

export default GamePage;

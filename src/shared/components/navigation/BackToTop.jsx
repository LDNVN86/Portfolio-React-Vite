import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { useTranslation } from "../../hooks/useTranslation";

const BackToTop = () => {
  const { t } = useTranslation();
  const [scrollPercent, setScrollPercent] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percent =
          scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
        setScrollPercent(percent);
        frameRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (scrollPercent < 4) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleGoTop}
      aria-label={t("common.scrollTopAria")}
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full font-semibold shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      style={{
        background: "var(--accent-gradient)",
        color: "var(--accent-contrast)",
      }}
    >
      <span className="pointer-events-none text-xs transition-opacity duration-200 group-hover:opacity-0">
        {scrollPercent}%
      </span>
      <IoIosArrowUp className="pointer-events-none absolute text-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </button>
  );
};

export default BackToTop;

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "../../../hooks/useTranslation";

const getInitialMobileState = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 765;
};

const getInitialMotionPreference = () => {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const Introduction = ({ onOverlayEnd }) => {
  const { t } = useTranslation();
  const quotes = useMemo(() => {
    const values = t("introduction.quotes");
    return Array.isArray(values) ? values : [];
  }, [t]);
  const [currentQuote, setCurrentQuote] = useState(() => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index] ?? "";
  });
  const [isMobile, setIsMobile] = useState(getInitialMobileState);
  const [allowMotion, setAllowMotion] = useState(getInitialMotionPreference);
  const videoRef = useRef(null);

  const handleDismiss = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onOverlayEnd?.();
  }, [onOverlayEnd]);

  useEffect(() => {
    if (!quotes.length) return undefined;
    const timer = window.setInterval(() => {
      setCurrentQuote((prev) => {
        if (quotes.length === 1) return quotes[0];
        let next = prev;
        while (next === prev) {
          next = quotes[Math.floor(Math.random() * quotes.length)];
        }
        return next;
      });
    }, 5000);

    return () => window.clearInterval(timer);
  }, [quotes]);

  useEffect(() => {
    if (!quotes.length) {
      setCurrentQuote("");
      return;
    }
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [quotes]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handleResize = () => setIsMobile(window.innerWidth <= 765);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event) => setAllowMotion(!event.matches);

    updatePreference(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(updatePreference);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updatePreference);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(updatePreference);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [isMobile]);

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        event.preventDefault();
        handleDismiss();
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleDismiss]);

  const videoSource = useMemo(
    () =>
      isMobile
        ? "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Intro2.webm"
        : "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/video222.webm",
    [isMobile]
  );

  const overlayLabel = t("introduction.ariaLabel");
  const displayName = t("introduction.name");
  const ctaLabel = t("introduction.cta");
  const hintText = t("introduction.hint");

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={typeof overlayLabel === "string" ? overlayLabel : undefined}
      >
        {allowMotion ? (
          <video
            ref={videoRef}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src={videoSource} type="video/webm" />
          </video>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800"
          />
        )}
        <div
          onClick={handleDismiss}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4 bg-[var(--floating-surface)]/80 p-6 text-center text-white backdrop-blur"
        >
          <img
            className="w-28 rounded-full shadow-md ring-4 ring-white/40 md:w-40"
            src="https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Ava.jpg"
            alt={displayName}
            loading="lazy"
          />
          <motion.h1
            style={{ fontFamily: "Chinacat" }}
            className="text-3xl font-black text-rose-300 drop-shadow md:text-5xl"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {displayName}
          </motion.h1>
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="max-w-md rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow md:text-lg"
            style={{ fontFamily: "Poetsen One", fontWeight: 800 }}
          >
            {currentQuote}
          </motion.p>
          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleDismiss();
            }}
            className="theme-button px-6 py-2 text-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            {ctaLabel}
          </motion.button>
          <p className="text-xs text-white/80">{hintText}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Introduction;

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "../../../shared/hooks/useTranslation";

const AVATAR_IMAGE =
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp";
const AVATAR_IMAGE_SRCSET = [
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp 240w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp 320w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp 480w",
].join(", ");
const AVATAR_IMAGE_SIZES = "(min-width: 768px) 7rem, 28vw";

const getInitialDeviceProfile = () => {
  if (typeof window === "undefined") {
    return { isMobile: false, allowMotion: true };
  }
  const isMobile =
    window.innerWidth <= 765 || window.matchMedia("(pointer: coarse)").matches;
  const allowMotion = !window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;
  return { isMobile, allowMotion };
};

const IntroOverlay = ({ onOverlayEnd }) => {
  const { t } = useTranslation();
  const quotes = useMemo(() => {
    const values = t("introduction.quotes");
    return Array.isArray(values) ? values : [];
  }, [t]);
  const [currentQuote, setCurrentQuote] = useState(() => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index] ?? "";
  });
  const [{ isMobile, allowMotion }, setDeviceProfile] = useState(
    getInitialDeviceProfile
  );
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
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const handleUpdate = () => setDeviceProfile(getInitialDeviceProfile());

    const resizeListener = () => handleUpdate();
    window.addEventListener("resize", resizeListener, { passive: true });

    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pointerListener = () => handleUpdate();
    const motionListener = () => handleUpdate();

    if (typeof pointerQuery.addEventListener === "function") {
      pointerQuery.addEventListener("change", pointerListener);
    } else if (typeof pointerQuery.addListener === "function") {
      pointerQuery.addListener(pointerListener);
    }

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", motionListener);
    } else if (typeof motionQuery.addListener === "function") {
      motionQuery.addListener(motionListener);
    }

    return () => {
      window.removeEventListener("resize", resizeListener);

      if (typeof pointerQuery.removeEventListener === "function") {
        pointerQuery.removeEventListener("change", pointerListener);
      } else if (typeof pointerQuery.removeListener === "function") {
        pointerQuery.removeListener(pointerListener);
      }

      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", motionListener);
      } else if (typeof motionQuery.removeListener === "function") {
        motionQuery.removeListener(motionListener);
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
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "Escape"
      ) {
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
        {allowMotion && !isMobile ? (
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
            className="h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-white/40 md:h-28 md:w-28"
            src={AVATAR_IMAGE}
            srcSet={AVATAR_IMAGE_SRCSET}
            sizes={AVATAR_IMAGE_SIZES}
            alt={displayName}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="112"
            height="112"
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

export default IntroOverlay;

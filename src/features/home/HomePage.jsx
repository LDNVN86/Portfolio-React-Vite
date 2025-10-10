import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import IntroOverlay from "./components/IntroOverlay";

const AudioPrompt = lazy(() => import("../../shared/components/audio/AudioPrompt"));
const BackToTop = lazy(() => import("../../shared/components/navigation/BackToTop"));
const SitePreferencesPanel = lazy(() => import("../../shared/components/preferences/SitePreferences"));
const NavbarMenu = lazy(() => import("./components/NavbarMenu"));

const HomePage = ({ children }) => {
  const [introVisible, setIntroVisible] = useState(true);
  const [{ allowMotion, isCoarsePointer }, setMotionProfile] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return { allowMotion: true, isCoarsePointer: false };
    }
    return {
      allowMotion: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      isCoarsePointer: window.matchMedia("(pointer: coarse)").matches,
    };
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    const handleProfileChange = () =>
      setMotionProfile({
        allowMotion: !motionQuery.matches,
        isCoarsePointer: pointerQuery.matches,
      });

    handleProfileChange();

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", handleProfileChange);
    } else if (typeof motionQuery.addListener === "function") {
      motionQuery.addListener(handleProfileChange);
    }

    if (typeof pointerQuery.addEventListener === "function") {
      pointerQuery.addEventListener("change", handleProfileChange);
    } else if (typeof pointerQuery.addListener === "function") {
      pointerQuery.addListener(handleProfileChange);
    }

    return () => {
      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", handleProfileChange);
      } else if (typeof motionQuery.removeListener === "function") {
        motionQuery.removeListener(handleProfileChange);
      }

      if (typeof pointerQuery.removeEventListener === "function") {
        pointerQuery.removeEventListener("change", handleProfileChange);
      } else if (typeof pointerQuery.removeListener === "function") {
        pointerQuery.removeListener(handleProfileChange);
      }
    };
  }, []);

  const handleIntroEnd = useCallback(() => {
    setIntroVisible(false);
  }, []);

  const backgroundVideo = useMemo(
    () =>
      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Intro4.webm",
    []
  );
  const backgroundPoster = useMemo(
    () =>
      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/MonicaAva.webp?width=960",
    []
  );

  return (
    <>
      <AnimatePresence>
        {introVisible && (
          <IntroOverlay key="intro-overlay" onOverlayEnd={handleIntroEnd} />
        )}
      </AnimatePresence>

      <motion.div
        key="homepage"
        initial={{ opacity: 0 }}
        animate={introVisible ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative min-h-screen"
      >
        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>
        <Suspense fallback={null}>
          <AudioPrompt />
        </Suspense>
        {allowMotion && !isCoarsePointer ? (
          <video
            key={backgroundVideo}
            src={backgroundVideo}
            poster={backgroundPoster}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="fixed inset-0 h-full w-full object-cover -z-10"
          />
        ) : (
          <div
            aria-hidden="true"
            className="fixed inset-0 -z-10 bg-gradient-to-br from-cyan-200 via-slate-100 to-fuchsia-200"
          />
        )}
        <div className="relative z-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 md:px-6">
            <Suspense
              fallback={
                <div className="h-12 w-full animate-pulse rounded-xl bg-[var(--surface)]/60" />
              }
            >
              <SitePreferencesPanel />
            </Suspense>
            <motion.div
              initial={{ opacity: 0 }}
              animate={introVisible ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.45, delay: introVisible ? 0 : 0.1 }}
              className="theme-card theme-card--strong p-4 backdrop-blur-sm md:p-6"
            >
              <Header />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={introVisible ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.45, delay: introVisible ? 0 : 0.16 }}
              className="theme-card p-3 backdrop-blur-sm md:p-4"
            >
              <Suspense
                fallback={
                  <div className="h-32 w-full animate-pulse rounded-2xl bg-[var(--surface)]/60" />
                }
              >
                <NavbarMenu />
              </Suspense>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={introVisible ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.45, delay: introVisible ? 0 : 0.22 }}
              className="theme-card p-4 backdrop-blur-sm md:p-6"
            >
              {children}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HomePage;

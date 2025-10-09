import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Information from "../NavBar/NavbarHomePage";
import Header from "../Header/Header";
import AudioModal from "../../contents/Audio";
import Introduction from "../Introduction/introduction";
import GotoTop from "../../contents/GotoTop";
import SitePreferences from "../../contents/SitePreferences";

const HomePage = ({ children }) => {
  const [introVisible, setIntroVisible] = useState(true);
  const [allowMotion, setAllowMotion] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event) => setAllowMotion(!event.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(handleMotionChange);
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

  return (
    <>
      <AnimatePresence>
        {introVisible && (
          <Introduction key="intro-overlay" onOverlayEnd={handleIntroEnd} />
        )}
      </AnimatePresence>

      <motion.div
        key="homepage"
        initial={{ opacity: 0 }}
        animate={introVisible ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative min-h-screen"
      >
        <GotoTop />
        <AudioModal />
        {allowMotion ? (
          <video
            key={backgroundVideo}
            src={backgroundVideo}
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
            <SitePreferences />
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
              <Information />
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

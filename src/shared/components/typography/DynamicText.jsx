
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "../../hooks/useTranslation";

const Text = () => {
  const { t } = useTranslation();

  const phrases = useMemo(() => {
    const values = t("header.dynamicPhrases");
    return Array.isArray(values) ? values : [];
  }, [t]);

  const getRandomPhrase = () => {
    if (!phrases.length) return "";
    const index = Math.floor(Math.random() * phrases.length);
    return phrases[index] ?? "";
  };

  const [current, setCurrent] = useState(getRandomPhrase);

  useEffect(() => {
    setCurrent(getRandomPhrase());
  }, [phrases]);

  useEffect(() => {
    if (!phrases.length) return undefined;
    const interval = window.setInterval(() => {
      setCurrent(getRandomPhrase());
    }, 5200);
    return () => window.clearInterval(interval);
  }, [phrases]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45 }}
        style={{
          fontFamily: "Poetsen One",
          fontWeight: 800,
          fontStyle: "normal",
        }}
        className="text-[var(--text-muted)]"
      >
        {current}
      </motion.div>
    </AnimatePresence>
  );
};

export default Text;

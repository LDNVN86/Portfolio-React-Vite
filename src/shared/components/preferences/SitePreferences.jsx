import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";
import { PiDropHalfBottomFill } from "react-icons/pi";
import { useAppSettings } from "../../contexts/AppSettingsContext";
import { useTranslation } from "../../hooks/useTranslation";

const ACCENT_PRESETS = ["#22d3ee", "#f97316", "#a855f7", "#facc15", "#10b981", "#fb7185"];
const ChromePicker = lazy(() =>
  import("react-color").then((mod) => ({ default: mod.ChromePicker }))
);

const SitePreferences = () => {
  const { theme, toggleTheme, accentColor, setAccentColor, language, setLanguage } = useAppSettings();
  const { t } = useTranslation();
  const [showPalette, setShowPalette] = useState(false);
  const pickerRef = useRef(null);
  const toggleRef = useRef(null);

  const handleColorChange = (value, closePanel = false) => {
    setAccentColor(value);
    if (closePanel) setShowPalette(false);
  };

  const chromePickerStyles = useMemo(
    () => ({
      default: {
        picker: {
          background: "var(--surface-strong)",
          boxShadow: "var(--surface-shadow)",
          borderRadius: "1rem",
          width: "100%",
        },
        body: {
          padding: "0.75rem",
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (!showPalette) return undefined;

    const handlePointerDown = (event) => {
      const pickerEl = pickerRef.current;
      const toggleEl = toggleRef.current;
      if (
        pickerEl &&
        !pickerEl.contains(event.target) &&
        toggleEl &&
        !toggleEl.contains(event.target)
      ) {
        setShowPalette(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [showPalette]);

  return (
    <section className="theme-panel p-5">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
              {t("common.settingsTitle")}
            </p>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {theme === "light" ? t("common.themeLight") : t("common.themeDark")}
            </h2>
          </div>
          <motion.button
            type="button"
            onClick={toggleTheme}
            aria-label={`${t("common.themeLabel")}: ${
              theme === "light" ? t("common.themeDark") : t("common.themeLight")
            }`}
            className="relative flex h-12 w-28 items-center rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-3 shadow-sm transition hover:bg-[var(--surface-strong)]"
            whileTap={{ scale: 0.96 }}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute top-1.5 bottom-1.5 w-11 rounded-full bg-[var(--accent-gradient)] shadow-md"
              style={{
                left: theme === "light" ? "6px" : "calc(100% - 50px)",
              }}
            />
            <div className="relative z-[1] flex w-full items-center justify-between text-lg text-[var(--text-muted)]">
              <HiMiniSun
                className={theme === "light" ? "text-[var(--accent-contrast)]" : "opacity-60"}
                aria-hidden="true"
              />
              <HiMiniMoon
                className={theme === "dark" ? "text-[var(--accent-contrast)]" : "opacity-60"}
                aria-hidden="true"
              />
            </div>
          </motion.button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
              {t("common.accentLabel")}
            </span>
            <div className="relative">
              <motion.button
                type="button"
                onClick={() => setShowPalette((prev) => !prev)}
                className="group flex w-full items-center gap-3 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] shadow-sm transition hover:bg-[var(--surface-strong)]"
                whileTap={{ scale: 0.98 }}
                aria-expanded={showPalette}
                ref={toggleRef}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <span
                  aria-hidden="true"
                  className="block h-7 w-7 rounded-full border border-white/20 shadow-sm transition group-hover:scale-105"
                  style={{ background: accentColor }}
                />
                <PiDropHalfBottomFill
                  className="text-lg text-[var(--text-muted)]"
                  aria-hidden="true"
                />
                <span className="truncate text-sm uppercase tracking-wide">
                  {accentColor.toUpperCase()}
                </span>
              </motion.button>
              <AnimatePresence>
                {showPalette && (
                  <motion.div
                    ref={pickerRef}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-14 z-20 w-[18rem] rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-strong)] p-4 shadow-2xl backdrop-blur-sm"
                  >
                    <Suspense
                      fallback={
                        <div className="flex h-32 items-center justify-center text-xs text-[var(--text-muted)]">
                          {t("common.loading")}
                        </div>
                      }
                    >
                      <ChromePicker
                        color={accentColor}
                        disableAlpha
                        onChange={(color) => handleColorChange(color.hex)}
                        onChangeComplete={(color) => handleColorChange(color.hex)}
                        styles={chromePickerStyles}
                      />
                    </Suspense>
                    <div className="theme-divider my-4" />
                    <div className="flex flex-wrap items-center gap-2">
                      {ACCENT_PRESETS.map((color) => (
                        <motion.button
                          key={color}
                          type="button"
                          className="h-9 w-9 rounded-full border border-white/30 shadow-sm"
                          style={{ background: color }}
                          onClick={() => handleColorChange(color, true)}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.92 }}
                          aria-label={`${t("common.accentLabel")} ${color}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
              {t("common.languageLabel")}
            </span>
            <div className="flex w-full items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] p-1 shadow-sm">
              {[
                { code: "vi", label: t("common.languageVi") },
                { code: "en", label: t("common.languageEn") },
              ].map((option) => {
                const isActive = language === option.code;
                return (
                  <motion.button
                    key={option.code}
                    type="button"
                    className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition ${
                      isActive ? "shadow-md" : "text-[var(--text-muted)]"
                    }`}
                    style={{
                      background: isActive ? "var(--accent-gradient)" : "transparent",
                      color: isActive ? "var(--accent-contrast)" : "inherit",
                    }}
                    onClick={() => setLanguage(option.code)}
                    whileTap={{ scale: 0.94 }}
                  >
                    {option.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SitePreferences;

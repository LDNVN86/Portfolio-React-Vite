import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import translations from "../i18n/translations";

const DEFAULT_THEME = "light";
const DEFAULT_ACCENT = "#22d3ee";
const DEFAULT_LANGUAGE = "vi";

const isBrowser = typeof window !== "undefined";

const Storage = {
  get(key, fallback) {
    if (!isBrowser) return fallback;
    try {
      const value = window.localStorage.getItem(key);
      return value !== null ? value : fallback;
    } catch (error) {
      console.warn(`[settings] Failed to read "${key}" from localStorage`, error);
      return fallback;
    }
  },
  set(key, value) {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`[settings] Failed to write "${key}" to localStorage`, error);
    }
  },
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const componentToHex = (component) => {
  const hex = component.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

const hexToRgb = (hex) => {
  if (!hex) return null;
  let sanitized = hex.replace("#", "").trim();
  if (![3, 6].includes(sanitized.length)) return null;
  if (sanitized.length === 3) {
    sanitized = sanitized
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const int = parseInt(sanitized, 16);
  if (Number.isNaN(int)) return null;
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return { r, g, b };
};

const rgbToHex = ({ r, g, b }) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

const rgbToHsl = ({ r, g, b }) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return { h, s, l };
};

const hslToRgb = ({ h, s, l }) => {
  if (s === 0) {
    const value = Math.round(l * 255);
    return { r: value, g: value, b: value };
  }

  const hueToRgb = (p, q, t) => {
    let value = t;
    if (value < 0) value += 1;
    if (value > 1) value -= 1;
    if (value < 1 / 6) return p + (q - p) * 6 * value;
    if (value < 1 / 2) return q;
    if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hueToRgb(p, q, h) * 255);
  const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);
  return { r, g, b };
};

const adjustLightness = (hex, amount) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb);
  const adjusted = { ...hsl, l: clamp(hsl.l + amount, 0, 1) };
  return rgbToHex(hslToRgb(adjusted));
};

const toRgba = (hex, alpha) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(34, 211, 238, ${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

const getLuminance = ({ r, g, b }) => {
  const normalize = (value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  };
  const rn = normalize(r);
  const gn = normalize(g);
  const bn = normalize(b);
  return 0.2126 * rn + 0.7152 * gn + 0.0722 * bn;
};

const getContrastColor = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#0f172a";
  const luminance = getLuminance(rgb);
  return luminance > 0.55 ? "#0f172a" : "#f8fafc";
};

const THEME_PRESETS = {
  light: {
    "--background": "#edf5ff",
    "--text-primary": "#0f172a",
    "--text-muted": "rgba(15, 23, 42, 0.65)",
    "--surface": "rgba(255, 255, 255, 0.78)",
    "--surface-strong": "rgba(255, 255, 255, 0.92)",
    "--surface-border": "rgba(15, 23, 42, 0.08)",
    "--surface-shadow": "0 18px 48px -20px rgba(15, 23, 42, 0.35)",
    "--floating-surface": "rgba(15, 23, 42, 0.78)",
    "--floating-text": "#f8fafc",
    "--divider": "rgba(15, 23, 42, 0.1)",
  },
  dark: {
    "--background": "#020617",
    "--text-primary": "#e2e8f0",
    "--text-muted": "rgba(226, 232, 240, 0.72)",
    "--surface": "rgba(15, 23, 42, 0.68)",
    "--surface-strong": "rgba(15, 23, 42, 0.82)",
    "--surface-border": "rgba(148, 163, 184, 0.16)",
    "--surface-shadow": "0 18px 48px -22px rgba(2, 6, 23, 0.65)",
    "--floating-surface": "rgba(2, 6, 23, 0.86)",
    "--floating-text": "#e2e8f0",
    "--divider": "rgba(148, 163, 184, 0.24)",
  },
};

const applyThemeTokens = (theme, accentColor) => {
  if (!isBrowser) return;
  const palette = THEME_PRESETS[theme] ?? THEME_PRESETS[DEFAULT_THEME];
  const root = document.documentElement;

  Object.entries(palette).forEach(([token, value]) => {
    root.style.setProperty(token, value);
  });

  const accent = hexToRgb(accentColor) ? accentColor : DEFAULT_ACCENT;
  const accentSoft = toRgba(accent, theme === "light" ? 0.16 : 0.24);
  const accentMuted = toRgba(accent, theme === "light" ? 0.3 : 0.38);
  const accentRing = toRgba(accent, theme === "light" ? 0.4 : 0.45);
  const accentHighlight = adjustLightness(accent, theme === "light" ? 0.18 : -0.12);
  const accentContrast = getContrastColor(accent);

  root.style.setProperty("--accent-color", accent);
  root.style.setProperty("--accent-soft", accentSoft);
  root.style.setProperty("--accent-muted", accentMuted);
  root.style.setProperty("--accent-ring", accentRing);
  root.style.setProperty("--accent-gradient", `linear-gradient(135deg, ${accent}, ${accentHighlight})`);
  root.style.setProperty("--accent-contrast", accentContrast);

  root.classList.toggle("dark", theme === "dark");
};

const AppSettingsContext = createContext(null);

export const AppSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => Storage.get("app-theme", DEFAULT_THEME));
  const [accentColor, setAccentColor] = useState(() => Storage.get("app-accent", DEFAULT_ACCENT));
  const [language, setLanguage] = useState(() => Storage.get("app-language", DEFAULT_LANGUAGE));

  useEffect(() => {
    applyThemeTokens(theme, accentColor);
  }, [theme, accentColor]);

  useEffect(() => {
    Storage.set("app-theme", theme);
  }, [theme]);

  useEffect(() => {
    Storage.set("app-accent", accentColor);
  }, [accentColor]);

  useEffect(() => {
    Storage.set("app-language", language);
    if (isBrowser) {
      document.documentElement.setAttribute("lang", language);
    }
  }, [language]);

  useEffect(() => {
    if (!isBrowser) return;
    // ensure CSS vars are applied on initial mount
    applyThemeTokens(theme, accentColor);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      accentColor,
      setAccentColor,
      language,
      setLanguage,
      translations,
    }),
    [theme, accentColor, language]
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useAppSettings must be used within AppSettingsProvider");
  }
  return context;
};

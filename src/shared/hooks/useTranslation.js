import { useCallback, useMemo } from "react";
import { useAppSettings } from "../contexts/AppSettingsContext";
import translations from "../i18n/translations";

const resolvePath = (locale, path) => {
  if (!locale || !path) return undefined;
  return path.split(".").reduce((accumulator, segment) => {
    if (accumulator && Object.prototype.hasOwnProperty.call(accumulator, segment)) {
      return accumulator[segment];
    }
    return undefined;
  }, locale);
};

export const useTranslation = () => {
  const { language } = useAppSettings();

  const locale = useMemo(() => translations[language] ?? translations.vi, [language]);

  const t = useCallback(
    (path, fallback) => {
      const value = resolvePath(locale, path);
      if (value !== undefined && value !== null) return value;
      if (fallback !== undefined) return fallback;
      return path;
    },
    [locale]
  );

  return { t, language };
};

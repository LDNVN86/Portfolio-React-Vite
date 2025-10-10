import { useMemo, useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const TRACK_IDS = ["9HbIb62aEZQ", "5kbk0b3DMSk", "Hq_Q9vSIg2M", "3O3eJ9j0ors"];
const PLAYLIST_ID = "PLTaxR39ggBO7wfVjUjCkcBmyzVcckvN-5";
const YT_EMBED_BASE = "https://www.youtube-nocookie.com/embed";

const getOrigin = () => {
  if (typeof window === "undefined") return "";
  return window.location.origin;
};

const buildPlayerUrl = (videoId, origin) => {
  if (!videoId) return null;
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    controls: "0",
    showinfo: "0",
    modestbranding: "1",
    playsinline: "1",
    loop: "1",
    playlist: PLAYLIST_ID,
    enablejsapi: "1",
    origin,
  });
  return `${YT_EMBED_BASE}/${videoId}?${params.toString()}`;
};

const AudioPrompt = () => {
  const { t } = useTranslation();
  const { theme } = useAppSettings();
  const [shouldPrompt, setShouldPrompt] = useState(true);
  const [trackId, setTrackId] = useState(null);

  const origin = useMemo(getOrigin, []);

  const playerUrl = useMemo(() => buildPlayerUrl(trackId, origin), [trackId, origin]);

  const handleAccept = () => {
    const index = Math.floor(Math.random() * TRACK_IDS.length);
    setTrackId(TRACK_IDS[index]);
    setShouldPrompt(false);
  };

  const handleDecline = () => {
    setTrackId(null);
    setShouldPrompt(false);
  };

  const isDark = theme === "dark";

  return (
    <>
      {shouldPrompt && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
          <div
            className={`pointer-events-auto w-full max-w-md rounded-3xl border border-[var(--surface-border)] p-5 shadow-2xl backdrop-blur-xl transition-colors ${
              isDark
                ? "bg-[var(--floating-surface)]/92 text-[var(--floating-text)]"
                : "bg-[var(--surface)] text-[var(--text-primary)]"
            }`}
          >
            <p className="text-sm font-medium leading-relaxed">{t("audio.prompt")}</p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleAccept}
                className="theme-button flex-1 px-4 py-2 text-sm"
              >
                {t("audio.accept")}
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className={`flex-1 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] ${
                  isDark
                    ? "border-white/20 text-[var(--floating-text)] hover:bg-white/10"
                    : "border-[var(--surface-border)] text-[var(--text-muted)] hover:bg-[var(--surface-strong)]"
                }`}
              >
                {t("audio.decline")}
              </button>
            </div>
          </div>
        </div>
      )}
      {playerUrl && (
        <iframe
          src={playerUrl}
          title={t("audio.title")}
          width="1"
          height="1"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          referrerPolicy="origin-when-cross-origin"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
          className="fixed -left-full -top-full h-0 w-0"
        />
      )}
    </>
  );
};

export default AudioPrompt;

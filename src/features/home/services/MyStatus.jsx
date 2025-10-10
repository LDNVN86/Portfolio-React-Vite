import { useMemo } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useTranslation } from "../../../shared/hooks/useTranslation";

const STATUS_COLORS = {
  dnd: { base: "bg-red-500", ping: "bg-red-400" },
  idle: { base: "bg-amber-500", ping: "bg-amber-400" },
  online: { base: "bg-emerald-500", ping: "bg-emerald-400" },
  offline: { base: "bg-slate-500", ping: "bg-slate-400" },
  default: { base: "bg-slate-500", ping: "bg-slate-400" },
};

const pickPrimaryActivity = (activities) => {
  if (!activities) return null;
  return (
    activities.find((item) => item.type === 0) || // playing a game
    activities.find((item) => item.type === 2) || // listening spotify
    activities.find((item) => item.type === 4) || // custom status
    activities[0] ||
    null
  );
};

const MyStatus = ({ Status, TimesetDate }) => {
  const { t } = useTranslation();

  const statusKey = Status?.discord_status ?? "loading";
  const statusLabels = t("status.states");
  const currentStatusLabel =
    (statusLabels && statusLabels[statusKey]) || t("status.loading");

  const activityList = Status?.activities ?? [];
  const primaryActivity = pickPrimaryActivity(activityList);

  const pingColors = STATUS_COLORS[statusKey] ?? STATUS_COLORS.default;

  const subtitle = useMemo(() => {
    if (!primaryActivity) return "";
    if (primaryActivity.type === 0) {
      return `${primaryActivity.name ?? ""} ${TimesetDate ?? ""}`.trim();
    }
    if (primaryActivity.type === 2 && Status?.spotify?.song) {
      const artist = Status.spotify.artist ? ` • ${Status.spotify.artist}` : "";
      return `${Status.spotify.song}${artist}`;
    }
    if (primaryActivity.type === 4 && primaryActivity.state) {
      return primaryActivity.state;
    }
    return primaryActivity.name || "";
  }, [primaryActivity, Status, TimesetDate]);

  const tooltipContent = useMemo(() => {
    if (!Status) {
      return <div className="text-sm">{t("status.tooltipLoading")}</div>;
    }

    const name = Status?.discord_user?.display_name;

    return (
      <div className="flex w-64 flex-col gap-3 text-sm text-[var(--text-primary)]">
        <div>
          <span className="font-semibold">{t("status.currentStatus")}</span>{" "}
          <span className="font-semibold text-[var(--accent-color)]">{currentStatusLabel}</span>
        </div>
        {name && (
          <div>
            <span className="font-semibold">{t("status.nameGlobal")}</span>{" "}
            <span className="font-mono">{name.replace(/"/g, "")}</span>
          </div>
        )}
        {activityList.length > 0 && (
          <div className="space-y-2">
            {activityList.map((item) => {
              switch (item.type) {
                case 0:
                  return (
                    <div key={item.id}>
                      <strong>{t("status.playing")}</strong>
                      <div>
                        {item.name}{" "}
                        <span className="font-mono">{TimesetDate}</span>
                      </div>
                    </div>
                  );
                case 2:
                  return Status?.spotify?.song ? (
                    <div key={item.id}>
                      <strong>{t("status.listening")}</strong>
                      <ul className="ml-3 list-disc">
                        <li>
                          {t("status.spotifySong")} {Status.spotify.song}
                        </li>
                        {Status.spotify.artist && (
                          <li>
                            {t("status.spotifyArtist")} {Status.spotify.artist}
                          </li>
                        )}
                        {Status.spotify.album && (
                          <li>
                            {t("status.spotifyAlbum")} {Status.spotify.album}
                          </li>
                        )}
                      </ul>
                    </div>
                  ) : null;
                case 4:
                  return (
                    <div key={item.id}>
                      <strong>{t("status.customStatus")}</strong>
                      <div>{item.state || t("status.noDescription")}</div>
                    </div>
                  );
                default:
                  return (
                    <div key={item.id}>
                      <strong>{t("status.other")}</strong> {item.name}
                    </div>
                  );
              }
            })}
          </div>
        )}
      </div>
    );
  }, [Status, TimesetDate, activityList, currentStatusLabel, t]);

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm transition hover:border-[var(--accent-muted)] hover:bg-[var(--surface-strong)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)]">
            <span
              className={`absolute inline-flex h-5 w-5 animate-ping rounded-full ${pingColors.ping} opacity-60`}
            />
            <span className={`relative inline-flex h-4 w-4 rounded-full ${pingColors.base}`} />
          </span>
          <div className="min-w-0">
            <p className="font-semibold capitalize">{currentStatusLabel}</p>
            {subtitle && (
              <p className="truncate text-xs text-[var(--text-muted)]" title={subtitle}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <Tippy
          content={tooltipContent}
          placement="bottom-end"
          animation="shift-away"
          theme="status-card"
          arrow
          interactive
        >
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--text-muted)] transition hover:border-[var(--accent-muted)] hover:text-[var(--accent-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]"
            aria-label={t("status.currentStatus")}
          >
            <HiOutlineInformationCircle className="text-base" />
          </button>
        </Tippy>
      </div>
      {primaryActivity?.type === 0 && TimesetDate && (
        <span className="inline-flex w-fit items-center rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-color)]">
          {TimesetDate}
        </span>
      )}
    </div>
  );
};

export default MyStatus;

import { FaMapMarkedAlt } from "react-icons/fa";
import { useTranslation } from "../../../shared/hooks/useTranslation";

const MyLocation = ({ MyWeather }) => {
  const { t } = useTranslation();

  const temperatureValue = MyWeather?.main?.temp;
  const formattedTemperature =
    typeof temperatureValue === "number" ? `${Math.round(temperatureValue)}°C` : "--";
  const roundedFeelsLike =
    typeof MyWeather?.main?.feels_like === "number"
      ? `${Math.round(MyWeather.main.feels_like)}°C`
      : null;
  const weatherDescription = MyWeather?.weather?.[0]?.description ?? "--";
  const humidity =
    typeof MyWeather?.main?.humidity === "number" ? `${MyWeather.main.humidity}%` : "--";
  const cityName = MyWeather?.name ?? "--";
  const wind =
    typeof MyWeather?.wind?.speed === "number"
      ? `${Math.round(MyWeather.wind.speed)} m/s`
      : "--";
  const feelsLikeLabel = t("location.feelsLike");
  const humidityLabel = t("location.humidity");
  const windLabel = t("location.wind");

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm transition hover:border-[var(--accent-muted)] hover:bg-[var(--surface-strong)]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-color)]">
          <FaMapMarkedAlt aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold">{t("location.label")}</p>
          <p className="truncate text-xs text-[var(--text-muted)]">{cityName}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs text-[var(--text-muted)] md:grid-cols-4">
        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {formattedTemperature}
          </p>
          <p>{t("location.temperature")}</p>
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)] capitalize">
            {weatherDescription}
          </p>
          <p>{t("location.weather")}</p>
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {humidity}
          </p>
          <p>{humidityLabel}</p>
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {roundedFeelsLike || wind}
          </p>
          <p>{roundedFeelsLike ? feelsLikeLabel : windLabel}</p>
        </div>
      </div>
    </div>
  );
};

export default MyLocation;

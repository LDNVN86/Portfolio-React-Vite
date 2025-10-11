import axios from "axios";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useAppSettings } from "../../../shared/contexts/AppSettingsContext";

const MyLocation = lazy(() => import("../services/MyLocation"));
const MyStatus = lazy(() => import("../services/MyStatus"));

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

const formatElapsed = (elapsedMs) => {
  const days = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((elapsedMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);

  if (Number.isNaN(seconds)) return "";
  if (days >= 1) return `(${days}d:${hours}h:${minutes}m:${seconds}s)`;
  if (hours >= 1) return `(${hours}h:${minutes}m:${seconds}s)`;
  return `(${minutes}m:${seconds}s)`;
};

const buildWeatherUrl = (apiKey, langCode) =>
  `${WEATHER_URL}?lat=10.9289&lon=108.1021&appid=${apiKey}&units=metric&lang=${langCode}`;

const UserPresence = () => {
  const userId = import.meta.env.VITE_UIDDIS_UserID_API_Lanyard;
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const { language } = useAppSettings();

  const weatherLang = useMemo(() => (language === "vi" ? "vi" : "en"), [language]);

  const [dataUser, setDataUser] = useState(null);
  const [dataWeather, setDataWeather] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const pollingRef = useRef(null);
  const idleHandleRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      console.warn("[status] Missing VITE_UIDDIS_UserID_API_Lanyard environment variable");
    }
    if (!apiKey) {
      console.warn("[weather] Missing VITE_OPENWEATHER_API_KEY environment variable");
    }
  }, [userId, apiKey]);

  useEffect(() => {
    if (!userId && !apiKey) return undefined;

    let isCancelled = false;

    const fetchData = async () => {
      try {
        const requests = [];
        if (userId) {
          requests.push(axios.get(`https://api.lanyard.rest/v1/users/${userId}`));
        } else {
          requests.push(Promise.resolve(null));
        }

        if (apiKey) {
          requests.push(axios.get(buildWeatherUrl(apiKey, weatherLang)));
        } else {
          requests.push(Promise.resolve(null));
        }

        const [userResponse, weatherResponse] = await Promise.allSettled(requests);

        if (isCancelled) return;

        if (userResponse.status === "fulfilled" && userResponse.value) {
          setDataUser(userResponse.value.data?.data ?? null);
        }

        if (weatherResponse.status === "fulfilled" && weatherResponse.value) {
          setDataWeather(weatherResponse.value.data ?? null);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    const startPolling = () => {
      fetchData();
      pollingRef.current = window.setInterval(fetchData, 60_000);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleHandleRef.current = window.requestIdleCallback(() => {
        if (!isCancelled) startPolling();
      }, { timeout: 2000 });
    } else {
      idleHandleRef.current = window.setTimeout(() => {
        if (!isCancelled) startPolling();
      }, 0);
    }

    return () => {
      isCancelled = true;
      if (pollingRef.current) {
        window.clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      if (typeof window !== "undefined" && idleHandleRef.current !== null) {
        if ("cancelIdleCallback" in window && typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleHandleRef.current);
        } else {
          window.clearTimeout(idleHandleRef.current);
        }
        idleHandleRef.current = null;
      }
    };
  }, [userId, apiKey, weatherLang]);

  useEffect(() => {
    if (!dataUser) return undefined;

    const activity = dataUser?.activities?.find((item) => item?.type === 0);
    const startedAt = activity?.timestamps?.start;
    if (!startedAt) {
      setElapsed(0);
      return undefined;
    }

    const updateElapsed = () => {
      setElapsed(Date.now() - startedAt);
    };

    updateElapsed();
    const timerId = window.setInterval(updateElapsed, 1000);
    return () => window.clearInterval(timerId);
  }, [dataUser]);

  const elapsedLabel = useMemo(() => formatElapsed(elapsed), [elapsed]);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-4">
      <div className="flex-1">
        <Suspense fallback={<div className="h-24 animate-pulse rounded-xl bg-[var(--surface)]/60" />}>
          <MyStatus Status={dataUser} TimesetDate={elapsedLabel} />
        </Suspense>
      </div>
      <div className="flex-1">
        <Suspense fallback={<div className="h-24 animate-pulse rounded-xl bg-[var(--surface)]/60" />}>
          <MyLocation MyWeather={dataWeather} />
        </Suspense>
      </div>
    </div>
  );
};

export default UserPresence;

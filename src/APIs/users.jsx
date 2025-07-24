import axios from "axios";
import { useState, useEffect } from "react";

import MyLocation from "../services/MyLocation";
import MyStatus from "../services/MyStatus";

const User = () => {
  const UidDIS = import.meta.env.VITE_UIDDIS_UserID_API_Lanyard;
  const urlDis = `https://api.lanyard.rest/v1/users/${UidDIS}`;
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=10.9289&lon=108.1021&appid=${apiKey}&units=metric&lang=vi`;

  const [dataUser, setDataUser] = useState(null);
  const [dataWeather, setDataWeather] = useState(null);
  const [TimeActivities, setTimeActivities] = useState(0);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(urlDis);
      setDataUser(response.data.data);
    } catch (e) {
      console.error("Lỗi khi gọi API:", e);
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(url);
      setDataWeather(response.data);
    } catch (e) {
      console.error("Lỗi Weather", e);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchWeather();
    const RestDataOld = setInterval(() => {
      fetchUserData();
      fetchWeather();
    }, 60000);
    return () => {
      clearInterval(RestDataOld);
    };
  }, []);

  useEffect(() => {
    if (dataUser) {
      const TimeStart = dataUser?.activities?.find((a) => a?.type === 0)
        ?.timestamps?.start;
      if (!TimeStart) return;
      const UpdateTimeActivities = setInterval(() => {
        const CurrentTime = Date.now();
        const progress = CurrentTime - TimeStart;
        setTimeActivities(progress);
      }, 1000);
      return () => clearInterval(UpdateTimeActivities);
    }
  }, [dataUser]);

  const formatDate = (TimeActivities) => {
    let days = Math.floor(TimeActivities / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (TimeActivities % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((TimeActivities % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((TimeActivities % (1000 * 60)) / 1000);
    if (days >= 1) {
      return "(" + days + "d:" + hours + "h:" + minutes + "m:" + seconds + "s)";
    } else if (hours >= 1) {
      return `(${hours}h:${minutes}m:${seconds}s)`;
    } else return `(${minutes}m:${seconds}s)`;
  };
  const timelapsed = formatDate(TimeActivities);

  return (
    <>
      <div className="flex flex-col gap-3 mb-3 font-mono cursor-pointer">
        <MyStatus Status={dataUser} TimesetDate={timelapsed}></MyStatus>

        <MyLocation MyWeather={dataWeather}></MyLocation>
      </div>
    </>
  );
};

export default User;

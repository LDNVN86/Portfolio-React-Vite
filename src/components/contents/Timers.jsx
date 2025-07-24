import { useEffect, useRef } from "react";

const TimeCurrent = () => {
  const Time = useRef("");
  useEffect(() => {
    const Timer = setInterval(() => {
      const time = new Date();
      Time(`${time.getHours}:${time.getMinutes}:${time.getSeconds}`);
    }, 1000);
    return clearInterval(Timer);
  }, []);
  return (
    <>
      <div>{Time}</div>
    </>
  );
};

export default TimeCurrent;

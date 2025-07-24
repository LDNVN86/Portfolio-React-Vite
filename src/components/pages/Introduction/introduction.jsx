import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import VideoIntro1 from "../../../assets/video222.webm";
import Ava1111 from "../../../assets/Ava.jpg";
import Intro2 from "../../../assets/Intro2.webm";
import quote from "./text";

const Introduction = ({ onOverlayEnd }) => {
  const quotes = quote;
  const [currentQuote, setCurrentQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 765);
  const videoref = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 765);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (videoref.current) videoref.current.load();
  }, [isMobile]);

  return (
    <div className="fixed inset-0 ">
      <video
        ref={videoref}
        muted
        loop
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={isMobile ? Intro2 : VideoIntro1} type="video/webm" />
      </video>

      <div
        onClick={onOverlayEnd}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white z-5 cursor-pointer"
      >
        <img className="rounded-full w-32 md:w-40 shadow-md" src={Ava1111} />
        <div
          style={{ fontFamily: "Chinacat" }}
          className="font-black text-red-500 text-5xl text-center"
        >
          Seno Impotent
        </div>
        <motion.p
          key={currentQuote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md px-4 font-extrabold bg-slate-100 text-sm md:text-lg text-black"
          style={{ fontFamily: "Poetsen One", fontWeight: 800 }}
        >
          {currentQuote}
        </motion.p>
      </div>
    </div>
  );
};

export default Introduction;

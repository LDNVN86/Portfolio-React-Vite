import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const GotoTop = () => {
  const [showGotoTop, setGotoTop] = useState(false);
  const [showIcons, setIcons] = useState(false);
  const scrollRef = useRef(0);
  const [DisplayCheck, setDislay] = useState("0");
  useEffect(() => {
    const HandleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const PerScroll = (scrollTop / scrollHeight) * 100;
      scrollRef.current = PerScroll.toFixed(0);
      const display = scrollRef.current;
      setDislay(display);
      setGotoTop(PerScroll >= 1);
    };
    window.addEventListener("scroll", HandleScroll);
    return () => window.removeEventListener("scroll", HandleScroll);
  }, []);
  useEffect(() => {});

  return (
    <>
      {showGotoTop && (
        <button
          onMouseEnter={() => setIcons(true)}
          onMouseLeave={() => setIcons(false)}
          className="fixed flex justify-center items-center bg-slate-400 opacity-50 size-16 right-10 transform bottom-5 z-10 rounded-full shadow-md cursor-pointer animate-bounce z-60"
        >
          {showIcons ? (
            <IoIosArrowUp
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="size-10"
            ></IoIosArrowUp>
          ) : (
            <>{DisplayCheck}%</>
          )}
        </button>
      )}
    </>
  );
};

export default GotoTop;

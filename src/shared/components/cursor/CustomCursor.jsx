import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const TRAIL_LENGTH = 10;

const CustomCursor = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isLinkHover, setIsLinkHover] = useState(false);
  const [trailPoints, setTrailPoints] = useState([]);

  const visibleRef = useRef(false);
  const frameRef = useRef(null);

  const cursorX = useSpring(0, { stiffness: 420, damping: 32, mass: 0.6 });
  const cursorY = useSpring(0, { stiffness: 420, damping: 32, mass: 0.6 });
  const haloX = useSpring(0, { stiffness: 180, damping: 22, mass: 0.9 });
  const haloY = useSpring(0, { stiffness: 180, damping: 22, mass: 0.9 });

  const showCursor = () => {
    if (!visibleRef.current) {
      visibleRef.current = true;
      setIsVisible(true);
    }
  };

  const hideCursor = () => {
    visibleRef.current = false;
    setIsVisible(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const enableCursor = pointerQuery.matches && !motionQuery.matches;
    setIsEnabled(enableCursor);

    if (!enableCursor) {
      document.documentElement.classList.remove("custom-cursor-active");
      return undefined;
    }

    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      cursorX.set(clientX);
      cursorY.set(clientY);
      haloX.set(clientX);
      haloY.set(clientY);
      showCursor();

      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        setTrailPoints((previous) => {
          const next = [...previous, { x: clientX, y: clientY }];
          return next.slice(-TRAIL_LENGTH);
        });
        frameRef.current = null;
      });
    };

    const handleEnter = showCursor;
    const handleLeave = () => {
      hideCursor();
      setTrailPoints([]);
    };
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    const handlePointerOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive =
        target.closest("a, button, [role='button'], input, textarea, select, summary") !== null;
      setIsLinkHover(Boolean(interactive));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerenter", handleEnter);
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointerover", handlePointerOver);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerenter", handleEnter);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.classList.remove("custom-cursor-active");
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [cursorX, cursorY, haloX, haloY]);

  const haloSize = useMemo(() => {
    if (isPressed) return 46;
    if (isLinkHover) return 54;
    return 50;
  }, [isLinkHover, isPressed]);

  const coreSize = useMemo(() => {
    if (isPressed) return 14;
    if (isLinkHover) return 12;
    return 10;
  }, [isLinkHover, isPressed]);

  const pointerScale = useMemo(() => {
    if (isPressed) return 0.94;
    if (isLinkHover) return 1.04;
    return 1;
  }, [isLinkHover, isPressed]);

  const pointerGlow = useMemo(() => {
    if (isLinkHover) {
      return "0 0 18px rgba(255, 255, 255, 0.45)";
    }
    if (isPressed) {
      return "0 0 14px rgba(255, 208, 255, 0.35)";
    }
    return "0 0 12px rgba(173, 135, 255, 0.25)";
  }, [isLinkHover, isPressed]);

  const opacity = isVisible ? 1 : 0;

  if (!isEnabled) return null;

  return (
    <>
      {/* soft glow */}
      <motion.div
        style={{
          translateX: haloX,
          translateY: haloY,
          opacity,
          width: haloSize,
          height: haloSize,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), rgba(255,121,198,0.15) 45%, rgba(107,70,193,0.12) 65%, rgba(0,0,0,0) 80%)",
            filter: "blur(1px)",
            boxShadow: "0 0 35px rgba(164, 84, 255, 0.35)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>

      {/* core */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          opacity,
          width: coreSize,
          height: coreSize,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(255,176,253,0.75) 45%, rgba(121,80,255,0.55) 65%, rgba(59,130,246,0) 85%)",
            boxShadow: isPressed
              ? "0 0 30px rgba(255, 120, 255, 0.55)"
              : "0 0 18px rgba(121, 80, 255, 0.45)",
            mixBlendMode: "screen",
            transform: isPressed ? "scale(0.9)" : "scale(1)",
          }}
        />
      </motion.div>

      {/* pointer body */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          opacity,
          scale: pointerScale,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        aria-hidden="true"
      >
        <svg
          width="28"
          height="36"
          viewBox="0 0 28 36"
          style={{
            transform: "translate(-4px, -6px)",
            filter: pointerGlow,
          }}
        >
          <defs>
            <linearGradient id="cursor-pointer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="45%" stopColor="rgba(186,178,255,0.85)" />
              <stop offset="100%" stopColor="rgba(134,93,255,0.85)" />
            </linearGradient>
            <linearGradient id="cursor-pointer-stroke" x1="0%" y1="0%" x2="120%" y2="120%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
              <stop offset="100%" stopColor="rgba(107, 70, 193, 0.8)" />
            </linearGradient>
          </defs>
          <path
            d="M3 2 L3 25 L8.2 20.2 L12.5 34 L17.2 32 L13 19.6 L22.8 19.6 Z"
            fill="url(#cursor-pointer-gradient)"
            stroke="url(#cursor-pointer-stroke)"
            strokeWidth="1.4"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(10,10,25,0.35))",
            }}
          />
          <path
            d="M8.7 21.2 12.6 33.7"
            stroke="rgba(67,37,149,0.55)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* trail */}
      {trailPoints.map((point, index) => {
        const progress = (index + 1) / trailPoints.length;
        const size = 18 * progress;
        return (
          <span
            key={`${point.x}-${point.y}-${index}`}
            className="pointer-events-none fixed left-0 top-0 z-[9996] block -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              transform: `translate3d(${point.x}px, ${point.y}px, 0)`,
              width: `${size}px`,
              height: `${size}px`,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(255,153,255,0.3) 55%, rgba(255,153,255,0) 75%)",
              opacity: progress * 0.6,
              filter: "blur(0.35px)",
              transition: "transform 90ms ease-out, opacity 180ms ease-out",
              mixBlendMode: "screen",
            }}
          />
        );
      })}
    </>
  );
};

export default CustomCursor;

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isLinkHover, setIsLinkHover] = useState(false);
  const visibleRef = useRef(false);

  const cursorX = useSpring(0, { stiffness: 300, damping: 30, mass: 0.6 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 30, mass: 0.6 });
  const ringX = useSpring(0, { stiffness: 120, damping: 20, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 120, damping: 20, mass: 0.8 });

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
      ringX.set(clientX);
      ringY.set(clientY);
      showCursor();
    };

    const handleEnter = showCursor;
    const handleLeave = hideCursor;
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    const handlePointerOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select") !== null;
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
    };
  }, [cursorX, cursorY, ringX, ringY]);

  const ringSize = useMemo(() => {
    if (isPressed) return 22;
    if (isLinkHover) return 26;
    return 32;
  }, [isLinkHover, isPressed]);

  const dotSize = isPressed ? 6 : 8;
  const opacity = isVisible ? 1 : 0;

  if (!isEnabled) return null;

  return (
    <>
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          opacity,
          width: dotSize,
          height: dotSize,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-color)]"
      />
      <motion.div
        style={{
          translateX: ringX,
          translateY: ringY,
          opacity,
          width: ringSize,
          height: ringSize,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent-color)]/70 bg-[var(--accent-soft)]/40 backdrop-blur-sm"
      />
    </>
  );
};

export default CustomCursor;

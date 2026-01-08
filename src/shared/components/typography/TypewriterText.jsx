import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TypewriterText = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
  showCursor = true,
  onComplete = () => {},
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);

  const characters = useMemo(() => {
    return typeof text === "string" ? text.split("") : [];
  }, [text]);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    if (!characters.length) return;

    let currentIndex = 0;
    let timeoutId;

    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < characters.length) {
          setDisplayedText(characters.slice(0, currentIndex + 1).join(""));
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, speed);
        } else {
          setIsComplete(true);
          onComplete();
        }
      };
      typeNextChar();
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeoutId);
    };
  }, [characters, speed, delay, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (!showCursor) return;

    const blinkInterval = setInterval(() => {
      setShowCursorState((prev) => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, [showCursor]);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayedText}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
        >
          {displayedText}
        </motion.span>
      </AnimatePresence>
      {showCursor && !isComplete && (
        <motion.span
          animate={{ opacity: showCursorState ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="inline-block ml-0.5"
          style={{ color: "var(--accent-color)" }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypewriterText;

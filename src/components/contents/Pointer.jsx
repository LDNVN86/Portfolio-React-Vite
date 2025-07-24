import { useState, useEffect } from "react";

const words = ["Developer", "Designer", "Creator", "Engineer"];

function DynamicText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <h1 className="text-4xl font-bold">
      I am a <span className="text-indigo-500">{words[index]}</span>
    </h1>
  );
}

export default DynamicText;

/** @type {import('tailwindcss').Config} */
import { theme as resolveTheme } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        custom: "765px",
      },

      animation: {
        typewriter:
          "typewriter var(--duration) steps(var(--characters)) infinite",
        blink: "blink 0.7s step-end infinite",
      },
    },
  },
  plugins: [],
};

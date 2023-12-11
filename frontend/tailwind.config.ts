import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "240px",
      sm: "480px",
      stm: "540px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkblue: "#0f172a",
        darkgray: "#23272f",
        lightblack: "#16181d",
      },
      animation: {
        slideup: "slideup 0.75s ease-in-out",
        slideupfast: "slideupfast 0.5s",
        slideleft: "slideleft 1.25s ease-in-out",
        slideleftonly: "slideleftonly 5s ease-in",
        slidedownfastout: "slidedownfastout 0.5s",
      },
      keyframes: {
        slideup: {
          "0%, 75%": { opacity: "0", transform: "translateY(0.5rem)" },

          "100%": { opacity: "100", transform: "translateY(0rem)" },
        },
        slideupfast: {
          "0%": { opacity: "0", transform: "translateY(10rem)" },

          "100%": { opacity: "100", transform: "translateY(0rem)" },
        },
        slideleft: {
          "0%, 75%": { opacity: "0", transform: "translateX(-2rem)" },
          "100%": { opacity: "100", transform: "translateX(0rem)" },
        },
        slideleftonly: {
          "0%": { width: "20px" },
          "100%": { width: "80%" },
        },
        slidedownfastout: {
          "0%": { opacity: "100", transform: "translateY(0rem)" },

          "100%": { opacity: "0", transform: "translateY(10rem)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

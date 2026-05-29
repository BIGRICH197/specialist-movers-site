import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Extracted from brand SVGs in email sig / Logos / SVG
        "brand-yellow": "#f3d02a",
        "brand-purple": "#9739b0",
        "brand-purple-light": "#be76ef",
        "brand-white": "#FFFFFF",
        /** Page background , soft lavender-grey, less clinical than pure white */
        "brand-canvas": "#f3eff7",
        /** Cards / panels , slight warmth */
        "brand-surface": "#faf7fc",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "marquee-slow": "marquee 56s linear infinite",
        /** Homepage brand strip , calmer than default marquee */
        "marquee-gentle": "marquee 84s linear infinite",
      },
      fontFamily: {
        heading: ["var(--font-termina)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

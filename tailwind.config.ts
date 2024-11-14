import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        background_secondary: "var(--background-secondary)",
        border: {
          primary: "var(--border-primary)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        button: {
          primary: "var(--button-primary)",
        },
      },
      boxShadow: {
        primary: "0px 0px 6px 20px var(--background-secondary)",
        secondary: "0px 0px 6px 4px var(--background-secondary)",
      },
      keyframes: {
        slide_on: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slide_off: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        slide_on: "slide_on 0.3s ease-in-out forwards",
        slide_off: "slide_off 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;

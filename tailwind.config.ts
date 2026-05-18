import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0B",
          deep: "#080808",
          elevated: "#141210"
        },
        cream: {
          DEFAULT: "#F4EFE3",
          soft: "#EDE6D2",
          warm: "#EDE7D9"
        },
        sepia: "#9B9485",
        dim: "#5F5A50",
        gold: {
          DEFAULT: "#C9A35A",
          deep: "#A8853F",
          soft: "#D9BC7E",
          pale: "#E8D5A6"
        },
        line: {
          dark: "#1E1C18",
          light: "#D9D2BF"
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        eyebrow: "0.22em",
        wider: "0.18em"
      }
    }
  },
  plugins: []
};

export default config;

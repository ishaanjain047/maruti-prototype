import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Maruti Suzuki Brand Colors
        maruti: {
          red: "#DA241C", // Maximum Red - Primary CTAs, Important alerts
          blue: "#01458E", // Midnight Blue - Headers, Navigation, Primary buttons
          nexa: "#0066CC", // Celestial Blue - Premium features, AI indicators
          black: "#1F1A17", // Eerie Black - Text, Headers, Borders
        },
        // Functional Status Colors
        status: {
          success: "#51CF66",
          warning: "#FFC107",
          error: "#DA241C",
          info: "#4DABF7",
          premium: "#9775FA",
        },
        // Neutrals
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#01458E",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F8F9FA",
          foreground: "#1F1A17",
        },
        destructive: {
          DEFAULT: "#DA241C",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F8F9FA",
          foreground: "#6C757D",
        },
        accent: {
          DEFAULT: "#E9ECEF",
          foreground: "#1F1A17",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F1A17",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F1A17",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

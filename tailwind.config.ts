import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#f8fafc",
        accent: {
          DEFAULT: "#f472b6",
          soft: "#fbcfe8"
        },
        card: "#111827",
        border: "#1f2937"
      },
      fontFamily: {
        display: ["'Poppins'", "ui-sans-serif", "system-ui"],
        body: ["'Inter'", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(244, 114, 182, 0.45)",
        subtle: "0 10px 30px rgba(15, 23, 42, 0.45)"
      }
    }
  },
  plugins: [],
};

export default config;

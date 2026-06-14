const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, "app/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(__dirname, "components/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(__dirname, "src/**/*.{js,ts,jsx,tsx,mdx}"),
  ],
  theme: {
    extend: {
      colors: {
        // Aligned with acfstandard.com (--navy / --navy2 / --navy3 from globals.css)
        navy: {
          DEFAULT: "#050c1a", // body background — deepest navy
          50: "#9db0c8",      // body text light (--gr2)
          100: "#9db0c8",
          200: "#6b7fa0",      // labels, secondary text (--gr)
          300: "#6b7fa0",
          700: "#0d1f3c",      // surface cards (--navy3)
          800: "#071122",      // surface sections (--navy2)
          900: "#050c1a",      // base (--navy)
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8c96a",   // hover state (--gold2)
          400: "#e8c96a",
          dim: "rgba(201,168,76,0.14)",
          glow: "rgba(201,168,76,0.35)",
        },
        // Border tokens
        bd: {
          DEFAULT: "rgba(201,168,76,0.2)",  // gold-tinted (--bd)
          neutral: "rgba(255,255,255,0.07)", // (--bd2)
        },
        gr: {
          DEFAULT: "#6b7fa0",  // primary gray (--gr)
          2: "#9db0c8",         // lighter gray (--gr2)
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        nav: "24px",
      },
      maxWidth: {
        page: "1320px",
      },
    },
  },
  plugins: [],
};

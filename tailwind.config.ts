import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "0.75rem",
      screens: {
        sm: "600px",
        md: "728px",
        lg: "1000px",
        xl: "1240px",
        "2xl": "1240px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        roboto: ["var(--font-roboto-flex)"],
      },
    },
  },
  plugins: [],
};
export default config;

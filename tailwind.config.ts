import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        font: {
          main: "#222222",
          sub: "#444",
          light: "#999999"
        },
        background: "var(--background)",
        foreground: "var(--foreground)"
      }
    }
  },
  darkMode: "class",

  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#008c8c"
            }
          }
        }
      }
    })
  ]
};
export default config;

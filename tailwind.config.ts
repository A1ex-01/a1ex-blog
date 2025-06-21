import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#7aa0d4",
          50: "#f0f4f9",
          100: "#e1e9f3",
          200: "#c3d3e7",
          300: "#a5bddb",
          400: "#87a7cf",
          500: "#7aa0d4",
          600: "#5a80c3",
          700: "#4a6ba3",
          800: "#3a5682",
          900: "#2a4162",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // 添加 RTL 插件
    require("tailwindcss-rtl"),
    function ({ addVariant }) {
      addVariant("rtl", '[dir="rtl"] &');
      addVariant("ltr", '[dir="ltr"] &');
    },
    function ({ addComponents }: { addComponents: any }) {
      addComponents({
        // custom class-group
        ".feedback-option-btn": {
          "@apply !h-[56px] !rounded-2xl !border-gray-200 !px-5 !text-lg": true,
          boxShadow: `0 -0.04rem 0.08rem 0 #abb4c3 inset`,
        },
      });
    },
  ],
  // 启用 RTL 变体
  variants: {
    extend: {
      margin: ["rtl"],
      padding: ["rtl"],
      textAlign: ["rtl"],
      float: ["rtl"],
      clear: ["rtl"],
      inset: ["rtl"],
    },
  },
} satisfies Config;

export default config;

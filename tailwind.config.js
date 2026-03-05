/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1846ed",
          foreground: "#FFFFFF",
          hover: "#1239c7",
        },
        secondary: {
          DEFAULT: "#e4ab55",
          foreground: "#1a3a52",
          hover: "#d49a44",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#e4ab55",
          foreground: "#1a3a52",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sgyn: {
          blue: "#1846ed",
          gold: "#e4ab55",
          navy: "#1a3a52",
          "navy-light": "#234a6a",
          "navy-dark": "#0f2438",
          cream: "#f5f0e8",
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        arabic: ['Noto Naskh Arabic', 'serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        "4xl": "2rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        glow: "0 4px 20px rgba(24, 70, 237, 0.35)",
        "glow-gold": "0 4px 20px rgba(228, 171, 85, 0.3)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-navy': 'linear-gradient(135deg, #1a3a52 0%, #234a6a 100%)',
        'gradient-hero': 'linear-gradient(180deg, #1a3a52 0%, #0f2438 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

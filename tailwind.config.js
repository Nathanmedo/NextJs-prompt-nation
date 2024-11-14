/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#F3FF90",
        neonGreen: "#d4ff00",
        neonPrimary: "#9BEC00",
        neonSecondary: "#06D001",
        neonTertiary: "#059212",
        darkBg: "#0b1727"
      },
      backgroundImage: {
        bgImageOne : "url('/assets/Fractal_20Maze_20-_2060(4).webp')"
      }
    },
  },
  plugins: [],
};

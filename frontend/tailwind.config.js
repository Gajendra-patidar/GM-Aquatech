/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0369a1', // blue-700
        secondary: '#0891b2', // cyan-600
        dark: '#0f172a', // slate-900
        light: '#f8fafc', // slate-50
      }
    },
  },
  plugins: [],
}

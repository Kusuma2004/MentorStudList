// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-800': '#2D2D2D',
        'gray-900': '#1A1A1A',
        'gray-100': '#F5F5F5',
        'gray-300': '#B0B0B0',
        'gray-700': '#3A3A3A',
      },
    },
  },
  plugins: [],
}

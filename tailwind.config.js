/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parlourRed: '#991b1b', // This is tailwind's red-800
        gold: '#D4AF37',       // Premium Gold
      },
    },
  },
  plugins: [],
}
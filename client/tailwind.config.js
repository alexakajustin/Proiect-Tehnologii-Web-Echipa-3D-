/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981', // Emerald 500
        secondary: '#84CC16', // Lime 500
        dark: '#022C22', // Emerald 950 - Deep Forest
        light: '#ECFDF5', // Emerald 50
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

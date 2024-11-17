/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '100': '30rem',
        '120': '35rem',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
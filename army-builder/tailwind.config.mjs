/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/character-card/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/characterCard/**/*.{js,jsx,ts,tsx,mdx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-condensed': ["'Roboto Condensed'", 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

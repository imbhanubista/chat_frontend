/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#74e8a2",
          200: "#53e08b",
          dark: "#16A851",
        },

        secondary: "#1796D1",
        tertiary: "#FFFFFF",
      },
    },
  },
  plugins: [],
};

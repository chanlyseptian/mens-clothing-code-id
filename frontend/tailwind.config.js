/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        '3xl': '1624px',
      },
      colors: {
        bgcolor: "#F5F7F8",
        accentColor: "#FFCC1D",
        lightColor: "#E8E8CC",
        midColor: "#116530",
        darkColor: "#0B4619",
        headerColor: '#F5F5F5',
      },
    },
  },
  plugins: [],
};

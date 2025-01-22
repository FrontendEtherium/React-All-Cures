/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00415e", // Add your custom color
        secondary: {
          light: "#FF7F50",
        },
      },
    },
  },
  plugins: [],
};

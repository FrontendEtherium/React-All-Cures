/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#00415e', // Add your custom color
        secondary: {
          light: '#FF7F50', // Nested color for light shade
          DEFAULT: '#FF4500', // Default shade
          dark: '#8B0000', // Dark shade
        },
    },
  },
},
  plugins: [],
};

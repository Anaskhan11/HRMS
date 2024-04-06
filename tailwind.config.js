/** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "orange",
//         secondary: "#002738",
//       },
//     },
//   },
//   plugins: [],
// };

module.exports = {
  darkMode: "class", // This enables the `dark:` variant based on a class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#004e92", // Default, used in light mode
          dark: "##000428", // An adjusted orange for dark mode, as an example
        },
        secondary: {
          DEFAULT: "#002738",
          dark: "#334155", // An example of a darker secondary color
        },
        primaryDark: "#2b2d42",
        secondaryDark: "yellow",
      },
    },
  },
  plugins: [],
};

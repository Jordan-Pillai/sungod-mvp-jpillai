/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      container: {
        center: true,
        maxWidth: "1440px",
      },
      height: {
        12.5: "52px",
      },
      width: {
        12.5: "52px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
      container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primaryColor: "#373D93",
        secondaryColor: "#222360",
        primaryBackgroundColor: "#E7E8E8",
        darkColor: "#2E3748",
        secDarkColor: "#0A1038",
        thirdDarkColor: "#16204C",
      },
      // screens: {
      //   "2xl": "1320px",
      // },
      fontFamily: {
        primary: ["Noirden-Bold.otf"],
      },
    },
  },
  plugins: [],
}


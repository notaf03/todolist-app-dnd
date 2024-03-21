/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primaryColor: "#373D93",
        secondaryColor: "#222360",
        // secondaryColor: "#373D93",
        //dark #222360 dark2 #1B4962 dark3 #1D2A52
        primaryBackgroundColor: "#E7E8E8",
      },
      screens: {
        "2xl": "1320px",
      },
      fontFamily: {
        primary: ["Noirden-Bold.otf"],
      },
    },
  },
  plugins: [],
}


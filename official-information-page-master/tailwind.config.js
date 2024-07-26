/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnightblue: "#000235",
        gray: {
          "100": "#232323",
          "200": "#202020",
        },
        white: "#fff",
        steelblue: "#0562a5",
        gold: "#fedc00",
        limegreen: "#00b332",
        chocolate: "#b36000",
        forestgreen: "#0f8b25",
        mediumslateblue: "#0066ff",
        black: "#000",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        quicksand: "Quicksand",
        "inknut-antiqua": "'Inknut Antiqua'",
        quantico: "Quantico",
      },
      borderRadius: {
        "3xs": "10px",
        "31xl": "50px",
        "81xl": "100px",
        "6xl": "25px",
        xl: "20px",
      },
    },
    fontSize: {
      "11xl": "30px",
      "3xl": "22px",
      "6xl": "25px",
      "17xl": "36px",
      "13xl": "32px",
      xl: "20px",
      "26xl": "45px",
      "4xl": "23px",
      base: "16px",
      "7xl": "26px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};

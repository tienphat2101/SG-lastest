import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        mytheme: {
          ...daisyUIThemes["light"],
          primary: "#ffffff",
          secondary: "#ffffff",
          "primary-content": "#000000", // Text color on primary background
          "secondary-content": "#000000", // Text color on secondary background
        },
      },
    ],
  },
};

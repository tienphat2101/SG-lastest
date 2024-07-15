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
          ...daisyUIThemes["dark"], // Sử dụng theme dark của DaisyUI làm cơ sở
          primary: "#2D3748", // Màu chủ đạo (primary) tối
          secondary: "#4A5568", // Màu phụ (secondary) tối
          "primary-content": "#FFFFFF", // Màu chữ trên nền chủ đạo tối
          "secondary-content": "#A0AEC0", // Màu chữ trên nền phụ tối
        },
      },
    ],
  },
};

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors: {
        // Remove the duplicate primary definition
        secondary: "#FFCB1A",
        dark: {
          100: "#4F5C62",
          200: "#2C3539",
          300: "#1A2225", // Fixed: added missing #
          400: "#000000",
        },
        primary: {
          100: "#D6EBF6",
          200: "#9BD1EF",
          300: "#64C1F6",
          400: "#38B6FF",
        },
        light: {
          100: "#bdbdc0",
          200: "#DEDFE3",
          300: "#F0F0F4", // Fixed: changed FOFOF4 to F0F0F4
          400: "#FFFFFF",
        },
        accent: {
          100: "#FBDFBD",
        },
        danger: "#F75555",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Lavender Mist": "#EFEBFF",
        MaximumBluePurple: "#BEADFF",
        NeonBlue: "#633CFF",
        DarkCharcoal: "#333333",
        Nickel: "#737373",
        Gainsboro: "#D9D9D9",
        whiteFA: "#FAFAFA",
        white: "#FFFFFF",
        LightRed: "#FF3939",
      },
    },
  },
  plugins: [],
};

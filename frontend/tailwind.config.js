/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        LavenderMist: "#EFEBFF",
        MaximumBluePurple: "#BEADFF",
        NeonBlue: "#633CFF",
        DarkCharcoal: "#333333",
        Nickel: "#737373",
        github: "#24292e",
        Gainsboro: "#D9D9D9",
        whiteFA: "#FAFAFA",
        white: "#FFFFFF",
        LightRed: "#FF3939",
        twitter:"#1DA1F2",
        LinkedIn:"#0e76a8",
        facebook:"#316FF6",
        twitch:"#6441a5",
        DevTo:"#A9A9A9",
        Codeward:"#9F2305",
        freeCodeCamp:"#48AAAD",
        frontendmentors:"#48AAAD",
        gitLab:"#CC5500",
        Hashnode:"#0000FF",
        stackOverflow:"#FFA500",
      },
      fontFamily:{
        instrumentSansBold: ['Instrument Sans Bold',"Arial", "sans-serif"],
        instrumentSansRegular:['Instrument Sans Regular',"Arial", "sans-serif"],
        instrumentSansSemiBold:['Instrument Sans SemiBold',"Arial", "sans-serif"],
        instrumentSansItalicVariable:['Instrument Sans Italic Variable',"Arial", "sans-serif"],         
        instrumentSansVariable:['Instrument Sans Variable',"Arial", "sans-serif"]
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },  },
        animation: {
          shimmer: "shimmer 1.5s infinite",
        },

    },
    
  },
  plugins: [],
};

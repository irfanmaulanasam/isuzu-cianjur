// tailwind.config.js
module.exports = {
content: ["./src/**/*.{js,jsx,ts,tsx}"],
theme: { 
  extend:{
      colors: {
        bahana: {
          primary: "#1A4CA3",
          dark: "#163F8A",
          light: "#E6F0FF",
        },
        isuzu: {
          red: "#E60012",
          blue: "#0D1B5E",
        },
        bgLight: "#F5F5F5",
        textDark: "#111111",
        textMuted: "#666666",
      },
      maxWidth: {
        container: "1200px",
      },
    },
},
plugins: [
    require("@tailwindcss/typography")
    ],
};
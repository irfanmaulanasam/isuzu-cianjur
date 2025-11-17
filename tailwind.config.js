// tailwind.config.js
module.exports = {
content: ["./src/**/*.{js,jsx,ts,tsx}"],
theme: { extend:{
      colors: {
        bahana: {
          primary: "#1A4CA3",
          dark: "#163F8A",
          light: "#E6F0FF",
        },
      },
    },
},
plugins: [
    require("@tailwindcss/typography")
    ],
};
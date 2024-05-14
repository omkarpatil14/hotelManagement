/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: { themes: ["night", "corporate"] },
  important: "#root",
  plugins: [require("daisyui"), "@tailwindcss/forms"],
};

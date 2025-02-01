/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "#feffff", // Very light blue
        paleBlue: "#faffff", // Pale blue
        steelBlue: "#9dbcd2", // Light steel blue
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        space: ["SpaceMono"],
        courg: ["Courgette"],
        quick: ["Quicksand"],
      },
      colors: {
        active: "#007AFE",
        pale: "#F2D5F1",
        blu: "#DAE1FA",
        void: "#14141B",
        chalk: "#FAFAFA",
        grey: "#46515F",
        ghost: "#F8FAFC",
      },
    },
  },
  plugins: [],
};

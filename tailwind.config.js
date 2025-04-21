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
        quicksemi: ["QuickSemi"],
        quickbold: ["QuickBold"],
        spacebold: ["SpaceBold"],
        sat: ["Satisfy"],
        roman: ["Roman"],
      },
      colors: {
        active: "#007AFE",
        "dark-active": "#0A84FF",
        pale: "#F2D5F1",
        blu: "#DAE1FA",
        royal: "#0F172A",
        void: "#14141B",
        chalk: "#FAFAFA",
        grey: "#46515F",
        ghost: "#F8FAFC",
        grei: "#f2f2f2",
        ga: "#b8b8bd",
      },

      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-468px 0" },
          "100%": { backgroundPosition: "468px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
      },
      backgroundSize: {
        "s-200": "200% 200%",
      },
      backgroundPosition: {
        "p-0": "0% 0%",
        "p-100": "100% 100%",
      },
    },
  },
  plugins: [],
};

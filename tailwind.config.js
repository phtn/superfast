/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
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
        tight: ["TightMedium"],
        ultratight: ["TightSemi"],
        hypertight: ["TightBold"],
        eaves: ["Eaves"],
        garamond: ["Garamond"],
      },
      colors: {
        active: "#007AFE",
        "dark-active": "#0A84FF",
        "hyper-active": "#53A9FF",
        "ultra-active": "#8FC6FC",
        "off-active": "#aad3fc",
        pale: "#F2D5F1",
        zark: "#18181b",
        blu: "#DAE1FA",
        royal: "#0F172A",
        void: "#14141B",
        chalk: "#FAFAFA",
        grey: "#46515F",
        ghost: "#F8FAFC",
        grei: "#f2f2f2",
        ga: "#b8b8bd",
        "dark-ga": "#5d5d63",
        "light-ga": "#c7c7cb",
        fade: "#f3f4f6",
        hades: "#222229",
        cronus: "#1e2029",
        medusa: "#67696f",
        mortar: "#808186",
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
      letterSpacing: {
        snug: "-0.045em",
        teen: "-0.05em",
      },
    },
  },
  plugins: [],
};

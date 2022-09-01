module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "475px",
      // => @media (min-width: 475px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: "#42a7df",
        green: "#5cbe97",
        backgroundLight: "#edf6fb",
      },
      boxShadow: {
        "curve-t": "-27px 35px 0 1px #42a7df",
        "curve-b": "-35px -35px 2px 8px #42a7df",
      },
    },
  },
  plugins: [],
};

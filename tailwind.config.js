module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
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

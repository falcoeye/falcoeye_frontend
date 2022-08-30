import React, { useEffect, useState } from "react";

const ThemeContext = React.createContext({
  colorTheme: null,
  themeChangeHandler: () => {},
});

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [colorTheme, theme]);

  const contextValue = {
    colorTheme: colorTheme,
    themeChangeHandler: setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

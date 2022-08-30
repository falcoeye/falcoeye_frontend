import React, { useContext, useEffect, useState } from "react";
import { MdLightMode, MdModeNight } from "react-icons/md";
import ThemeContext from "../../../store/theme-context";

const ToggleMode = () => {
  const { colorTheme, themeChangeHandler } = useContext(ThemeContext);
  const isLight = colorTheme !== "dark";

  const startIcon = isLight ? <MdModeNight /> : <MdLightMode />;
  const [icon, setIcon] = useState(startIcon);

  const toggleModeHandler = () => {
    themeChangeHandler(colorTheme);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      if (isLight) {
        setIcon(<MdModeNight />);
      } else {
        setIcon(<MdLightMode />);
      }
    }, 250);

    return () => clearTimeout(time);
  }, [colorTheme, isLight]);

  return (
    <button
      className=" w-10 h-5 md:w-12 md:h-6 rounded-md bg-white dark:bg-gray-800 flex items-center transition duration-300 focus:outline-none shadow"
      onClick={toggleModeHandler}
    >
      <div
        id="switch-toggle"
        className={`w-6 h-6 md:w-[30px] md:h-[30px] relative rounded-full transition duration-500 transform  p-1 text-white  flex items-center justify-center ${
          isLight
            ? "translate-x-full bg-gray-900"
            : "bg-yellow-500 -translate-x-2"
        }`}
      >
        {icon}
      </div>
    </button>
  );
};

export default ToggleMode;

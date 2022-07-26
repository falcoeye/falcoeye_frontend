import React, { useEffect, useState } from "react";
import { MdLightMode, MdModeNight } from "react-icons/md";

const ToggleMode = () => {
  const [isDark, setIsDark] = useState(false);
  const [icon, setIcon] = useState(<MdLightMode />);

  const toggleModeHandler = () => {
    setIsDark((prevState) => !prevState);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isDark) {
        setIcon(<MdModeNight />);
      } else {
        setIcon(<MdLightMode />);
      }
    }, 250);
  }, [isDark]);

  return (
    <button
      className=" w-10 h-5 md:w-12 md:h-6 rounded-2xl bg-white flex items-center transition duration-300 focus:outline-none shadow"
      onClick={toggleModeHandler}
    >
      <div
        id="switch-toggle"
        className={`w-6 h-6 md:w-[30px] md:h-[30px] relative rounded-full transition duration-500 transform  p-1 text-white flex items-center justify-center ${
          isDark
            ? "translate-x-full bg-gray-700"
            : "bg-yellow-500 -translate-x-2"
        }`}
      >
        {icon}
      </div>
    </button>
  );
};

export default ToggleMode;

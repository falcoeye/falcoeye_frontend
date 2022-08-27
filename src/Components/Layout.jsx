import React, { useState } from "react";
import MobileNav from "./Menue/MobileNav";
import SideNave from "./Menue/SideNave";
import Header from "./Header";
import useDarkMode from "../hooks/useDarkMode";

const Layout = ({ children }) => {
  const [sideNavToggle, setSideNavToggle] = useState(false);
  const handleSideNav = () => {
    setSideNavToggle(!sideNavToggle);
  };

  const [colorTheme, setTheme] = useDarkMode();
  const isLight = colorTheme !== "dark";

  return (
    <>
      <div className="flex">
        <div
          className={`${
            sideNavToggle ? "w-[200px]" : "w-[70px]"
          } transition-all duration-500 md:block hidden `}
        >
          <SideNave toggle={handleSideNav} sideNav={sideNavToggle} />
        </div>
        <div className="flex flex-1 flex-col w-full ">
          <MobileNav
            isOpen={sideNavToggle}
            toggleDrawer={handleSideNav}
            colorTheme={colorTheme}
            setTheme={setTheme}
            isLight={isLight}
          />
          <Header
            colorTheme={colorTheme}
            setTheme={setTheme}
            isLight={isLight}
          />
          <div className="main-container mt-6 ">
            <div className="bg-white dark:bg-slate-800">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

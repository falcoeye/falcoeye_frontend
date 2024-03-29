import React, { useContext, useState } from "react";
import { useLayoutEffect } from "react";
import AuthContext from "../store/auth-context";
import Header from "./Header";
import MobileNav from "./Menue/MobileNav";
import SideNave from "./Menue/SideNave";

const Layout = ({ children }) => {
  const [sideNavToggle, setSideNavToggle] = useState(false);
  const handleSideNav = () => {
    setSideNavToggle(!sideNavToggle);
  };

  const { userData } = useContext(AuthContext);

  const calculateSetVh = ( ) => {
    const el = document.getElementById('layout')
    el.style.minHeight = window.innerHeight + 'px';
    // Calculate 1vh value in pixels
    // based on window inner height
    var vh = window.innerHeight * 0.01;
    // Set the CSS variable to the root element
    // Which is equal to 1vh
    document.documentElement.style.setProperty('--vh', vh + 'px');
}

useLayoutEffect( () => {
    calculateSetVh()
} , [])

useLayoutEffect( () => {
    // Re-calculate on resize
    window.addEventListener('resize', calculateSetVh);
    // Re-calculate on device orientation change
    window.addEventListener('orientationchange', calculateSetVh);
    return ( ) => {
        window.removeEventListener('resize', calculateSetVh);
        window.removeEventListener('orientationchange', calculateSetVh);
    }
} , [])

  return (
    <>
      <div className="flex" id='layout' >
        <div
          className={`${
            sideNavToggle ? "w-64" : "w-[4.5rem]"
          } transition-[width] duration-500 lg:block hidden `}
        >
          <SideNave toggleDrawer={handleSideNav} sideNav={sideNavToggle} />
        </div>
        <div className="flex flex-1 flex-col w-full ">
          <MobileNav
            isOpen={sideNavToggle}
            toggleDrawer={handleSideNav}
            userData={userData}
          />
          <Header userData={userData} toggleDrawer={handleSideNav} />
          <div className="main-container mt-6 pb-5">
            <div className="bg-white dark:bg-slate-800">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

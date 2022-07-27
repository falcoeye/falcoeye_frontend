import React, { useState } from "react";
import MobileNav from "./Menue/MobileNav";
import SideNave from "./Menue/SideNave";
import Searchbar from "./Searchbar";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const [sideNavToggle, setSideNavToggle] = useState(false);
  const handleSideNav = () => {
    setSideNavToggle(!sideNavToggle);
  };
  const { pathname } = useLocation();
  return (
    <>
      <div className={`flex`}>
        <div
          className={`${
            sideNavToggle ? "w-[200px]" : "w-[70px]"
          } transition-all duration-500 md:block hidden`}
        >
          <SideNave toggle={handleSideNav} sideNav={sideNavToggle} />
        </div>
        <div className="flex flex-1 flex-col w-full">
          <MobileNav isOpen={sideNavToggle} toggleDrawer={handleSideNav} />
          {searchPaths.includes(pathname) ? "" : <Searchbar />}
          <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover={false}
                progress={undefined}
                draggable={false}
            />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;

const searchPaths = ["/analysis-jobs"];

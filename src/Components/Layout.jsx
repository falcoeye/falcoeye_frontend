import React, { useState } from "react";
import MobileNav from "./Menue/MobileNav";
import SideNave from "./Menue/SideNave";
import { ToastContainer } from "react-toastify";
import Header from "./Header";

const Layout = ({ children }) => {
  const [sideNavToggle, setSideNavToggle] = useState(false);
  const handleSideNav = () => {
    setSideNavToggle(!sideNavToggle);
  }
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
          <Header />
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


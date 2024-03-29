import React from "react";
import { AiFillAppstore, AiFillCamera, AiFillRobot } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCameraLensFill } from "react-icons/ri";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link, NavLink } from "react-router-dom";
import logoSrc from "../../images/logo.png";
import DropDown from "../DropDown/DropDown";
import { LoadingSkelton } from "../Header";
import ToggleMode from "../UI/ToggleMode/ToggleMode";

const navLinks = [
  { id: 1, text: "dashboard", icon: <AiFillAppstore />, path: "/" },
  { id: 5, text: "Analysis", icon: <FaBriefcase />, path: "/analysis" },
  { id: 2, text: "sources", icon: <AiFillCamera />, path: "/sources" },
  { id: 3, text: "media", icon: <RiCameraLensFill />, path: "/media" },
  { id: 4, text: "workflows", icon: <AiFillRobot />, path: "/workflows" },
];

const MobileNav = ({ isOpen, toggleDrawer, userData }) => {
  let firstUserNameLetter;
  if (userData) {
    firstUserNameLetter = userData.name?.slice(0, 1).toUpperCase();
  }

  return (
    <div className="w-full lg:hidden bg-white dark:bg-slate-800 min-h-[70px] flex items-center">
      <div className="main-container flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <button
            onClick={toggleDrawer}
            className="text-primary text-xl dark:text-white"
          >
            <GiHamburgerMenu />
          </button>
          <NavLink to={`/`}>
            <img
              className="w-12"
              src={logoSrc}
              alt="logo"
              style={{ transform: "rotateY(180deg)" }}
            />
          </NavLink>
        </div>
        <div>
          <div className="flex gap-x-5 items-center">
            <ToggleMode />
            {firstUserNameLetter ? (
              <div className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center font-bold text-lg">
                {firstUserNameLetter}
              </div>
            ) : (
              <LoadingSkelton />
            )}

            <DropDown userData={userData} />
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="py-8 !bg-white dark:!bg-gray-700 flex flex-col justify-between"
      >
        <div>
          <div className="px-5">
            <Link to={`/`} className="w-full ">
              <img src={logoSrc} className="w-16" alt="logo" />
            </Link>
          </div>
          <ul className="flex flex-col gap-y-4  pr-4 mt-4 py-4 px-5 overflow-hidden">
            {navLinks.map(({ id, icon, path, text }) => {
              return (
                <li key={id}>
                  <NavLink
                    to={path}
                    className={(navData) =>
                      navData.isActive
                        ? "px-3.5 flex  items-center gap-3.5 font-medium py-2 bg-primary rounded-md text-white "
                        : "px-3.5 flex  items-center gap-3.5 font-medium py-2 duration-300 rounded-md text-primary"
                    }
                    end
                  >
                    <span className="min-w-max">{icon}</span>
                    <span className="capitalize text-sm min-w-max">{text}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {process.env.REACT_APP_VERSION && (
          <p className=" text-center text-gray-400 text-base font-semibold">
            {`${process.env.REACT_APP_VERSION}`}
          </p>
        )}
      </Drawer>
    </div>
  );
};

export default MobileNav;

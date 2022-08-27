import React from "react";
import { AiFillAppstore, AiFillCamera, AiFillRobot } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCameraLensFill } from "react-icons/ri";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link, useLocation } from "react-router-dom";
import logoSrc from "../../images/logo.png";
import DropDown from "../DropDown/DropDown";
import { LoadingSkelton } from "../Header";
import ToggleMode from "../UI/ToggleMode/ToggleMode";

const navLinks = [
  { id: 1, text: "dashboard", icon: <AiFillAppstore />, path: "/" },
  { id: 2, text: "sources", icon: <AiFillCamera />, path: "/sources" },
  { id: 3, text: "media", icon: <RiCameraLensFill />, path: "/media" },
  { id: 4, text: "workflows", icon: <AiFillRobot />, path: "/workflows" },
  {
    id: 5,
    text: "Analysis",
    icon: <BiSearchAlt />,
    path: "/analysis",
  },
];

const MobileNav = ({ isOpen, toggleDrawer, isLight, colorTheme, setTheme }) => {
  const { pathname } = useLocation();

  const userData = JSON.parse(localStorage.getItem("user"));
  let firstUserNameLetter;

  if (userData) {
    firstUserNameLetter = userData.name?.slice(0, 1).toUpperCase();
  }

  return (
    <div className="w-full md:hidden bg-white dark:bg-slate-800 min-h-[70px] flex items-center">
      <div className="main-container flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <button
            onClick={toggleDrawer}
            className="text-primary text-xl dark:text-white"
          >
            <GiHamburgerMenu />
          </button>
          <img className="w-12" src={logoSrc} alt="logo" />
        </div>
        <div>
          <div className="flex gap-x-5 items-center">
            <ToggleMode
              isLight={isLight}
              colorTheme={colorTheme}
              setTheme={setTheme}
            />
            {firstUserNameLetter ? (
              <div className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center font-bold text-lg">
                {firstUserNameLetter}
              </div>
            ) : (
              <LoadingSkelton />
            )}

            <DropDown />
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="py-8 !bg-white dark:!bg-gray-700"
      >
        <div className="px-5">
          <Link to={`/`} className="w-full ">
            <img src={logoSrc} className="w-16" alt="logo" />
          </Link>
        </div>
        <ul className="flex flex-col gap-y-1  pr-4 mt-4 py-4 overflow-hidden">
          {navLinks.map(({ id, icon, path, text }) => {
            return (
              <li key={id}>
                <Link to={path}>
                  <span
                    className={`${
                      pathname === path
                        ? "bg-primary text-white curve"
                        : "bg-white dark:bg-gray-800 text-primary"
                    } flex text-xl items-center gap-x-8   relative  w-full rounded-r-full  h-[45px]  px-6`}
                  >
                    <span className="min-w-max">{icon}</span>
                    <span className="capitalize text-sm min-w-max">{text}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Drawer>
    </div>
  );
};

export default MobileNav;

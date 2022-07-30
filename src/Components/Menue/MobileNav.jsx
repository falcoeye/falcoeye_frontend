import React from "react";
import { Link } from "react-router-dom";
import { AiFillAppstore, AiFillCamera, AiFillRobot } from "react-icons/ai";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { RiCameraLensFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import logoSrc from "../../images/logo.png";
import { IoSettings } from "react-icons/io5";
import { LoadingSkelton } from "../Searchbar";
import DropDown from "../DropDown/DropDown";
import ToggleMode from "../UI/ToggleMode/ToggleMode";

const navLinks = [
  { id: 1, text: "dashboard", icon: <AiFillAppstore />, path: "/" },
  { id: 2, text: "sources", icon: <AiFillCamera />, path: "/sources" },
  { id: 3, text: "studio", icon: <RiCameraLensFill />, path: "/VideoImages" },
  { id: 4, text: "workflows", icon: <AiFillRobot />, path: "/workflows" },
  {
    id: 5,
    text: "jobs",
    icon: <BiSearchAlt />,
    path: "/analysis jobs",
  },
  { id: 6, text: "Settings", icon: <IoSettings />, path: "/settings" },
];

const MobileNav = ({ isOpen, toggleDrawer }) => {
  const { pathname } = useLocation();

  const userData = JSON.parse(localStorage.getItem("user"));
  let firstUserNameLetter;

  if (userData) {
    firstUserNameLetter = userData.name.slice(0, 1).toUpperCase();
  }

  return (
    <div className="w-full md:hidden bg-white min-h-[70px] flex items-center">
      <div className="main-container flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <button onClick={toggleDrawer} className="text-primary text-xl">
            <GiHamburgerMenu />
          </button>
          <img className="w-12" src={logoSrc} alt="logo" />
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

            <DropDown />
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="py-8"
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
                        : "bg-white text-primary"
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

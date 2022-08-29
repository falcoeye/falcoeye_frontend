import React from "react";
import {
  AiFillAppstore,
  AiFillCamera,
  AiFillRobot,
  AiOutlineBackward,
  AiOutlineForward,
} from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import { RiCameraLensFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import logoSrc from "../../images/logo.png";

const navLinks = [
  { id: 1, text: "dashboard", icon: <AiFillAppstore size={20} />, path: "/" },
  {
    id: 2,
    text: "Sources",
    icon: <AiFillCamera size={20} />,
    path: "/sources",
  },
  {
    id: 3,
    text: "Media",
    icon: <RiCameraLensFill size={20} />,
    path: "/media",
  },
  {
    id: 4,
    text: "Workflows",
    icon: <AiFillRobot size={20} />,
    path: "/workflows",
  },
  {
    id: 5,
    text: "Analysis",
    icon: <FaBriefcase size={20} />,
    path: "/analysis",
  },
];

const SideNav = ({ sideNav, toggleDrawer }) => {
  return (
    <div className="w-full md:block hidden relative">
      <div
        className={`${
          sideNav ? "w-64" : "w-[4.5rem]"
        } h-screen fixed top-0 left-0  py-5 bg-white dark:bg-slate-800 flex flex-col justify-between  transition-[width] duration-500`}
      >
        <div>
          <div className="pl-px">
            <NavLink to={`/`}>
              <img src={logoSrc} alt="logo" className="w-[70px]" style={{ transform: 'rotateY(180deg)' }} />
            </NavLink>
          </div>

          <div className="px-3">
            <ul className="mt-4 flex flex-col gap-4 relative">
              {navLinks.map((link, i) => (
                <li key={link.id}>
                  <NavLink
                    to={link.path}
                    className={(navData) =>
                      navData.isActive
                        ? "px-3.5 flex  items-center text-sm gap-3.5 font-medium py-2 bg-primary rounded-md text-white "
                        : "px-3.5 flex  items-center text-sm gap-3.5 font-medium py-2 duration-300 hover:bg-primary rounded-md hover:text-white text-primary"
                    }
                  >
                    <div>{link.icon}</div>
                    <h2
                      className={`whitespace-pre transition-opacity duration-300 ${
                        !sideNav && "opacity-0 overflow-hidden"
                      }`}
                    >
                      {link.text}
                    </h2>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="py-3 flex justify-center">
              {sideNav ? (
                <AiOutlineBackward
                  size={26}
                  className="cursor-pointer text-primary mt-5"
                  onClick={toggleDrawer}
                />
              ) : (
                <AiOutlineForward
                  size={26}
                  className="cursor-pointer text-primary mt-5"
                  onClick={toggleDrawer}
                />
              )}
            </div>
          </div>
        </div>
        {process.env.REACT_APP_VERSION && (
          <span className=" text-center text-gray-400 text-base font-semibold">
            {`${process.env.REACT_APP_VERSION}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default SideNav;

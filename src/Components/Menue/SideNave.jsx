import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillAppstore,
  AiFillCamera,
  AiFillRobot,
  AiOutlineBackward,
  AiOutlineForward
} from "react-icons/ai";
import { RiCameraLensFill } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const SideNave = ({ sideNav, toggle }) => {
  const { pathname } = useLocation();
  return (
    <div className="w-full md:block hidden relative">
      <div
        className={`${
          sideNav ? "w-[200px]" : "w-[70px]"
        } h-screen fixed top-0 left-0  py-5 bg-white flex flex-col transition-all duration-500 `}
      >
        <Link to={`/`} className="w-full ">
          <img src="" alt="logo" />
        </Link>
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
        <button onClick={toggle} className="text-primary text-xl mx-auto mt-8">
          {sideNav ? <AiOutlineBackward /> : <AiOutlineForward />}
        </button>
      </div>
    </div>
  );
};

export default SideNave;

const navLinks = [
  { id: 1, text: "dashboard", icon: <AiFillAppstore />, path: "/" },
  { id: 2, text: "camera", icon: <AiFillCamera />, path: "/camera" },
  { id: 3, text: "studio", icon: <RiCameraLensFill />, path: "/VideoImages" },
  { id: 4, text: "ai store", icon: <AiFillRobot />, path: "/ai-store" },
  {
    id: 5,
    text: "jobs",
    icon: <BiSearchAlt />,
    path: "/all-analysis"
  }
];

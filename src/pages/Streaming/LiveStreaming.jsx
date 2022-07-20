import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiSettings, FiCamera } from "react-icons/fi";
import { BsClock, BsCameraVideo } from "react-icons/bs";
import {
  IoMdArrowDropleft,
  IoMdArrowDropright,
  IoMdArrowDropup,
  IoMdArrowDropdown,
} from "react-icons/io";
import Info from "./Info";
import Setting from "./Setting";
function LiveStreaming(props) {
  const [show, setShow] = useState("Settings");
  const handleClick = (kuch) => {
    setShow(kuch);
  };
  console.log("show"+  props.camera);
  return (
    <div>
      <div className="main-container ">
        <div className="bg-white mx-1 pb-9">
          <div className="flex md:justify-between  md:flex-row flex-col justify-center">
            <div>
              <h1 className="text-gray-900 text-lg px-8 md:pt-0 pt-5 md:pb-0 pb-4">
                Live Streaming
              </h1>
              <hr className=" md:border-0 border-b-[0.5] border-gray-300 mx-6"></hr>
            </div>
            <div className="flex gap-4 md:pl-0 md:pt-0 pt-5 pl-5">
              <button onClick={() => handleClick("Information")}>
                <div
                  className={`${
                    show === "Information" ? " text-primary" : "text-gray-900"
                  }  cursor-pointer  p-3  flex gap-1 items-center   hover:text-primary px-2 py-[6px] rounded-2xl`}
                >
                  <AiOutlineInfoCircle />
                  <span className="text-sm">Camera Information</span>
                </div>
              </button>
              <button onClick={() => handleClick("Settings")}>
                <div
                  className={`${
                    show === "Settings" ? " text-primary" : "text-gray-900"
                  }  cursor-pointer  p-3  flex gap-1 items-center   hover:text-primary px-2 py-[6px] rounded-2xl`}
                >
                  <FiSettings className="font-extralight" />
                  <span className="text-sm">Setting</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4  gap-4  grid-cols-1 bg-white mx-1">
          <div className="relative lg:col-span-3 md:mb-0 mb-7 ">
            <div class="video video-4">
              <iframe
                title="title"
                src={ props.camera && props.camera.url}
                frameborder="0"
                className="rounded-t-lg rounded-l-lg w-full mx-auto max-w-[830px] min-h-[500px]"
                allowfullscreen
              />
            </div>
            <div className="absolute px-5 bg-black bg-opacity-70 py-7 z-10 text-white w-full max-w-[830px] mx-auto right-0 left-0 md:top-[405px] sm:top-[365px] top-[297px] rounded-lg">
              <div className="flex sm:justify-between justify-center sm:flex-row flex-col-reverse items-center  gap-7">
                <div className="md:flex hidden gap-3">
                  <a
                    href="/"
                    className="flex bg-primary items-center  px-4 gap-1 py-1 rounded-3xl"
                  >
                    {" "}
                    <IoMdArrowDropleft />
                    <span>Right</span>
                    <IoMdArrowDropright />
                  </a>
                  <a
                    href="/"
                    className="flex bg-green items-center  px-4 gap-1 py-1 rounded-3xl"
                  >
                    <IoMdArrowDropup />
                    <span>Down</span>
                    <IoMdArrowDropdown />
                  </a>
                </div>
                <div className="md:hidden block gap-3">
                  <a
                    href="/"
                    className="flex  justify-center items-center  px-4 gap-1 py-1 rounded-3xl"
                  >
                    {" "}
                    <div className="border-2 border-white rounded-sm p-[2px] text-2xl">
                      <IoMdArrowDropup />
                    </div>
                  </a>
                  <a
                    href="/"
                    className="flex  items-center  px-4 gap-1 py-1 rounded-3xl"
                  >
                    <div className="border-2 border-white rounded-sm p-[2px] text-2xl">
                      <IoMdArrowDropleft />
                    </div>
                    <div className="border-2 border-white rounded-sm p-[2px] text-2xl">
                      <IoMdArrowDropdown />
                    </div>
                    <div className="border-2 border-white rounded-sm p-[2px] text-2xl">
                      <IoMdArrowDropright />
                    </div>
                  </a>
                </div>
                <div>
                  <div className="flex gap-5">
                    <div className="bg-primary p-3 rounded-full">
                      <BsClock />
                    </div>
                    <div className="bg-primary p-3 rounded-full">
                      <BsCameraVideo />
                    </div>
                    <div className="bg-primary p-3 rounded-full">
                      <FiCamera />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            {show === "Information" && <Info />}
            {show === "Settings" && <Setting />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveStreaming;

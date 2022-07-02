import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import AutoComplete from "./AutoComplete";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaVideo, FaCamera } from "react-icons/fa";

function FilterBar({ setSort, sort }) {
  return (
    <div className="bg-white mx-6 mt-5 rounded-t-lg">
      <div className="  main-container md:pt-9 pt-4 pb-3">
        <div className="  flex justify-between items-center mb-3">
          <div>
            <h1 className="text-gray-900 text-lg">Videos & Images</h1>
          </div>
          <div className="md:block hidden">
            <div className="flex md:mt-0 mt-2 md:pt-0 pt-2 pb-2 bg-white  gap-2 md:w-auto items-center w-full justify-end md:order-none order-last ">
              <div
                onClick={() => setSort("grid")}
                className={`${
                  sort === "grid"
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } rounded-full cursor-pointer   hover:bg-primary p-3 hover:text-white`}
              >
                <BsFillGrid3X2GapFill className="  " />
              </div>
              <div
                onClick={() => setSort("list")}
                className={`${
                  sort === "list"
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } rounded-full cursor-pointer   hover:bg-primary p-3 hover:text-white`}
              >
                <AiOutlineUnorderedList className=" " />
              </div>
            </div>
          </div>
          <div className="md:hidden flex  gap-5 ">
            <a
              href="/"
              className="bg-primary text-white text-sm py-2  flex justify-center items-center md:px-4 px-3 md:rounded-3xl rounded-full"
            >
              <FaCamera className="md:hidden block" />
            </a>
            <a
              href="/"
              className="bg-green text-white text-sm md:py-2 py-3 flex justify-center items-center  md:px-4 px-3 md:rounded-3xl rounded-full"
            >
              <FaVideo className="md:hidden block" />
            </a>
          </div>
        </div>
        <div className=" mx-3">
          <div className=" bg-backgroundLight flex items-center md:px-4 pt-2 rounded-md">
            <div className="flex  flex-wrap md:gap-4 justify-between md:flex-row flex-col w-full">
              <div className="flex items-center gap-2 md:flex-row flex-col justify-between  md:order-none order-last">
                <div className="md:px-0 px-4 w-full">
                  <div className=" md:w-auto  w-full md:mt-0 mt-2 mb-2 py-1  flex items-center px-4 rounded-full   bg-white md:max-w-[270px] max-w-full  ">
                    <span className="text-primary text-xl mr-4 ">
                      <AiOutlineSearch />
                    </span>
                    <AutoComplete
                      data={suggestions}
                      placeholder={`Type into search ...`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-nowrap flex-wrap gap-4 md:flex-row flex-col items-center mb-2 md:px-0 px-4">
                <div className="flex items-center md:max-w-sm w-full  bg-white  px-3 rounded-md ">
                  <span
                    htmlFor="location"
                    className="block text-sm font-medium text-primary whitespace-nowrap"
                  >
                    Sort by:
                  </span>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block bg-white  w-full pl-1 py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
                  >
                    <option>Durations</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
                <div className="flex items-center md:max-w-sm w-full   bg-white  px-3 rounded-md">
                  <span
                    htmlFor="location"
                    className="block text-sm font-medium text-primary whitespace-nowrap"
                  >
                    Sort by:
                  </span>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block bg-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
                  >
                    <option>Videos</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
                <div className="flex items-center md:max-w-sm w-full   bg-white  px-3 rounded-md">
                  <span
                    htmlFor="location"
                    className="block text-sm font-medium text-primary whitespace-nowrap"
                  >
                    Sort by:
                  </span>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block bg-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
                  >
                    <option>Date</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
                <div className="flex items-center md:max-w-md w-full   bg-white  px-3 rounded-md">
                  <span
                    htmlFor="location"
                    className="block text-sm font-medium text-primary whitespace-nowrap"
                  >
                    Sort by:
                  </span>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block bg-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
                  >
                    <option>A-Z</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden block">
          <div className="flex md:mt-0 mt-2 md:pt-0 pt-2 pb-2 bg-white  gap-2 md:w-auto items-center w-full justify-end md:order-none order-last ">
            <div
              onClick={() => setSort("grid")}
              className={`${
                sort === "grid"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } rounded-full cursor-pointer   hover:bg-primary p-3 hover:text-white`}
            >
              <BsFillGrid3X2GapFill className="  " />
            </div>
            <div
              onClick={() => setSort("list")}
              className={`${
                sort === "list"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } rounded-full cursor-pointer   hover:bg-primary p-3 hover:text-white`}
            >
              <AiOutlineUnorderedList className=" " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
const suggestions = ["aaa", "sasdf", "askdf"];

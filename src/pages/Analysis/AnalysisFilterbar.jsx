import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const AnalysisFilterbar = ({
  onSearchInputChange,
  searchInput,
  onAnalysisStatusChange,
  alanysisStatus,
}) => {
  return (
    <div className=" bg-backgroundLight dark:bg-slate-700 flex items-center md:px-4 pt-2 rounded-md">
      <div className="flex  md:gap-4 justify-between md:flex-row flex-col w-full">
        <div className="flex items-center gap-2 md:flex-row flex-col justify-between  md:order-none order-last">
          <div className="md:px-0 px-4 w-full">
            <div className="md:w-auto  w-full md:mt-0 mt-2 mb-2 py-1  flex items-center px-4 rounded-full  dark:bg-gray-700  bg-white md:max-w-[270px] max-w-full  ">
              <span className="text-primary text-xl mr-4 dark:text-white ">
                <AiOutlineSearch />
              </span>
              <div className="w-full relative">
                <input
                  className="focus:outline-none text-primary placeholder-primary dark:text-white dark:placeholder-white text-sm bg-transparent w-full"
                  type="text"
                  placeholder="Type Into Search ..."
                  onChange={onSearchInputChange}
                  value={searchInput}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex gap-4 md:flex-row flex-col items-center justify-end mb-2 md:px-0 px-4">
          <div className="flex items-center md:max-w-[12rem] w-full  bg-white dark:bg-gray-700  px-3 rounded-md">
            <span
              htmlFor="location"
              className="block text-sm font-medium text-primary whitespace-nowrap"
            >
              Sort by:
            </span>
            <select
              id="location"
              name="location"
              className="block bg-white dark:bg-gray-700 dark:text-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
              onChange={onAnalysisStatusChange}
              value={alanysisStatus}
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="old">Old</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisFilterbar;

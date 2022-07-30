import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import AutoComplete from "../../Components/AutoComplete";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";

function FilterBar({ setSort, sort }) {
  return (
    <div className="main-container ">
      <div className="bg-white px-7 mx-1">
        <div className=" bg-backgroundLight flex items-center md:px-4 pt-2 rounded-md">
          <div className="flex  gap-2 md:flex-row flex-col w-full">
            <div className="flex items-center gap-2 md:flex-row flex-col justify-between flex-[2] md:order-none order-last">
              <div className="md:px-0 flex-1 px-4 w-full">
                <div className=" w-full md:mt-0 mt-2 mb-2 py-1  flex items-center px-4 rounded-full   bg-white md:max-w-[320px] max-w-full  ">
                  <span className="text-primary text-xl mr-4 ">
                    <AiOutlineSearch />
                  </span>
                  <AutoComplete
                    data={suggestions}
                    placeholder={`Type into search ...`}
                  />
                </div>
              </div>
              <div className="flex flex-1  md:mt-0 mt-2 md:pt-0 pt-2 pb-2 md:bg-backgroundLight bg-white  gap-2 md:w-auto items-center w-full justify-end md:order-none order-last ">
                <div
                  onClick={() => setSort("grid")}
                  className={`${
                    sort === "grid"
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } rounded-full cursor-pointer hover:bg-primary p-3 hover:text-white`}
                >
                  <BsFillGrid3X2GapFill className="  " />
                </div>
                <div
                  onClick={() => setSort("list")}
                  className={`${
                    sort === "list"
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } rounded-full cursor-pointer hover:bg-primary p-3 hover:text-white`}
                >
                  <AiOutlineUnorderedList className=" " />
                </div>
              </div>
            </div>
            <div className="flex flex-1 w-full gap-4 md:flex-row flex-col items-center mb-2 md:px-0 px-4">
              <div className="flex min-w-max items-center w-full flex-1 md:max-w-sm bg-white px-3 rounded-md">
                <span
                  htmlFor="location"
                  className="block text-sm font-medium text-primary whitespace-nowrap"
                >
                  Sort by:
                </span>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block  bg-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
                >
                  <option>Model Name</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
              <div className="flex flex-1 w-full items-center min-w-max bg-white px-3 rounded-md">
                <span
                  htmlFor="location"
                  className="block text-sm font-medium text-primary whitespace-nowrap"
                >
                  Sort by:
                </span>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block bg-white  w-full py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
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
    </div>
  );
}

export default FilterBar;
const suggestions = ["aaa", "sasdf", "askdf"];

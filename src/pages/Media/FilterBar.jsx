import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const FilterBar = ({
  term,
  termHandler,
  type,
  typeHandler,
  date,
  dateHandler,
  order,
  orderHandler,
}) => {
  return (
    <div className=" bg-backgroundLight dark:bg-slate-700 flex items-center md:px-4 pt-2 rounded-md">
      <div className="flex  md:gap-4 justify-between md:flex-row flex-col w-full">
        <div className="flex items-center gap-2 md:flex-row flex-col justify-between  md:order-none order-last">
          <div className="md:px-0 px-4 w-full">
            <div className=" md:w-auto  w-full md:mt-0 mt-2 mb-2 py-1  flex items-center px-4 rounded-full   bg-white dark:bg-slate-800  dark:text-white md:max-w-[270px] max-w-full  ">
              <span className="text-primary text-xl mr-4 dark:text-white">
                <AiOutlineSearch />
              </span>
              <div className="w-full relative">
                <input
                  className="focus:outline-none text-primary dark:text-white placeholder-primary dark:placeholder-white text-sm bg-transparent w-full"
                  type="text"
                  value={term}
                  onChange={termHandler}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 md:flex-row flex-col items-center mb-2 md:px-0 px-4 w-full md:max-w-md">
          <div className="flex items-center md:max-w-lg w-full   bg-white dark:bg-slate-800   px-3 rounded-md">
            <span
              htmlFor="type"
              className="block text-sm font-medium text-primary whitespace-nowrap "
            >
              Sort by:
            </span>
            <select
              id="type"
              name="type"
              className="cursor-pointer block bg-white dark:bg-slate-800  dark:text-white w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
              onChange={typeHandler}
              value={type}
            >
              <option value="all">All</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="flex items-center md:max-w-lg w-full bg-white dark:bg-slate-800   px-3 rounded-md">
            <span
              htmlFor="date"
              className="block text-sm font-medium text-primary whitespace-nowrap "
            >
              Sort by:
            </span>
            <select
              id="date"
              name="date"
              className="cursor-pointer block bg-white dark:bg-slate-800  dark:text-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
              onChange={dateHandler}
              value={date}
            >
              <option disabled value="">
                Choose Order
              </option>
              <option value="oldest">Oldest</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          <div className="flex items-center md:max-w-lg w-full bg-white dark:bg-slate-800   px-3 rounded-md">
            <span
              htmlFor="order"
              className="block text-sm font-medium text-primary whitespace-nowrap "
            >
              Sort by:
            </span>
            <select
              id="order"
              name="order"
              className="cursor-pointer block bg-white dark:bg-slate-800  dark:text-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
              onChange={orderHandler}
              value={order}
            >
              <option disabled value="">
                Choose Order
              </option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

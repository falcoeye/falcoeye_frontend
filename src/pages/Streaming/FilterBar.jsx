import React from "react";

function FilterBar({ setSort, sort }) {
  return (
    <div className="bg-white mx-6 mt-5 rounded-t-lg">
      <div className="  main-container md:pt-9 pt-4 pb-3">
        <div className="  flex justify-between items-center mb-3">
          <div className="">
            
            <h1 className="text-gray-900 text-lg">Sreaming</h1>
          </div>
        </div>
        <div className=" mx-3">
          <div className=" bg-backgroundLight flex items-center md:px-4 pt-2 rounded-md">
            <div className="">
              <div className="flex gap-4 md:flex-row flex-col items-center mb-2 md:px-0 px-4">
                <div className="flex items-center md:max-w-md w-full  bg-white  px-3 rounded-md ">
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
                    <option>Selected Camera Name</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;

import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import {
  BiSliderAlt,
  BiArrowFromRight,
  BiCalendar,
  BiTimeFive,
} from "react-icons/bi";
import { Checkbox } from "antd";
import ExpandCollapse from "../../ExpandCollapse";
import { GrLocation } from "react-icons/gr";
import { BsDisplay } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import { FiRotateCw } from "react-icons/fi";

const initialvalue = {};

const SideFilterBar = ({ sideNav, toggle, isModal }) => {
  const [filters, setFilters] = useState([]);
  console.log(filters, "filters");

  const handleInputChange = (e) => {
    //const name = e.target.name
    const val = e.target.value;
    // const { name, value } = e.target;

    setFilters(...filters, { val: val });
  };
  return (
    <div className="w-full min-w-[280px] relative ">
      <div
        className={`${
          sideNav ? "" : ""
        } py-5 bg-white flex flex-col transition-all duration-500`}
      >
        <div className="w-full">
          <div className="flex justify-between px-4 gap-2 items-center min-w-max">
            <button onClick={toggle} className="flex items-center gap-1">
              <BiSliderAlt />
              filters
            </button>
            {!isModal && (
              <button onClick={toggle} className="text-primary text-xl ">
                {sideNav ? <BiArrowFromRight /> : <BiArrowFromRight />}
              </button>
            )}
          </div>
          {sideNav && (
            <div className="min-w-max overflow-hidden px-4 mt-5 ">
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-black text-sm">Applied Filters</h3>
                  <button className="text-black text-xs flex items-center gap-2">
                    Clear all <strong>x</strong>
                  </button>
                </div>

                <div className="mt-5 flex flex-col gap-y-4">
                  <ExpandCollapse
                    icon={<AiOutlineCamera />}
                    title={`Camera`}
                    expand={`max-h-[180px]`}
                    collaplse={`max-h-[0px]`}
                  >
                    <ul className="flex flex-col mt-4 gap-x-4 gap-y-2">
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox
                          onChange={handleInputChange}
                          value={`dslr 200`}
                          name={`camera`}
                        />
                        <p className="text-gray-500">dSRL 002</p>
                      </li>
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox
                          onChange={handleInputChange}
                          value={`dslr 300`}
                          name={`camera`}
                        />
                        <p className="text-gray-500">dSRL 002</p>
                      </li>
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox
                          onChange={handleInputChange}
                          value={`dslr 400`}
                          name={`camera`}
                        />
                        <p className="text-gray-500">dSRL 002</p>
                      </li>
                    </ul>
                  </ExpandCollapse>

                  <ExpandCollapse
                    icon={<GrLocation />}
                    title={`Location`}
                    expand={`max-h-[180px]`}
                    collaplse={`max-h-[0px]`}
                  >
                    <ul className="flex flex-col mt-4 gap-x-4 gap-y-2">
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox
                          onChange={handleInputChange}
                          value={`saudia`}
                          name={`location`}
                        />
                        <p className="text-gray-500 capitalize">
                          saudia arabia
                        </p>
                      </li>
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox
                          onChange={handleInputChange}
                          value={`pakistan`}
                          name={`location`}
                        />
                        <p className="text-gray-500 capitalize">pakistan</p>
                      </li>
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox
                          onChange={handleInputChange}
                          value={`name`}
                          name={`location`}
                        />
                        <p className="text-gray-500 capitalize">iran</p>
                      </li>
                    </ul>
                  </ExpandCollapse>

                  <ExpandCollapse
                    icon={<BsDisplay />}
                    title={`Display`}
                    expand={`max-h-[180px]`}
                    collaplse={`max-h-[0px]`}
                  >
                    <form className="flex flex-col mt-4 gap-x-4 gap-y-2">
                      <li className="flex items-center gap-4 text-xs">
                        <input
                          onChange={handleInputChange}
                          name="sortby"
                          type={`radio`}
                          value={`list`}
                        />
                        <p className="text-black capitalize">list</p>
                      </li>

                      <li className="flex items-center gap-4 text-xs">
                        <input
                          onChange={handleInputChange}
                          name="sortby"
                          type={`radio`}
                          value={`grid`}
                        />
                        <p className="text-black capitalize">view</p>
                      </li>
                    </form>
                  </ExpandCollapse>

                  <ExpandCollapse
                    icon={<BiCalendar />}
                    title={`Published Date`}
                    expand={`max-h-[180px]`}
                    collaplse={`max-h-[0px]`}
                  >
                    <form className="flex flex-col mt-4 gap-x-4 gap-y-2">
                      <li className="flex items-center gap-4 text-xs">
                        <input
                          onChange={handleInputChange}
                          name="date"
                          type={`radio`}
                          value={`list`}
                        />
                        <p className="text-black capitalize">last 3 months</p>
                      </li>
                      <li className="flex items-center gap-4 text-xs">
                        <input
                          onChange={handleInputChange}
                          name="date"
                          type={`radio`}
                          value={`grid`}
                        />
                        <p className="text-black capitalize">last 6 months</p>
                      </li>
                    </form>
                  </ExpandCollapse>

                  <ExpandCollapse
                    icon={<BiTimeFive />}
                    title={`Durations`}
                    expand={`max-h-[180px]`}
                    collaplse={`max-h-[0px]`}
                  >
                    <div className="flex flex-col gap-2 mt-2">
                      <h3 className="text-sm">select Time Frame</h3>
                      <input type={`range`} min={1} max={5}></input>
                      <div className="flex justify-between text-sm">
                        <div className="px-1 text-gray-500">|</div>
                        <div className="px-1 text-gray-500">|</div>
                        <div className="px-1 text-gray-500">|</div>
                        <div className="px-1 text-gray-500">|</div>
                        <div className="px-1 text-gray-500">|</div>
                      </div>
                    </div>
                  </ExpandCollapse>

                  <ExpandCollapse
                    icon={<FaRobot />}
                    title={`Ai Model`}
                    expand={`max-h-[180px]`}
                    collaplse={`max-h-[0px]`}
                  >
                    <form className="flex flex-col mt-4 gap-x-4 gap-y-2">
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox
                          onChange={handleInputChange}
                          value={`name 1`}
                          name={`ai modal`}
                        />
                        <p className="text-black capitalize">name 1</p>
                      </li>
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox
                          onChange={handleInputChange}
                          value={`name 2`}
                          name={`ai modal`}
                        />
                        <p className="text-black capitalize">nam 2</p>
                      </li>
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox
                          onChange={handleInputChange}
                          value={`name 3`}
                          name={`ai modal`}
                        />
                        <p className="text-black capitalize">nam 3</p>
                      </li>
                    </form>
                  </ExpandCollapse>

                  <ExpandCollapse
                    icon={<FiRotateCw />}
                    title={`Orientation`}
                    expand={`max-h-[180px]`}
                    collaplse={`max-h-[0px]`}
                  >
                    <form className="flex flex-col mt-4 gap-x-4 gap-y-2">
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox value={`horizental`} name={`orientation`} />
                        <p className="text-black capitalize">horizantal</p>
                      </li>
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox value={`vertical`} name={`orientation`} />
                        <p className="text-black capitalize">vertical</p>
                      </li>
                      <li className="flex items-center gap-4 text-xs">
                        <Checkbox value={`square`} name={`orientation`} />
                        <p className="text-black capitalize">square</p>
                      </li>
                    </form>
                  </ExpandCollapse>
                </div>
              </div>
              {isModal && (
                <div className="flex items-center gap-4 w-full h-[30px] rounded-lg justify-center mt-4 text-sm font-medium text-white bg-emerald-500">
                  Apply
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideFilterBar;

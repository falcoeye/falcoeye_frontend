import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AutoComplete from "../../Components/AutoComplete";
import { workflowsActions } from "../../store/workflows";
const WorkflowsFilterBar = () => {
  const selectOrder = useSelector((state) => state.workflows.selectOrder);
  const dispatch = useDispatch();

  console.log(selectOrder);

  const selectOrderHandler = (e) => {
    dispatch(workflowsActions.OrderingData(e.target.value));
  };

  return (
    <div className=" bg-backgroundLight flex items-center md:px-4 pt-2 rounded-md">
      <div className="flex  md:gap-4 justify-between md:flex-row flex-col w-full">
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
        <div className="flex gap-4 md:flex-row flex-col items-center mb-2 md:px-0 px-4 w-full max-w-md">
          {/* <div className="flex items-center md:max-w-sm w-full   bg-white  px-3 rounded-md">
            <span
              htmlFor="location"
              className="block text-sm font-medium text-primary whitespace-nowrap"
            >
              Sort by:
            </span>
            <select
              id="location"
              name="location"
              className="cursor-pointer block bg-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
            >
              <option>Videos</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div> */}
          <div className="flex items-center md:max-w-lg w-full   bg-white  px-3 rounded-md">
            <span
              htmlFor="location"
              className="block text-sm font-medium text-primary whitespace-nowrap"
            >
              Sort by:
            </span>
            <select
              id="location"
              name="location"
              className="cursor-pointer block bg-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
              defaultValue=""
            >
              <option disabled value="">
                Choose Type
              </option>
              <option>Date</option>
              <option>Title</option>
              <option>Creator</option>
            </select>
          </div>
          <div className="flex items-center md:max-w-lg w-full bg-white  px-3 rounded-md">
            <span
              htmlFor="location"
              className="block text-sm font-medium text-primary whitespace-nowrap"
            >
              Sort by:
            </span>
            <select
              id="location"
              name="location"
              className="cursor-pointer block bg-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
              onChange={selectOrderHandler}
              defaultValue=""
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

export default WorkflowsFilterBar;

const suggestions = ["bla bla", "baby"];

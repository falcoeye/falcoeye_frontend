import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { workflowsActions } from "../../store/workflows";

const WorkflowsFilterBar = () => {
  const dispatch = useDispatch();
  const dataType = useSelector((state) => state.workflows.dataType);
  const dataOrder = useSelector((state) => state.workflows.dataOrder);
  const searchInput = useSelector((state) => state.workflows.searchInput);

  const inputSearchChangeHandler = (e) => {
    dispatch(workflowsActions.changeInputSearch(e.target.value));
  };

  const selectOrderHandler = (e) => {
    dispatch(workflowsActions.OrderingData(e.target.value));
  };
  const selectOrderTypeHandler = (e) => {
    dispatch(workflowsActions.OrderingDataType(e.target.value));
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
              <div className="w-full relative">
                <input
                  className="focus:outline-none text-primary placeholder-primary text-sm bg-transparent w-full"
                  type="text"
                  value={searchInput}
                  onChange={inputSearchChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 md:flex-row flex-col items-center mb-2 md:px-0 px-4 w-full md:max-w-md">
          <div className="flex items-center md:max-w-lg w-full   bg-white  px-3 rounded-md">
            <span
              htmlFor="type"
              className="block text-sm font-medium text-primary whitespace-nowrap"
            >
              Sort by:
            </span>
            <select
              id="type"
              name="type"
              className="cursor-pointer block bg-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
              onChange={selectOrderTypeHandler}
              defaultValue="Title"
            >
              <option>Title</option>
              <option>Creator</option>
              <option>Date</option>
            </select>
          </div>
          <div className="flex items-center md:max-w-lg w-full bg-white  px-3 rounded-md">
            <span
              htmlFor="order"
              className="block text-sm font-medium text-primary whitespace-nowrap"
            >
              Sort by:
            </span>
            <select
              id="order"
              name="order"
              className="cursor-pointer block bg-white  w-full pl-1  py-2 text-base  focus:outline-none  sm:text-sm rounded-md"
              onChange={selectOrderHandler}
              value={dataOrder || ""}
            >
              <option disabled value="">
                Choose Order
              </option>
              {dataType === "Date" ? (
                <>
                  <option value="oldest">Oldest</option>
                  <option value="newest">Newest</option>
                </>
              ) : (
                <>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowsFilterBar;

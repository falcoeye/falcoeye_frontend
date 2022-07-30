import Lottie from "lottie-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import noDataAnimation from "../../../../assets/animations/no-data.json";
import Loader from "../../../../Components/UI/Loader/Loader";
import { fetchWorkflowsData } from "../../../../store/workflows";

const WorkflowsStep = () => {
  const dispatch = useDispatch();
  const workflowsData = useSelector((state) => state.workflows.data);
  const isLoading = useSelector((state) => state.workflows.isLoading);

  const loadedData = workflowsData?.slice();
  const [filteredData, setFilteredData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const changeSearchInputHandler = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    if (value) {
      setFilteredData((prevState) => {
        if (prevState) {
          return prevState.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          );
        } else {
          return loadedData.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          );
        }
      });
    } else {
      setFilteredData(loadedData);
    }
  };

  useEffect(() => {
    if (!workflowsData) {
      dispatch(fetchWorkflowsData());
    }
  }, [dispatch, workflowsData]);

  let content;

  if (isLoading) {
    content = <Loader height="56" />;
  }
  if (!workflowsData && !isLoading) {
    content = (
      <div className="h-56">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
  if (workflowsData && !isLoading) {
    let dataContent;
    if (filteredData) {
      dataContent = filteredData.map((item) => (
        <div
          key={item.id}
          className="shadow rounded-md bg-gray-50 py-3 px-4 flex flex-col gap-2 cursor-pointer"
        >
          <h1 className="text-base font-bold text-gray-600">{item.name}</h1>
          <p className="text-sm text-gray-400/80">
            {moment.utc(item.publish_date).format("MMM DD YYYY")}
          </p>
          <p className="flex items-center gap-1 capitalize text-green bg-green/5 w-fit p-2 rounded-md">
            <span>
              <AiOutlineUser />
            </span>
            {item.creator}
          </p>
        </div>
      ));
    } else {
      dataContent = workflowsData.map((item) => (
        <div
          key={item.id}
          className="shadow rounded-md bg-gray-50 py-3 px-4 flex flex-col gap-2 cursor-pointer"
        >
          <h1 className="text-base font-bold text-gray-600">{item.name}</h1>
          <p className="text-sm text-gray-400/80">
            {moment.utc(item.publish_date).format("MMM DD YYYY")}
          </p>
          <p className="flex items-center gap-1 capitalize text-green bg-green/5 w-fit p-2 rounded-md">
            <span>
              <AiOutlineUser />
            </span>
            {item.creator}
          </p>
        </div>
      ));
    }

    content = (
      <div className="mt-5 md:mt-0">
        <div className="w-full py-2 mb-3 flex items-center px-4 rounded-full bg-gray-50 shadow">
          <span className="text-primary text-xl mr-4 ">
            <AiOutlineSearch />
          </span>
          <div className="w-full relative">
            <input
              className="focus:outline-none text-primary placeholder-primary text-sm bg-transparent w-full"
              type="text"
              placeholder="Search Workflows"
              onChange={changeSearchInputHandler}
              value={searchInput}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 h-52 overflow-y-scroll pr-3">
          {dataContent}
        </div>
      </div>
    );
  }

  return content;
};

export default WorkflowsStep;

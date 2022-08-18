import Lottie from "lottie-react";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import noDataAnimation from "../../../../../assets/animations/no-data.json";
import Loader from "../../../../../Components/UI/Loader/Loader";
import { fetchWorkflowsData } from "../../../../../store/workflows";
import ShowWorkflow from "../../../ShowWorkflow";

const WorkflowsStep = ({ onSelectWorkflow, selectedWorkflow }) => {
  const dispatch = useDispatch();
  const workflowsData = useSelector((state) => state.workflows.data);
  const isLoading = useSelector((state) => state.workflows.isLoading);

  const [filteredData, setFilteredData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const [showWorkflowOpened, setShowWorkflowOpened] = useState(false);

  const openWorkflowModalHandler = () => {
    setShowWorkflowOpened(true);
  };
  const closeWorkflowModalHandler = () => {
    setShowWorkflowOpened(false);
  };

  const checkSelectedWorkflowHandler = useCallback(() => {
    let data = workflowsData;
    if (selectedWorkflow.id) {
      data = workflowsData.map((item) => {
        if (item.id === selectedWorkflow.id) {
          return {
            ...selectedWorkflow,
          };
        } else {
          return item;
        }
      });
    }

    return data;
  }, [selectedWorkflow, workflowsData]);

  useEffect(() => {
    const data = checkSelectedWorkflowHandler();
    setFilteredData(data);
  }, [checkSelectedWorkflowHandler]);

  const changeSearchInputHandler = (e) => {
    const { value } = e.target;
    setSearchInput(value);

    if (value) {
      if (filteredData && filteredData.length === 0) {
        const data = checkSelectedWorkflowHandler();
        return setFilteredData(
          data.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        );
      }

      setFilteredData((prevState) => {
        return prevState.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
      });
    } else {
      const data = checkSelectedWorkflowHandler();
      setFilteredData(data);
    }
  };

  const addActiveStyleHandler = (id) => {
    const filteredDataWithActiveStyle = filteredData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    const selectedItem = filteredDataWithActiveStyle.find(
      (item) => item.selected
    );
    onSelectWorkflow(selectedItem);
    setFilteredData(filteredDataWithActiveStyle);
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
    if (filteredData && filteredData.length !== 0) {
      dataContent = filteredData.map((item) => (
        <div
          key={item.id}
          onClick={() => addActiveStyleHandler(item.id)}
          className={`relative shadow rounded-md  py-3 px-4 flex flex-col gap-2 cursor-pointer h-fit transition duration-300 ease-in-out ${
            item.selected
              ? "bg-primary/10 hover:bg-primary/10"
              : "bg-gray-50 hover:bg-gray-100/90"
          }`}
        >
          <div className="flex justify-between min-h-[30px]">
            <h1 className="text-base font-bold text-gray-600">{item.name}</h1>
            {item.selected && (
              <span className="text-white text-sm bg-primary w-fit p-2 rounded-full">
                <BsBookmarkHeartFill />
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400/80 mb-3">
            {moment.utc(item.publish_date).format("MMM DD YYYY")}
          </p>
          <button
              onClick={openWorkflowModalHandler}
              type="button"
              className="focus:outline-none text-white bg-cyan-500 hover:bg-cyan-600 font-medium rounded-lg text-sm px-5 py-2.5 transition w-max	"
            >
              Read More
            </button>
        </div>
      ));
    } else if (filteredData && filteredData.length === 0) {
      dataContent = (
        <div className="h-80 col-span-2">
          <Lottie
            animationData={noDataAnimation}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      );
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 h-[calc(100vh-366px)] md:h-[21rem] overflow-y-scroll pr-3">
          {dataContent}
        </div>
        {showWorkflowOpened && (
        <ShowWorkflow
          open={showWorkflowOpened}
          handleClose={closeWorkflowModalHandler}
          id={selectedWorkflow.id}
        />
      ) }
      </div>
    );
  }

  return content;
};

export default WorkflowsStep;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/UI/Loader/Loader";
import { fetchWorkflowsData } from "../../store/workflows";
import WorkflowCard from "./WorkflowCard";
import WorkflowsFilterBar from "./WorkflowsFilterBar";
import noDataAnimation from "../../assets/animations/no-data.json";
import Lottie from "lottie-react";

const AllWorkflows = () => {
  const dispatch = useDispatch();
  const workflowsData = useSelector((state) => state.workflows.data);
  const isLoading = useSelector((state) => state.workflows.isLoading);

  const loadedData = workflowsData?.slice();
  const [filteredData, setFilteredData] = useState(null);
  const [dataOrder, setDataOrder] = useState(null);
  const [dataType, setDataType] = useState("Title");
  const [searchInput, setSearchInput] = useState("");

  const changeSearchInputHandler = (value) => {
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
      setDataType("Title");
      setDataOrder(null);
      setFilteredData(loadedData);
    }
  };

  const changeDataTypeHandler = (value) => {
    setDataType(value);
    if (value === "Date") {
      setDataOrder("oldest");
      setFilteredData(
        loadedData.sort(
          (a, b) => new Date(a.publish_date) - new Date(b.publish_date)
        )
      );
    } else {
      if (dataOrder === "a-z") {
        setDataOrder("a-z");
      } else if (dataOrder === "z-a") {
        setDataOrder("z-a");
      } else {
        setDataOrder("a-z");
        if (value === "Title") {
          setFilteredData(
            loadedData.sort((a, b) => a.name.localeCompare(b.name))
          );
        } else {
          setFilteredData(
            loadedData.sort((a, b) => a.creator.localeCompare(b.creator))
          );
        }
      }
    }

    if ((value === "Title" || !dataType) && dataOrder === "a-z") {
      setFilteredData(loadedData.sort((a, b) => a.name.localeCompare(b.name)));
    }
    if ((value === "Title" || !dataType) && dataOrder === "z-a") {
      setFilteredData(loadedData.sort((a, b) => b.name.localeCompare(a.name)));
    }

    if (value === "Creator" && dataOrder === "a-z") {
      setFilteredData(
        loadedData.sort((a, b) => a.creator.localeCompare(b.creator))
      );
    }
    if (value === "Creator" && dataOrder === "z-a") {
      setFilteredData(
        loadedData.sort((a, b) => b.creator.localeCompare(a.creator))
      );
    }

    if (value === "Date" && dataOrder === "oldest") {
      setFilteredData(
        loadedData.sort(
          (a, b) => new Date(a.publish_date) - new Date(b.publish_date)
        )
      );
    }
    if (value === "Date" && dataOrder === "newest") {
      setFilteredData(
        loadedData.sort(
          (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
        )
      );
    }
  };
  const changeDataOrderHandler = (value) => {
    setDataOrder(value);

    if (value === "a-z" && (!dataType || dataType === "Title")) {
      setFilteredData(loadedData.sort((a, b) => a.name.localeCompare(b.name)));
    }
    if (value === "z-a" && (!dataType || dataType === "Title")) {
      setFilteredData(loadedData.sort((a, b) => b.name.localeCompare(a.name)));
    }

    if (value === "a-z" && dataType === "Creator") {
      setFilteredData(
        loadedData.sort((a, b) => a.creator.localeCompare(b.creator))
      );
    }
    if (value === "z-a" && dataType === "Creator") {
      setFilteredData(
        loadedData.sort((a, b) => b.creator.localeCompare(a.creator))
      );
    }

    if (value === "oldest" && dataType === "Date") {
      setFilteredData(
        loadedData.sort(
          (a, b) => new Date(a.publish_date) - new Date(b.publish_date)
        )
      );
    }
    if (value === "newest" && dataType === "Date") {
      setFilteredData(
        loadedData.sort(
          (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
        )
      );
    }
  };

  useEffect(() => {
    if (!workflowsData) {
      dispatch(fetchWorkflowsData());
    }
  }, [dispatch, workflowsData]);

  let content;

  if (isLoading) {
    content = <Loader />;
  }

  if (!workflowsData && !isLoading) {
    content = (
      <div className="h-96">
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
        <WorkflowCard
          key={item.id}
          creator={item.creator}
          date={item.publish_date}
          title={item.name}
        />
      ));
    } else {
      dataContent = workflowsData.map((item) => (
        <WorkflowCard
          key={item.id}
          creator={item.creator}
          date={item.publish_date}
          title={item.name}
        />
      ));
    }

    content = (
      <>
        <WorkflowsFilterBar
          onChangeDataType={changeDataTypeHandler}
          onChangeDataOrder={changeDataOrderHandler}
          dataOrder={dataOrder}
          dataType={dataType}
          onChangeSearchInput={changeSearchInputHandler}
          searchInput={searchInput}
        />
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-8">
          {dataContent}
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <h3 className="text-[#525252] capitalize  text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
            Workflows
          </h3>
          {content}
        </div>
      </div>
    </div>
  );
};

export default AllWorkflows;

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/UI/Loader/Loader";
import { fetchWorkflowsData, handlePage } from "../../store/workflows";
import WorkflowCard from "./WorkflowCard";
import WorkflowsFilterBar from "./WorkflowsFilterBar";
import noDataAnimation from "../../assets/animations/no-data.json";
import Lottie from "lottie-react";
import ShowWorkflow from "../Modals/ShowWorkflow";

const AllWorkflows = () => {
  const dispatch = useDispatch();
  const {
    data: workflowsData,
    isLoading,
    page,
    lastPage,
  } = useSelector((state) => state.workflows);

  const loadedData = workflowsData?.slice();
  const [filteredData, setFilteredData] = useState(null);
  const [dataOrder, setDataOrder] = useState(null);
  const [dataType, setDataType] = useState("Title");
  const [searchInput, setSearchInput] = useState("");

  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showWorkflowOpened, setShowWorkflowOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchWorkflowsData(page));
  }, [dispatch, page]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !lastPage) {
          dispatch(handlePage(page + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [dispatch, isLoading, lastPage, page]
  );

  const openWorkflowModalHandler = (id) => {
    setShowWorkflowOpened(true);
    setSelectedCardId(id);
  };
  const closeWorkflowModalHandler = () => {
    setShowWorkflowOpened(false);
  };

  const changeSearchInputHandler = (value) => {
    setSearchInput(value);

    if (value) {
      setFilteredData(
        loadedData.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
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
      if (filteredData.length === 0) {
        dataContent = (
          <div className="flex justify-center col-span-3">
            <div className="h-96">
              <Lottie
                animationData={noDataAnimation}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        );
      } else {
        dataContent = filteredData.map((item, index) => {
          if (filteredData.length - 1 === index) {
            return (
              <WorkflowCard
                key={item.id}
                id={item.id}
                date={item.publish_date}
                title={item.name}
                handleClick={openWorkflowModalHandler}
                lastElementRef={lastElementRef}
              />
            );
          }
          return (
            <WorkflowCard
              key={item.id}
              id={item.id}
              date={item.publish_date}
              title={item.name}
              handleClick={openWorkflowModalHandler}
            />
          );
        });
      }
    } else {
      dataContent = workflowsData.map((item, index) => {
        if (workflowsData.length - 1 === index) {
          return (
            <WorkflowCard
              key={item.id}
              id={item.id}
              date={item.publish_date}
              title={item.name}
              handleClick={openWorkflowModalHandler}
              lastElementRef={lastElementRef}
            />
          );
        }
        return (
          <WorkflowCard
            key={item.id}
            id={item.id}
            date={item.publish_date}
            title={item.name}
            handleClick={openWorkflowModalHandler}
          />
        );
      });
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
    <>
      <div className="mt-5 rounded-[10px] p-5">
        <h3 className="text-[#525252] capitalize dark:text-white  text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
          Workflows
        </h3>
        {content}
      </div>
      {showWorkflowOpened && (
        <ShowWorkflow
          open={showWorkflowOpened}
          handleClose={closeWorkflowModalHandler}
          id={selectedCardId}
        />
      )}
    </>
  );
};

export default AllWorkflows;

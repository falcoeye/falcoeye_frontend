import React, { useEffect } from "react";
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

  useEffect(() => {
    if (!workflowsData) {
      dispatch(fetchWorkflowsData());
    }
  }, [dispatch, workflowsData]);

  if (isLoading) {
    return (
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5 text-center">
          <Loader height="32" />
        </div>
      </div>
    );
  }

  if (!workflowsData && !isLoading) {
    return (
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5 text-center">
          <div className="h-96">
            <Lottie
              animationData={noDataAnimation}
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  let content;
  if (workflowsData.length === 0) {
    content = (
      <div className="h-96">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  } else {
    content = (
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-8">
        {workflowsData.map((item) => (
          <WorkflowCard
            key={item.id}
            creator={item.creator}
            date={item.publish_date}
            title={item.name}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <h3 className="text-[#525252] capitalize  text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
            Workflows
          </h3>
          <WorkflowsFilterBar />

          {content}
        </div>
      </div>
    </div>
  );
};

export default AllWorkflows;

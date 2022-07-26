import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkflowsData } from "../../store/workflows";
import LoadingSpinner from "../Auth/components/LoadingSpinner";
import WorkflowCard from "./WorkflowCard";
import WorkflowsFilterBar from "./WorkflowsFilterBar";

const AllWorkflows = () => {
  const dispatch = useDispatch();
  const workflowsData = useSelector((state) => state.workflows.data);
  const isLoading = useSelector((state) => state.workflows.isLoading);
  console.log(workflowsData);

  useEffect(() => {
    if (!workflowsData) {
      dispatch(fetchWorkflowsData());
    }
  }, [dispatch, workflowsData]);

  if (isLoading) {
    return (
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5 text-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!workflowsData && !isLoading) {
    return (
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5 text-center">
          <h1>No workflows to show</h1>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default AllWorkflows;

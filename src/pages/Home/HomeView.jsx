import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AnalysisCard from "./components/AnalysisCard";
import MediasCard from "./components/MediasCard";
import SourcesCard from "./components/SourcesCard";
import WorkflowsCard from "./components/WorkflowsCard";
import axios from "../../utility/api-instance";

const HomeView = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);

  const [workflowData, setWorkflowData] = useState(null);
  const [loadingWorkflowData, setLoadingWorkflowData] = useState(true);
  const [workflowImage, setWorkflowImage] = useState(null);
  const [loadingWorkflowImage, setLoadingWorkflowImage] = useState(true);

  useEffect(() => {
    axios
      .get(`/analysis/`)
      .then((res) => {
        setLoadingAnalysis(false);
        const number = res.data.analysis;
        setAnalysisData(number);
      })
      .catch((error) => {
        setLoadingAnalysis(false);
        toast.error(error.response.data.msg || "Something went wrong");
      });
  }, []);

  useEffect(() => {
    if (analysisData) {
      const lastAnalysis = analysisData[0];

      if (lastAnalysis) {
        const fetchImage = () => {
          axios
            .get(`workflow/${lastAnalysis.workflow_id}/img_260.jpg`, {
              responseType: "blob",
            })
            .then((res) => {
              setLoadingWorkflowImage(false);
              // we can all pass them to the Blob constructor directly
              const new_blob = new Blob([res.data], { type: "image/jpg" });
              const url = URL.createObjectURL(new_blob);
              setWorkflowImage(url);
            })
            .catch((err) => {
              setLoadingWorkflowImage(false);
              toast.error(err.response.data.message);
            });
        };

        axios
          .get(`/workflow/${lastAnalysis.workflow_id}`)
          .then((res) => {
            setLoadingWorkflowData(false);
            setWorkflowData(res.data.workflow);
          })
          .catch((error) => {
            setLoadingWorkflowData(false);
            toast.error(error.response.data.msg || "Something went wrong");
          });

        fetchImage();
      }
    }
  }, [analysisData]);

  let lastAnalysisData;
  let lastAnalysisContent;
  if (analysisData && !loadingAnalysis) {
    lastAnalysisData = analysisData[0];

    if (lastAnalysisData) {
      lastAnalysisContent = (
        <>
          <h4 className="font-semibold text-base md:text-xl text-gray-800 dark:text-gray-200">
            {lastAnalysisData?.name}
          </h4>
          <div className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary rounded-md capitalize">
            {lastAnalysisData?.status}
          </div>
        </>
      );
    } else {
      lastAnalysisContent = (
        <h5 className="text-center w-full font-semibold text-base md:text-xl text-gray-500">
          There is no analysis yet.
        </h5>
      );
    }
  } else if (!analysisData && loadingAnalysis) {
    lastAnalysisContent = (
      <>
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-[28px] w-48 md:w-60 bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-[36px] w-[55px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </>
    );
  }

  let workflowContent;
  if (
    workflowImage &&
    workflowData &&
    !loadingWorkflowImage &&
    !loadingWorkflowData
  ) {
    workflowContent = (
      <div className="flex items-center gap-5 flex-wrap">
        <div className="rounded-md overflow-hidden w-48 h-24">
          <img
            src={workflowImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="font-semibold text-base  md:text-lg text-gray-600 dark:text-gray-200">
          {workflowData.name}
        </h3>
      </div>
    );
  } else if (
    !workflowImage &&
    !workflowData &&
    loadingWorkflowImage &&
    loadingWorkflowData
  ) {
  }

  return (
    <div className="mx-1 pt-5 px-4 md:px-7 pb-5 rounded-md space-y-7">
      <div className="flex items-center gap-7 justify-center flex-wrap">
        <SourcesCard />
        <MediasCard />
        <WorkflowsCard />
        <AnalysisCard
          analysisData={analysisData}
          loadingAnalysis={loadingAnalysis}
        />
      </div>

      <div className="shadow-md rounded-md dark:bg-gray-900 p-5 space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {lastAnalysisContent}
        </div>

        <div>{workflowContent}</div>
      </div>
    </div>
  );
};

export default HomeView;

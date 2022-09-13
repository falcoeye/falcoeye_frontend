import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import AnalysisSkeleton from "../../../Components/UI/AnalysisSkeleton/AnalysisSkeleton";
import axios from "../../../utility/api-instance";
import AnalysisThumbnail from "./AnalysisThumbnail";

const LastAnalysisInfo = () => {
  const [analysisData, setAnalysisData] = useState([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);

  useEffect(() => {
    axios
      .get(`/analysis/?page=1&per_page=5`)
      .then((res) => {
        setLoadingAnalysis(false);
        setAnalysisData(res.data.analysis);
      })
      .catch((error) => {
        setLoadingAnalysis(false);
        toast.error(error.response.data.msg || "Something went wrong");
      });
  }, []);
  let lastAnalysisContent;
  if (loadingAnalysis) {
    lastAnalysisContent = (
      <Fragment>
        <AnalysisSkeleton />
        <AnalysisSkeleton />
        <AnalysisSkeleton />
        <AnalysisSkeleton />
        <AnalysisSkeleton />
      </Fragment>
    );
  } else if (analysisData.length > 0 && !loadingAnalysis) {
    lastAnalysisContent = analysisData.map((item, index) => {
      return (
        <AnalysisThumbnail key={index} item={item} />
      )
    })
  } else if (analysisData.length === 0 && !loadingAnalysis) {
    lastAnalysisContent = (
      <div className='shadow-md rounded-md dark:bg-gray-900 p-5 space-y-5 flex justify-center' >
        <h5 className="text-center w-full font-semibold text-base md:text-xl text-gray-800 dark:text-white ">
          There is no analysis yet.
        </h5>
      </div>
    );
  }

  return (
    <div className="flex flex-col	 gap-4">
      {lastAnalysisContent}
    </div>
  );
};

export default LastAnalysisInfo;

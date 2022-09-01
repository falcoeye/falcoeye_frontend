import React from "react";
import { FaBriefcase } from "react-icons/fa";

const AnalysisCard = ({ loadingAnalysis, analysisData }) => {
  let content;

  if (analysisData && !loadingAnalysis) {
    content = (
      <h2 className="mt-3 text-center font-bold text-gray-800 text-3xl dark:text-white">
        {analysisData.length}
      </h2>
    );
  } else if (!analysisData && loadingAnalysis) {
    content = (
      <div role="status" className="animate-pulse mt-3 flex justify-center ">
        <div className="min-h-[36px] bg-gray-200  dark:bg-gray-700 w-14"></div>
      </div>
    );
  }

  return (
    <div className="shadow-md rounded-md py-6 px-12 dark:bg-gray-900 w-[221px] max-w-full">
      <div className="flex  gap-3">
        <div className="p-2 flex  items-center text-sm font-medium bg-primary rounded-md text-white">
          <FaBriefcase size={17} />
        </div>
        <h5 className="font-semibold text-gray-700 text-lg dark:text-white">
          Analysis
        </h5>
      </div>

      {content}
    </div>
  );
};

export default AnalysisCard;

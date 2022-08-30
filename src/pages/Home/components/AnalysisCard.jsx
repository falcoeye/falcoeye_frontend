import React, { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "../../../utility/api-instance";

const AnalysisCard = () => {
  const [numberOfAnalysis, setNumberOfAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/analysis/`)
      .then((res) => {
        setLoading(false);
        const number = res.data.analysis.length;
        setNumberOfAnalysis(number);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
      });
  }, []);

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

      {!loading ? (
        <h2 className="mt-3 text-center font-bold text-gray-800 text-3xl dark:text-white">
          {numberOfAnalysis}
        </h2>
      ) : (
        <div role="status" className="animate-pulse mt-3 flex justify-center ">
          <div className="min-h-[36px] bg-gray-200  dark:bg-gray-700 w-14"></div>
        </div>
      )}
    </div>
  );
};

export default AnalysisCard;

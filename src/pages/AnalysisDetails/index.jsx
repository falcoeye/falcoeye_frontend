import { IoChevronBackCircleOutline } from "react-icons/io5";
import Layout from "../../Components/Layout";
import AnalysisDetails from "./AnalysisDetails";
import RelatedAnalysis from "./RelatedAnalysis";
import React from "react";
const AnalysisDetailsIndex = () => {
  return (
    <Layout>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <h3 className="text-[#525252] capitalize  text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
            <span className="text-[#c2667b] text-2xl flex gap-2 items-center">
              <IoChevronBackCircleOutline />
              <span className="text-xl">Back</span>
            </span>
            count number of fish in sight of view over time
          </h3>

          <div className=" flex lg:flex-row flex-col gap-4 pb-4">
            <div className="basis-[60%]">
              <AnalysisDetails />
            </div>
            <div className="basis-[40%]">
              <RelatedAnalysis />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalysisDetailsIndex;

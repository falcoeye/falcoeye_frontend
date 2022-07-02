import { IoChevronBackCircleOutline } from "react-icons/io5";
import Layout from "../../Layout";
import AddCamera from "./AddCamera";
import React from "react";
const NewAnalysis = () => {
  return (
    <Layout>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <h3 className="text-[#525252] capitalize  text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
            <span className="text-[#c2667b] text-2xl flex gap-2 items-center">
              <IoChevronBackCircleOutline />
              <span className="text-xl">Back</span>
            </span>
            New Analysis
          </h3>
          <p className="text-sm mb-4 ">
            Please provide all required input Data
          </p>
          <AddCamera />
        </div>
      </div>
    </Layout>
  );
};

export default NewAnalysis;

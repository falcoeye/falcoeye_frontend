import Layout from "../../Components/Layout";
import Videos from "./Videos";
import React from "react";
const AnalysisJobs = () => {
  return (
    <Layout>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <Videos />
        </div>
      </div>
    </Layout>
  );
};

export default AnalysisJobs;

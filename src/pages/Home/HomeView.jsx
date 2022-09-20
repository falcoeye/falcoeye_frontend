import React from "react";
import AnalysisCard from "./components/AnalysisCard";
import HomeInfoBoxes from "./components/HomeInfoBoxes";
import LastAnalysisInfo from "./components/LastAnalysisInfo";
import MediasCard from "./components/MediasCard";
import SourcesCard from "./components/SourcesCard";
// import WorkflowsCard from "./components/WorkflowsCard";

const HomeView = () => {
  return (
    <>
      <div className="mx-1 pt-5 px-4 md:px-7 pb-5 rounded-md space-y-8">
        <HomeInfoBoxes />
        <div className="flex items-center gap-7 justify-center flex-wrap mt-5">
          <SourcesCard />
          <MediasCard />
          {/* <WorkflowsCard /> */}
          <AnalysisCard />
        </div>
        <LastAnalysisInfo />
      </div>
    </>
  );
};

export default HomeView;

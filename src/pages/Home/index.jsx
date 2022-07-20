import React from "react";
import Layout from "../../Components/Layout";
import GraphCards from "./GraphCards";
import LatesVideo from "./LatesVideo";
import UploadedCamera from "./UploadedCamera";

const Index = () => {
  return (
    <Layout>
      <GraphCards />
      <div className="main-container grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4">
        <div className="lg:col-span-2">
          <LatesVideo />
        </div>
        <div>
          <UploadedCamera />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

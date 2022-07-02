import React from "react";
import Layout from "../../Layout";
import FilterBar from "./FilterBar";
import LiveStreaming from "./LiveStreaming";
import RecentAnalysis from "./RecentAnalysis";
import RecentVideos from "./RecentVideos";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { useSelector } from "react-redux";
const Index = (props) => {
  const { id } = useParams();
    const user = useSelector((state) => state.user);
   const camera = useFetch(`/camera/${id}`, {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
   });

  console.log("resp "+camera.response);
  return (
    <Layout>
      <div className="">
        <FilterBar />
        <LiveStreaming camera={ camera.response && camera.response.data.camera}/>
        <div className="mx-6 pt-12 bg-white">
          <div className="main-container ">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-7 px-7">
              <div>
                <RecentAnalysis />
              </div>
              <div>
                <RecentVideos />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

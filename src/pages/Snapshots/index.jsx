import { IoChevronBackCircleOutline } from "react-icons/io5";
import Layout from "../../Components/Layout";
import ImgDetails from "./ImgDetails";
import Notes from "./Notes";
import React from "react";
const SnapShot = () => {
  return (
    <Layout>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <h3 className="text-[#525252] capitalize text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
            <span className="text-[#c2667b] text-2xl flex gap-2 items-center">
              <IoChevronBackCircleOutline />
              <span className="text-xl">Back</span>
            </span>
            Snapshots
          </h3>
          <div className="main-container grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4">
            <div className="lg:col-span-2">
              <Notes />
            </div>
            <div>
              <ImgDetails />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SnapShot;

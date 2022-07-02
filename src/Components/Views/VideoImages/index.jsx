import React, { useState } from "react";
import Layout from "../../Layout";
import Cameracards2 from "./Cameracards2";
import CamerCards from "./CamerCards";
import FilterBar from "../../FilterBar";
import SideFilterBar from "./SideFilterBar";
import { BiSliderAlt } from "react-icons/bi";
import FilterModal from "./FilterModal";
const Index = () => {
  const [sort, setSort] = useState("list");
  const [sideNavToggle, setSideNavToggle] = useState(true);
  const [filterModal, setFilterModal] = useState(false);
  const handleSideNav = () => {
    setSideNavToggle(!sideNavToggle);
  };
  return (
    <Layout>
      <div className="">
        <div className="">
          <FilterBar setSort={setSort} sort={sort} />
          <div className="main-container ">
            <div className="flex gap-4 mx-1 bg-white  ">
              <div
                className={`${
                  sideNavToggle ? "w-[230px]" : "w-[80px]"
                } transition-all duration-500 xl:block  hidden  `}
              >
                <SideFilterBar toggle={handleSideNav} sideNav={sideNavToggle} />
              </div>
              <button
                className="flex items-center h-[35px] relative left-5  xl:hidden"
                onClick={() => setFilterModal(true)}
              >
                <BiSliderAlt />
                filters
              </button>
              {filterModal && (
                <FilterModal
                  setFilterModal={setFilterModal}
                  toggle={handleSideNav}
                  sideNav={sideNavToggle}
                />
              )}
              <div className=" flex-col flex overflow-x-scroll">
                {sort === "list" ? (
                  <div className="w-full">
                    <Cameracards2 data={files} />
                  </div>
                ) : (
                  <CamerCards data={files} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

const files = [
  {
    id: 1,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 2,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 3,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 4,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 5,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 6,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 7,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 8,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
];

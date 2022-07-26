import React from "react";
import Pic1 from "../../images/cam4.jpg";
function RecentAnalysis() {
  return (
    <div className="mt-5">
      <div className="flex justify-between px-3">
        <h2>Recent Analysis</h2>
        <button className="underline text-pink-700 text-sm">View All</button>
      </div>
      <div className="bg-white mx-1 pt-9  pb-7 rounded-sm">
        <div className="overflow-x-scroll md:overflow-x-auto">
          <ul className="grid grid-cols-1 gap-x-4 gap-y-6  sm:gap-x-3 min-w-max  ">
            {files.map((file) => (
              <li
                key={file.source}
                className=" flex items-center justify-between shadow-xl rounded-lg px-3"
              >
                <div className=" flex items-center gap-2 ">
                  <div className="">
                    <img
                      src={file.source}
                      alt=""
                      className=" min-w-[100px] w-full max-w-[120px]  rounded-t-xl rounded-l-xl pointer-events-none "
                    />
                  </div>
                  <div className="px-2 pt-2 pb-6">
                    <h2 className="text-gray-900 text-base pb-2">
                      
                      {file.title}
                    </h2>

                    <div className="flex gap-4">
                      <button className="text-xs py-1 px-2 mt-1 border rounded-3xl font-medium text-primary pointer-events-none">
                        {file.info}
                      </button>
                      <button className="text-xs py-1 px-2 mt-1 border rounded-3xl font-medium text-primary pointer-events-none">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecentAnalysis;
const files = [
  {
    id: 1,
    title: "Name of Analysis here lore ipsum is dummy ....",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 2,
    title: "Name of Analysis here lore ipsum is dummy ....",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 3,
    title: "Name of Analysis here lore ipsum is dummy ....",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 4,
    title: "Name of Analysis here lore ipsum is dummy ....",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
];

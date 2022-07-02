/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";

function RecentVideos() {
  return (
    <div className="mt-5">
      <div className="flex justify-between px-3">
        <h2>Recent Videos</h2>
        <button className="underline text-pink-700 text-sm">View All</button>
      </div>
      <div className="bg-white mx-1 pt-9  pb-7 rounded-sm">
        <div className="overflow-x-scroll md:overflow-hidden">
          <ul className="grid grid-cols-1 gap-x-4 gap-y-6  sm:gap-x-3 min-w-max  ">
            {files.map((file) => (
              <li
                key={file.source}
                className=" flex items-center justify-between shadow-xl rounded-lg px-3"
              >
                <div className=" flex items-center gap-2 ">
                  <div className="">
                    <div class="video video-4">
                      <iframe
                        width="120"
                        height="70"
                        title="title"
                        src="https://www.youtube.com/embed/XDrB5c4-c9Y"
                        frameborder="0"
                        allowfullscreen
                        className="rounded-t-xl rounded-l-xl"
                      />
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-6">
                    <h2 className="text-gray-900 text-base pb-2">
                      {" "}
                      {file.title}
                    </h2>

                    <div className="flex gap-4">
                      <button className="text-xs py-1 px-2 mt-1 border rounded-3xl font-medium text-primary pointer-events-none">
                        {file.info}
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

export default RecentVideos;
const files = [
  {
    id: 1,
    title: "Identify Fish Types in Videos Place Here Video Title...",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 2,
    title: "Identify Fish Types in Videos Place Here Video Title...",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 3,
    title: "Identify Fish Types in Videos Place Here Video Title...",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 4,
    title: "Identify Fish Types in Videos Place Here Video Title...",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
];

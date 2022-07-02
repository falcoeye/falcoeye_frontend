/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import Pic1 from "./../../../images/cam4.jpg";
import useFetch from "../../../hooks/UseFetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function CamerCards() {
  const user = useSelector((state) => state.user);
   const camerasList = useFetch("/camera/", {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
   });
  return (
    <div className="main-container">
      <div className="bg-white mx-1 pt-9 px-7 pb-7 rounded-sm">
        <ul
          role="list"
          className="grid sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 sm:gap-x-3 lg:grid-cols-4 "
        >
          {camerasList.response && camerasList.response.data.camera.map((file) => (
            <li key={file.source} className="relative shadow-lg p-2">
              <div className="group block w-full aspect-w-10 aspect-h-7    overflow-hidden">
                <img
                  src={file.source}
                  alt=""
                  className="object-cover pointer-events-none "
                />
              </div>
              <div className="px-2 pt-2 pb-8">
                <h2 className="text-gray-900 text-base"> {file.name}</h2>
                <p className="mt-2 block text-sm font-medium text-primary truncate pointer-events-none">
                  {file.subtitle}
                </p>
                <p className="block text-xs mt-2  font-medium text-primary pointer-events-none">
                  {file.publish_date}
                </p>
                <div className="mt-6">
                  <Link to={"/Streaming/"+file.id}>
                  
                    {" "}
                    View More
                    </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CamerCards;
const files = [
  {
    id: 1,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 2,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 3,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 4,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 5,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 6,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 7,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
  {
    id: 8,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: Pic1,
  },
];

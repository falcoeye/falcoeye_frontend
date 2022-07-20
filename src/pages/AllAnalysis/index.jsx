import Layout from "../../Components/Layout";
import AnalysisFilterbar from "./AnalysisFilterbar";
import fish1 from "../../images/fish3.jpeg";
import React from "react";
const AllAnalysis = () => {
  return (
    <Layout>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <h3 className="text-[#525252] capitalize  text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
            All Analysis
          </h3>
          <AnalysisFilterbar />

          <div className="flex flex-col px-4 mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-4 ">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        ></th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <thfiles
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </thfiles>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          status
                        </th>
                        {/* <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Status
                        </th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {files.map((file) => {
                        let statusStyle = "";
                        if (file.status === "active") {
                          statusStyle = "text-primary";
                        }
                        if (file.status === "error") {
                          statusStyle = "text-[#c16a7b]";
                        }
                        if (file.status === "done") {
                          statusStyle = "text-[#74ab96]";
                        }
                        return (
                          <tr key={file.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="max-w-[120px] min-w-[80px] rounded-t-md rounded-br-md overflow-hidden">
                                  <img
                                    className="w-full"
                                    src={file.img}
                                    alt="files"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="">
                                <div className="text-sm font-medium text-gray-900">
                                  {file.title}
                                </div>
                                {/* <div className="text-sm text-gray-500">
                                {file.subtitle}
                              </div> */}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {file.info}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className={`text-sm ${statusStyle} capitalize `}
                              >
                                {file.status}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button className="btn-primary">
                                view details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllAnalysis;

const files = [
  {
    id: 1,
    title: "count number of fish in sight of view",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    status: "active",
    img: fish1,
  },
  {
    id: 2,
    title: "count number of fish in sight of view",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    status: "done",
    img: fish1,
  },
  {
    id: 3,
    title: "count number of fish in sight of view",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    status: "error",
    img: fish1,
  },
  {
    id: 4,
    title: "count number of fish in sight of view",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    status: "active",
    img: fish1,
  },
  {
    id: 5,
    title: "count number of fish in sight of view",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    status: "error",
    img: fish1,
  },
  {
    id: 6,
    title: "count number of fish in sight of view",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    status: "active",
    img: fish1,
  },
  {
    id: 7,
    title: "count number of fish in sight of view",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    status: "active",
    img: fish1,
  },
  {
    id: 8,
    title: "count number of fish in sight of view",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    status: "active",
    img: fish1,
  },
];


import React from "react";

function CamerCards2({ data }) {
  return (
    <div className=" w-full px-4">
      <div className="flex flex-col w-full">
        <div className="-my-2 w-full sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-4 ">
            <div className="shadow  border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white min-w-full w-full">
                  <tr className="w-full">
                    <th
                      scope="col"
                      className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                    <th
                      scope="col"
                      className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <thfiles
                      scope="col"
                      className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </thfiles>
                    <th
                      scope="col"
                      className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Camera
                    </th>
                    <th
                      scope="col"
                      className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y w-full divide-gray-200">
                  {data.map((file) => (
                    <tr className="w-full" key={file.id}>
                      <td className=" py-4 px-2 whitespace-nowrap w-full">
                        <div className="flex items-center">
                          <div className="">
                            <div class="video video-4">
                              <iframe
                                width="100"
                                height="55"
                                title="title"
                                src="https://www.youtube.com/embed/XDrB5c4-c9Y"
                                frameborder="0"
                                allowfullscreen
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className=" py-4 whitespace-nowrap px-4">
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            {file.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {file.subtitle}
                          </div>
                        </div>
                      </td>
                      <td className=" py-4 whitespace-nowrap px-4">
                        <div className="text-sm text-gray-500">{file.info}</div>
                      </td>
                      <td className=" py-4 whitespace-nowrap px-4">
                        <div className="text-sm text-gray-900">
                          {file.title}
                        </div>
                      </td>
                      <td className=" py-4 whitespace-nowrap px-4">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          view Info
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CamerCards2;

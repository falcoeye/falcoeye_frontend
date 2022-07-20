import React from "react";
import { ImCross } from "react-icons/im";

export default function Info() {
  return (
    <div className=" mr-5 px-4 rounded-lg shadow-xl min-h-[500px]">
      <div className="flex justify-between mb-4">
        <div className="pt-5 ">
          <h1 className="text-gray-900 text-lg font-medium">Information</h1>
        </div>
        <div className="pt-5">
          <ImCross />
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-gray-500">
          this is some genral information automatically recived from device
        </h3>
      </div>
      <div>
        <div>
          {settingCard.map(({ id, info, detail }) => (
            <div key={id} className="grid grid-cols-2 gap-3">
              <div className="mb-3 text-gray-500">{info}</div>
              <div className="mb-3 text-gray-900">{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const settingCard = [
  {
    id: 1,
    info: "Dimensions:",
    detail: "640*480",
  },
  {
    id: 2,
    info: "Aspect Ratio:",
    detail: "4:3",
  },
  {
    id: 3,
    info: "Facing Mode:",
    detail: "user",
  },

  {
    id: 4,
    info: "Brightness:",
    detail: "0",
  },
  {
    id: 5,
    info: "Frame Rate:",
    detail: "2 frame/s",
  },
  {
    id: 6,
    info: "Sharpness:",
    detail: "2",
  },
  {
    id: 7,
    info: "Saturation:",
    detail: "67",
  },
];

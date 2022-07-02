import fish1 from "../../../images/fish1.jpeg";
import fish2 from "../../../images/fish2.jpeg";
import fish3 from "../../../images/fish3.jpeg";
import fish4 from "../../../images/fish4.jpg";
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { BiNavigation } from "react-icons/bi";
import React from "react";
const Videos = () => {
  return (
    <div className="bg-white rounded-[40px]">
      <div>
        <h3 className="text-[#525252] capitalize text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
          <span className="text-[#c2667b] text-2xl flex gap-2 items-center">
            <IoChevronBackCircleOutline />{" "}
            <span className="text-xl"> Back</span>
          </span>
          Cut video segments where certain type of fish exist
        </h3>

        <h4 className="capitalize text-xl text-[#525252] mb-5 px-8">
          results from the Analysis:
        </h4>
      </div>
      <div className="border border-[#f5f5f5] px-4 py-8 ">
        <h2 className="text-xl capitalize mb-5">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {cards.map((card) => {
            const { id, img, duration } = card;
            return (
              <div
                className="relative cursor-pointer rounded-tl-lg rounded-br-lg overflow-hidden"
                key={id}
              >
                <img
                  className="w-full h-full object-cover"
                  src={img}
                  alt="img"
                />
                <div className="absolute top-0 left-0 p-5 w-full h-full flex flex-col">
                  <div className=" absolute inset-0 text-white w-max h-max m-auto text-2xl">
                    <IoCaretForwardCircleOutline />
                  </div>
                  <div className="py-[1px] mt-auto px-[4px] w-max  text-white bg-black rounded-sm text-xs bg-opacity-40">
                    {duration}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="text-xl capitalize mb-5 mt-14">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {cards.map((card) => {
            const { id, img } = card;
            return (
              <div
                className="relative cursor-pointer rounded-tl-lg rounded-br-lg overflow-hidden"
                key={id}
              >
                <img
                  className="w-full h-full object-cover"
                  src={img}
                  alt="img"
                />
              </div>
            );
          })}
        </div>

        <button className="rounded-full bg-[#5dbf98] text-white inline-flex items-center gap-2 mt-16 justify-center capitalize text-base min-h-[38px] px-4">
          <span>
            <BiNavigation />
          </span>{" "}
          publish to media
        </button>
      </div>

      <div className="w-full border border-[#f5f5f5] mt-16 mb-10 flex justify-center items-center min-h-[80px]">
        <span className="flex items-center gap-16">
          Status:
          <div className="border-[#81aa9c] border rounded-md px-5 text-[#81aa9c]">
            Done
          </div>
        </span>
      </div>
    </div>
  );
};

export default Videos;

const cards = [
  {
    id: 1,
    duration: "3:06",
    img: fish1,
  },
  {
    id: 2,
    duration: "3:06",
    img: fish2,
  },
  {
    id: 3,
    duration: "3:06",
    img: fish3,
  },
  {
    id: 4,
    duration: "3:06",
    img: fish4,
  },
  {
    id: 5,
    duration: "3:06",
    img: fish4,
  },
  {
    id: 6,
    duration: "3:06",
    img: fish4,
  },
  {
    id: 7,
    duration: "3:06",
    img: fish4,
  },
  {
    id: 8,
    duration: "3:06",
    img: fish4,
  },
  {
    id: 9,
    duration: "3:06",
    img: fish4,
  },
  {
    id: 10,
    duration: "3:06",
    img: fish4,
  },
];

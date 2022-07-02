import AiFilterBar from "./AiFilterBar";
import fish from "../../../images/fish3.jpeg";
import { AiFillStar, AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { BsBoxArrowInRight } from "react-icons/bs";
import React from "react";
const AllModels = () => {
  return (
    <div>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <h3 className="text-[#525252] capitalize  text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
            All AI Models
          </h3>
          <AiFilterBar />

          <div className="flex items-center gap-5 mt-5">
            <button className="bg-gray-100 rounded-full border border-gray-50 text-xs px-2 py-1">
              Top
            </button>
            <button className="bg-gray-100 rounded-full border border-gray-50 text-xs px-2 py-1">
              New
            </button>
            <button className="bg-gray-100 rounded-full border border-gray-50 text-xs px-2 py-1">
              Greatest
            </button>
          </div>

          <div className="flex flex-col gap-8 mt-8">
            {cardList.map(({ id, img, title, desc, stars, name, date }) => {
              return (
                <div
                  className="flex lg:flex-row flex-col  items-center gap-8 px-4 py-5 border border-[#f4f6f5]"
                  key={id}
                >
                  <div className="lg:max-w-[400px] flex-1">
                    <img className="w-full h-full" src={img} alt="img" />
                  </div>
                  <div className="flex-[3]">
                    <h3 className="text-2xl capitalize mb-3">{title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-primary text-sm">
                      <button className="flex items-center gap-2 capitalize border border-gray-100 px-[2px]">
                        <span>
                          <AiOutlineUser />
                        </span>
                        {name}
                      </button>
                      <button className="flex items-center gap-2 capitalize border border-gray-100 px-[2px]">
                        <span>
                          <AiOutlineCalendar />
                        </span>
                        {date}
                      </button>
                      <button className="flex items-center gap-2 capitalize border border-gray-100 px-[2px]">
                        <span>
                          <AiFillStar />
                        </span>
                        {stars}
                      </button>
                    </div>

                    <p className="text-sm mt-5 mb-4">{desc}</p>

                    <button className="btn-primary">
                      <span className="text-xl mr-2">
                        <BsBoxArrowInRight />
                      </span>
                      view details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllModels;

const cardList = [
  {
    id: 1,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan",
    date: "20 dec 2021",
    stars: 3738,
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 2,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan",
    date: "20 dec 2021",
    stars: 3738,
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 3,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan",
    date: "20 dec 2021",
    stars: 3738,
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 4,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan",
    date: "20 dec 2021",
    stars: 3738,
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
];

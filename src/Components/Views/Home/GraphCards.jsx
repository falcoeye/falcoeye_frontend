import React from "react";
// import { AiFillCamera, AiFillRobot, AiOutlineSearch } from "react-icons/ai";
// import { RiCameraLensFill } from "react-icons/ri";
import card1 from "../../../images/card1.svg";
import card2 from "../../../images/card2.svg";
import card3 from "../../../images/card3.svg";
import card4 from "../../../images/card4.svg";

const GraphCards = () => {
  return (
    <div className="main-container pb-4">
      <h2 className="text-black py-4 text-base">Welcome to iOcean SYSTEM</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const { id, numeric, title, total, icon } = card;
          return (
            <div
              key={id}
              className="bg-primary p-8 flex justify-between items-center gap-4 rounded"
            >
              <div className="flex flex-col gap-y-1 text-white">
                <h3 className="text-2xl font-bold ">{numeric}</h3>
                <h4 className="text-xs capitalize">{title}</h4>
                <span className="font-bold text-sm">{total}</span>
                <p className="text-xs">Submitted last week</p>
              </div>
              <div className="text-[60px] text-blue-300">
                <img className="fill-primary" src={icon} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GraphCards;

const cards = [
  {
    id: 1,
    numeric: 38399,
    icon: card1,
    title: "total videos",
    total: 32
  },
  {
    id: 2,
    numeric: 11040,
    icon: card2,
    title: "total snapshot",
    total: 302
  },
  {
    id: 3,
    numeric: 14040,
    icon: card3,
    title: "total analysis",
    total: 12
  },
  {
    id: 4,
    numeric: 21080,
    icon: card4,
    title: "total uploaded camera",
    total: 132
  }
];

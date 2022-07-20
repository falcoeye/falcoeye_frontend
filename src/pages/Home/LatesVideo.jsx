import React from "react";
import { Link } from "react-router-dom";
import fish1 from "../../images/fish1.jpeg";
import fish2 from "../../images/fish2.jpeg";
import fish3 from "../../images/fish3.jpeg";
import fish4 from "../../images/fish4.jpg";

const LatesVideo = () => {
  return (
    <div className="bg-white rounded px-[30px] py-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-gray-900 text-lg">Latest Videos & Snapshot</h2>
        <Link to={`/`} className="text-primary text-sm">
          Show all projects
        </Link>
      </div>
      <div className="overflow-x-scroll md:overflow-x-auto large-2">
        <div className="flex flex-col gap-y-8 sm:gap-y-6 w-max ">
          {cards.map((card) => {
            const { id, img, name, camera, date } = card;
            return (
              <div className="flex  gap-y-6 gap-x-8 sm:items-center" key={id}>
                <div className="max-w-[200px] w-full rounded-t-lg rounded-br-lg overflow-hidden">
                  <img className="w-full object-cover" src={img} alt="img" />
                </div>
                <div className="flex flex-col gap-y-2">
                  <li className="grid grid-cols-[_55px_1fr] gap-x-9 ">
                    <p className="text-gray-500 text-sm capitalize">Name:</p>
                    <p className="capitalize text-gray-900 text-sm">{name}</p>
                  </li>
                  <li className="grid grid-cols-[_55px_1fr] gap-x-9 ">
                    <p className="text-gray-500 text-sm capitalize">camera:</p>
                    <p className="uppercase text-primary text-sm">{camera}</p>
                  </li>
                  <li className="grid grid-cols-[_55px_1fr] gap-x-9 ">
                    <p className="text-gray-500 text-sm capitalize">date:</p>
                    <p className="text-sm text-gray-900">{date}</p>
                  </li>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatesVideo;

const cards = [
  {
    id: 1,
    img: fish1,
    name: "black spot or tang disease in fish",
    camera: "canon eos rebel t11",
    date: "9 dec 2021",
  },
  {
    id: 2,
    img: fish2,
    name: "black spot or tang disease in fish",
    camera: "canon eos rebel t11",
    date: "10 dec 2021",
  },
  {
    id: 3,
    img: fish3,
    name: "black spot or tang disease in fish",
    camera: "canon eos rebel t11",
    date: "13 dec 2021",
  },
  {
    id: 4,
    img: fish4,
    name: "black spot or tang disease in fish",
    camera: "canon eos rebel t11",
    date: "19 dec 2021",
  },
];

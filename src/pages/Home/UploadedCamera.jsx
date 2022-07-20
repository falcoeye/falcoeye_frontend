import React from "react";
import { Link } from "react-router-dom";
import cam1 from "../../images/cam1.jpg";
import cam2 from "../../images/cam2.jpeg";
import cam3 from "../../images/cam3.jpeg";
import cam4 from "../../images/cam4.jpg";
import cam5 from "../../images/cam5.webp";
import cam6 from "../../images/cam3.jpeg";

const UploadedCamera = () => {
  return (
    <div className="bg-white rounded px-[30px] h-full py-6 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-gray-900 text-lg">Latest uploaded camera</h2>
        <Link to={`/`} className="text-primary text-sm">
          Show all
        </Link>
      </div>
      <div className="overflow-x-scroll sm:overflow-x-auto">
        <div className="flex flex-col gap-y-6 w-max">
          {cards.map((card) => {
            const { id, img, title, date } = card;
            return (
              <div className="flex items-center gap-x-4" key={id}>
                <div className="max-w-[62px] w-full max-h-[40px] rounded-t-lg rounded-br-lg overflow-hidden">
                  <img
                    className="w-full object-cover h-full"
                    src={img}
                    alt="img"
                  />
                </div>
                <div className="flex flex-col gap-y-[2px]">
                  <h2 className="text-primary text-sm">{title}</h2>
                  <p className="text-xs">{date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadedCamera;

const cards = [
  {
    id: 1,
    img: cam1,
    title: "Camera Narne 1 Canon GX 700",
    date: "12 dec 2021",
  },
  {
    id: 2,
    img: cam2,
    title: "Camera Narne 1 Canon GX 700",
    date: "12 dec 2021",
  },
  {
    id: 3,
    img: cam3,
    title: "Camera Narne 1 Canon GX 700",
    date: "12 dec 2021",
  },
  {
    id: 4,
    img: cam4,
    title: "Camera Narne 1 Canon GX 700",
    date: "12 dec 2021",
  },
  {
    id: 5,
    img: cam5,
    title: "Camera Narne 1 Canon GX 700",
    date: "12 dec 2021",
  },
  {
    id: 6,
    img: cam6,
    title: "Camera Narne 1 Canon GX 700",
    date: "12 dec 2021",
  },
  {
    id: 7,
    img: cam4,
    title: "Camera Narne 1 Canon GX 700",
    date: "12 dec 2021",
  },
];

import fish from "../../../images/fish4.jpg";
import fish1 from "../../../images/review.jpeg";
import React from "react";
const Notes = () => {
  return (
    <div>
      <div className="mb-4">
        <img className="w-full" src={fish} alt="" />
      </div>
      <div className="bg-[#f5f9fc] rounded px-4 py-5">
        <h3 className="text-lg px-4 mb-4">Notes</h3>
        <textarea className="min-h-[150px] mb-4 w-full focus:outline-none p-5 resize-none border-2 border-[#e1e6ea]"></textarea>
        <button className="bg-primary text-white px-3 py-1 rounded-full">
          Post notes
        </button>
      </div>

      <div className="py-10 bg-white">
        <div className="flex flex-col gap-10">
          {cards.map(({ id, img, title, date, time, desc }) => {
            return (
              <div className="flex gap-8 items-center" key={id}>
                <div className=" rounded-full overflow-hidden">
                  <img
                    className=" w-full h-full object-cover"
                    src={img}
                    alt="img"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl capitalize mb-1">{title}</h3>
                  <div className="flex items-center gap-6 text-gray-500 mb-2">
                    <span>{date}</span>
                    <span>{time}</span>
                  </div>

                  <p className="text-sm text-black">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;

const cards = [
  {
    id: 1,
    img: fish1,
    title: "harold rice",
    date: "14 jan 2020",
    time: "01:29 pm",
    desc: "having a baby can be a nerve wracking experiance for new parents - not the nine months of pregnancy, i'm talking about after the infant is brought home from the hospital. it's always the same thing, by the time they have their third child they have it all figured out, but with number one it's a learning thing.",
  },
  {
    id: 2,
    img: fish1,
    title: "harold rice",
    date: "14 jan 2020",
    time: "01:29 pm",
    desc: "having a baby can be a nerve wracking experiance for new parents - not the nine months of pregnancy, i'm talking about after the infant is brought home from the hospital. it's always the same thing, by the time they have their third child they have it all figured out, but with number one it's a learning thing.",
  },
];

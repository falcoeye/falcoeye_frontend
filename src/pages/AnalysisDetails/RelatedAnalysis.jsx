import { AiOutlineCalendar } from "react-icons/ai";
import React from "react";
const RelatedAnalysis = () => {
  return (
    <div className="flex flex-col gap-8">
      {analysis.map(({ id, title, cards }) => {
        return (
          <div key={id}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1d2124] text-2xl capitalize">{title}</h3>
              <button className="underline text-[#fe4a67]">View All</button>
            </div>

            <div className="flex flex-col gap-4">
              {cards.map(({ id, desc, date, status }) => {
                return (
                  <div key={id} className="border border-[#f5f5f5] px-4 py-4">
                    <h3 className="text-base">{desc}</h3>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        style={{ padding: "4px 16px" }}
                        className="btn-primary"
                      >
                        <span>
                          <AiOutlineCalendar />
                        </span>
                        {date}
                      </button>
                      <button
                        style={{ padding: "4px 16px" }}
                        className="btn-primary"
                      >
                        {status}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RelatedAnalysis;
const analysis = [
  {
    id: 1,
    title: "related analysis",
    cards: [
      {
        id: 1,
        desc: "name of the analysis in here lorem ispum is dummy text",
        date: "20 dec 2021",
        status: "done",
      },
      {
        id: 2,
        desc: "name of the analysis in here lorem ispum is dummy text",
        date: "20 dec 2021",
        status: "error",
      },
      {
        id: 3,
        desc: "name of the analysis in here lorem ispum is dummy text",
        date: "20 dec 2021",
        status: "active",
      },
    ],
  },

  {
    id: 2,
    title: "on-going analysis",
    cards: [
      {
        id: 1,
        desc: "name of the analysis in here lorem ispum is dummy text",
        date: "20 dec 2021",
        status: "done",
      },
      {
        id: 2,
        desc: "name of the analysis in here lorem ispum is dummy text",
        date: "20 dec 2021",
        status: "error",
      },
      {
        id: 3,
        desc: "name of the analysis in here lorem ispum is dummy text",
        date: "20 dec 2021",
        status: "active",
      },
    ],
  },

  {
    id: 3,
    title: "previously analysis",
    cards: [
      {
        id: 1,
        desc: "name of the analysis in here lorem ispum is dummy text",
        date: "20 dec 2021",
        status: "done",
      },
      {
        id: 2,
        desc: "name of the analysis in here lorem ispum is dummy text",
        date: "20 dec 2021",
        status: "error",
      },
      {
        id: 3,
        desc: "name of the analysis in here lorem ispum is dummy text",
        date: "20 dec 2021",
        status: "active",
      },
    ],
  },
];

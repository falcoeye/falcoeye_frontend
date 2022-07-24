import React, { useState } from "react";
import fish from "../../images/fish3.jpeg";
import WorkflowCard from "./WorkflowCard";
import AiFilterBar from "./WorkflowsFilterBar";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../Auth/components/LoadingSpinner";

const cardList = [
  {
    id: 1,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan1",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 2,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan2",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 3,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan3",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
  {
    id: 4,
    img: fish,
    title:
      "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
    name: "rifat bin jahan4",
    date: "20 dec 2021",
    desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
  },
];

const AllWorkflows = () => {
  const [data, setData] = useState({
    items: cardList.slice(0, 2),
    hasMore: true,
    offset: 2,
  });

  const fetchMoreData = () => {
    if (data.items.length === cardList.length) {
      return setData((prevState) => ({
        ...prevState,
        hasMore: false,
      }));
    }

    setTimeout(() => {
      setData((prevState) => ({
        ...prevState,
        items: data.items.concat(cardList.slice(data.offset, data.offset + 2)),
        offset: (data.offset += 2),
      }));
    }, 3000);
  };

  console.log(data);

  return (
    <div>
      <div className="main-container">
        <div className="bg-white mt-5 rounded-[10px] p-5">
          <h3 className="text-[#525252] capitalize  text-xl flex items-center gap-5 pb-5 border-b border-[#f5f5f5] mb-4">
            Workflows
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

          <InfiniteScroll
            dataLength={data.items.length}
            next={fetchMoreData}
            hasMore={data.hasMore}
            loader={
              <div className="text-center bg-white mt-5 rounded-[10px] p-5">
                <LoadingSpinner />
              </div>
            }
          >
            <div className="flex flex-col gap-8 mt-8">
              {data.items.map((i, index) => (
                <WorkflowCard
                  key={i.id}
                  img={i.img}
                  name={i.name}
                  date={i.date}
                  title={i.title}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default AllWorkflows;

import React from "react";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import moment from "moment";

const WorkflowCard = ({ title, date, name }) => {
  return (
    <div className="flex lg:flex-row flex-col  items-center gap-4 md:gap-8 px-4 py-5 shadow rounded border border-[#f5f5f5]">
      <div className="w-full flex-[1]">
        <img
          className="w-full h-full max-h-[300px] rounded object-cover"
          src={"https://via.placeholder.com/150"}
          alt="img"
        />
      </div>
      <div className="flex-[2]">
        <h3 className="md:text-2xl capitalize mb-3 sm:text-base">{title}</h3>
        <div className="flex flex-col gap-2 text-primary text-sm">
          <p className="flex items-center gap-1 capitalize text-gray-300">
            <span>
              <AiOutlineCalendar />
            </span>
            {moment.utc(date).format("MMM DD")}
          </p>
          <p className="flex items-center gap-1 capitalize">
            <span>
              <AiOutlineUser />
            </span>
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;

import React from "react";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import moment from "moment";

import fish from "../../images/fish4.jpg";

const WorkflowCard = ({ title, date, creator }) => {
  return (
    <div className="sm:max-w-[370px] sm:my-0 sm:mx-auto md:max-w-full  flex xl:flex-row flex-col  xl:items-center gap-4  px-4 py-5 shadow rounded border border-[#f5f5f5]">
      <div className="w-full flex-[2]">
        <img
          className="w-full h-full max-h-[300px] rounded object-cover min-w-[180px] min-h-[150px]"
          src={fish}
          alt="img"
        />
      </div>
      <div className="flex-[2]">
        <h3 className="text-base capitalize mb-3  font-bold text-gray-700">
          {title}
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          <p className="flex items-center gap-1 capitalize text-gray-600 bg-gray-100 w-fit p-2 rounded-md">
            <span>
              <AiOutlineCalendar />
            </span>
            {moment.utc(date).format("MMM DD YYYY")}
          </p>
          <p className="flex items-center gap-1 capitalize text-green bg-green/5 w-fit p-2 rounded-md">
            <span>
              <AiOutlineUser />
            </span>
            {creator}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;

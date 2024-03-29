import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "../../utility/api-instance";

const WorkflowCard = ({ id, title, date, handleClick, lastElementRef }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get(`workflow/${id}/img_260.jpg`, {
        responseType: "blob",
        signal: controller.signal,
      })
      .then((res) => {
        // we can all pass them to the Blob constructor directly
        const new_blob = new Blob([res.data], { type: "image/jpg" });
        const url = URL.createObjectURL(new_blob);
        setImage(url);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  let renderedImage = (
    <div
      className={`flex justify-center items-center h-48 bg-gray-300 xl:flex-[2] ${
        loading && "animate-pulse"
      } `}
    >
      <svg
        className="w-12 h-12 text-gray-200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 640 512"
      >
        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
      </svg>
    </div>
  );

  if (image) {
    renderedImage = (
      <div
        className={`flex justify-center items-center h-48 bg-gray-300 xl:flex-[2]`}
      >
        <img src={image} alt={title} className="w-full h-full object-cover	" />
      </div>
    );
  }

  return (
    <div
      className="sm:max-w-[370px] sm:my-0 sm:mx-auto md:max-w-full md:w-full  flex xl:flex-row flex-col  xl:items-center gap-4  px-4 py-5 shadow rounded-md border border-[#f5f5f5] cursor-pointer dark:bg-slate-700 dark:border-slate-700"
      onClick={handleClick.bind(null, id)}
      ref={lastElementRef}
    >
      {renderedImage}
      <div className="xl:flex-[2]">
        <h3 className="text-base capitalize mb-3  font-bold text-gray-700 dark:text-white">
          {title}
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          <p className="flex items-center gap-1 capitalize text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white w-fit p-2 rounded-md">
            <span>
              <AiOutlineCalendar />
            </span>
            {moment.utc(date).format("MMM DD YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;

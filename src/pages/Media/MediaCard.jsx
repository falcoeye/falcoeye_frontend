import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
  AiFillCamera,
  AiFillVideoCamera,
  AiOutlineCalendar,
} from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "../../utility/api-instance";

const MediaCard = (props) => {
  const { media, handleClick } = props;
  const { id, media_type } = media;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImage = useCallback(() => {
    let url = `media/image/${id}/img_260.jpg`;
    if (media_type === "video") {
      url = `media/video/${id}/video_260.jpg`;
    }
    setLoading(true);
    axios
      .get(url, { responseType: "blob" })
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
  }, [id, media_type]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  let renderedImage = (
    <div
      className={`flex justify-center items-center h-48 bg-gray-300 ${
        loading && "animate-pulse"
      }`}
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
      <div className="flex justify-center items-center h-48 bg-gray-300 ">
        <img
          src={image}
          alt={media_type}
          className="w-full h-full object-cover	"
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-md  cursor-pointer shadow-md overflow-hidden"
      onClick={() => handleClick(id)}
    >
      {renderedImage}
      <div className="p-4 bg-white dark:bg-slate-700 h-full">
        <div
          className={`inline-flex items-center mb-3 py-1 px-2 text-base font-medium text-center text-white capitalize ${
            media_type === "image" ? "bg-sky-400" : "bg-emerald-500"
          } rounded-md`}
        >
          {media_type === "image" ? (
            <AiFillCamera className="mr-2" />
          ) : (
            <AiFillVideoCamera className="mr-2" />
          )}
          {media_type}
        </div>
        <p className="flex items-center gap-1 capitalize text-gray-600 mb-3 dark:text-white">
          <span className="mr-1">
            <AiOutlineCalendar />
          </span>
          {moment.utc(media.created_at).format("MM-DD-YYYY")}
        </p>
        <div className="flex">
          <span className="inline-flex items-center py-1 px-2 text-sm justify-center text-white capitalize bg-orange-500 rounded-md">
            {media.tags}
          </span>
        </div>
      </div>
    </div>
  );
};
export default MediaCard;

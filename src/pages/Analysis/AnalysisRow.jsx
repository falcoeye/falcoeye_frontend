import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utility/api-instance";
import ShowAnalysis from "../Modals/ShowAnalysis/ShowAnalysis";

const AnalysisRow = ({ file, lastElementRef }) => {
  const { id, workflow_id, status, name, created_at } = file;

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const openShowAnalysisModalHandler = () => {
    setShowAnalysisModal(true);
  };
  const closeShowAnalysisModalHandler = () => setShowAnalysisModal(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get(`workflow/${workflow_id}/img_260.jpg`, {
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
  }, [workflow_id]);

  let renderedImage;

  if (image) {
    renderedImage = (
      <img src={image} alt={name} className="w-full h-full object-cover" />
    );
  } else {
    renderedImage = (
      <svg
        className="w-12 h-12 text-gray-200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 640 512"
      >
        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
      </svg>
    );
  }

  let statusStyle = "";
  if (status === "active") {
    statusStyle = "text-primary";
  }
  if (status === "error") {
    statusStyle = "text-[#c16a7b]";
  }
  if (status === "done") {
    statusStyle = "text-[#74ab96]";
  }

  return (
    <>
      <tr ref={lastElementRef}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div
              className={`w-[130px] min-w-[80px] h-20 rounded-md overflow-hidden bg-gray-300 flex justify-center items-center ${
                loading && "animate-pulse"
              }`}
            >
              {renderedImage}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500 dark:text-white">
            {moment.utc(created_at).format("MM-DD-YYYY")}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className={`text-sm ${statusStyle} capitalize dark:text-white `}>
            {status}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            className="btn-primary !rounded-md"
            onClick={openShowAnalysisModalHandler}
          >
            view details
          </button>
        </td>
      </tr>

      {showAnalysisModal && (
        <tr>
          <td>
            <ShowAnalysis
              handleClose={closeShowAnalysisModalHandler}
              open={showAnalysisModal}
              id={id}
              image={image}
              workflowId={workflow_id}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default AnalysisRow;

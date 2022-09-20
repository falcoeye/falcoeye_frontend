import { Dialog, Transition } from "@headlessui/react";
import Lottie from "lottie-react";
import moment from "moment";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import noDataAnimation from "../../assets/animations/no-data.json";
import Loader from "../../Components/UI/Loader/Loader";
import axios from "../../utility/api-instance";
import AddAnalysis from "./AddAnalysis/AddAnalysis";
import "./Modals.css";

const ShowWorkflow = ({ open, handleClose, id }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(false);

  const [analysisModalOpened, setAnalysisModalOpened] = useState(false);

  const analysisModalOpenHandler = () => setAnalysisModalOpened(true);
  const analysisModalCloseHandler = () => setAnalysisModalOpened(false);

  const fetchData = useCallback(() => {
    setFetching(true);
    axios
      .get(`workflow/${id}`)
      .then((res) => {
        setData(res.data.workflow);
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
        toast.error(err.response.data.message);
      });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get(`workflow/${id}/img_original.jpg`, {
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

  let content;

  if (id && !data && fetching) {
    content = <Loader height="h-[96px]" />;
  }
  if (id && !data && !fetching) {
    content = (
      <Fragment>
        <div className="h-96">
          <Lottie
            animationData={noDataAnimation}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </Fragment>
    );
  }

  if (id && data) {
    let renderedPreview = (
      <div
        className={`flex justify-center items-center h-96 bg-gray-300 mb-3 ${
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
    if (image && !loading) {
      renderedPreview = (
        <div className="flex justify-center items-center h-96 bg-gray-300 mb-3">
          <img
            src={image}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    content = (
      <Fragment>
        {renderedPreview}
        <h3 className="text-base capitalize mb-3  font-bold text-gray-700 dark:text-white">
          {data.name}
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          <p className="flex items-center gap-1 capitalize text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-white w-fit p-2 rounded-md">
            <span>
              <AiOutlineCalendar />
            </span>
            {moment.utc(data.date).format("MMM DD YYYY")}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm mt-5 mb-5 dark:text-white">
          <p>
            <span className="font-bold inline-block mr-2">Used For:</span>
            <span className="dark:text-gray-200">{data.usedfor}</span>
          </p>
          <p>
            <span className="font-bold inline-block mr-2">Consideration:</span>
            <span className="dark:text-gray-200">{data.consideration}</span>
          </p>
          <p>
            <span className="font-bold inline-block mr-2">Assumption:</span>
            <span className="dark:text-gray-200">{data.assumption}</span>
          </p>
        </div>
        <button type="button" className="flex gap-5 sm:pt-0 pt-4">
          <span
            onClick={analysisModalOpenHandler}
            className="bg-primary text-white text-sm py-2  flex justify-center items-center md:px-4 px-3 rounded-md"
          >
            <span className="capitalize"> Create Analysis</span>
          </span>
        </button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[400]" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center md:p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full md:h-fit md:max-w-4xl md:w-11/12 transform overflow-hidden rounded-md bg-white dark:bg-slate-800 py-6 px-3 md:px-6  text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end mb-5 gap-5">
                    <button
                      className="bg-gray-100 dark:bg-gray-900 dark:text-white hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
                      onClick={handleClose}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                  <div className="max-h-[calc(100%-3rem)] lg:max-h-[calc(100vh-10rem)] overflow-y-auto pr-3">
                    {content}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {analysisModalOpened && (
        <AddAnalysis
          handleClose={analysisModalCloseHandler}
          open={analysisModalOpened}
          workflowId={id}
          topLayer
        />
      )}
    </Fragment>
  );
};
export default ShowWorkflow;

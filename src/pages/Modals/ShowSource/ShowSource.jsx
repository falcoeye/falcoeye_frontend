import { Dialog, Transition } from "@headlessui/react";
import Lottie from "lottie-react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  AiFillCamera, AiFillVideoCamera,
  AiOutlineClose
} from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import noDataAnimation from "../../../assets/animations/no-data.json";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner/LoadingSpinner";
import { addRegistery, resetRegistery } from "../../../store/sources";
import DeleteSource from "../DeleteSource";
import EditSource from "../EditSource";
import "../Modals.css";
import axios from "./../../../utility/api-instance";
import VideoCaptureModal from "./components/VideoCaptureModal";
import YoutubeView from "./components/YoutubeView";

const ShowSource = ({ open, handleClose, id }) => {
  const sources = useSelector((state) => state.sources);
  const dispatch = useDispatch()
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);

  const [captureLoading, setCaptureLoading] = useState(false);
  const [captureFailed, setCaptureFailed] = useState(false);
  const [captureMessage, setCaptureMessage] = useState(false);

  const [captureModalOpened, setCaptureModalOpened] = useState(false);
  const [registerationKey, setRegisterationKey] = useState(null);

  const [gettingCaptureStatus, setGettingCaptureStatus] = useState(false);
  const [captureStatus, setCaptureStatus] = useState(null);


  let data = sources.data.find((item) => item.id === id);

  const openDeleteModalHandler = useCallback(() => setDeleteModal(true), []);
  const closeDeleteModalHandler = useCallback(() => setDeleteModal(false), []);

  const openEditModalHandler = useCallback(() => setEditModalOpened(true), []);
  const closeEditModalHandler = useCallback(
    () => setEditModalOpened(false),
    []
  );

  const openSliderModalHandler = useCallback(
    () => setCaptureModalOpened(true),
    []
  );
  const closeSliderModalHandler = useCallback(
    () => setCaptureModalOpened(false),
    []
  );

  const captureHandler = useCallback(
    (type, length) => {
      setCaptureLoading(true);
      setCaptureFailed(false);
      setRegisterationKey(null);
      setCaptureStatus(null);
      dispatch(resetRegistery())
      axios
        .post(`/capture`, {
          camera_id: id,
          capture_type: type,
          length: length || 0,
        })
        .then((res) => {
          setCaptureMessage(res.data.message);
          setCaptureLoading(false);
          setRegisterationKey(res.data.registry_key);
          dispatch(addRegistery({
            registry_key: res.data.registry_key,
            type: type,
          }))
          handleClose()
        })
        .catch((err) => {
          setCaptureMessage(err.response.data.message);
          setCaptureLoading(false);
          setCaptureFailed(true);
        });
    },
    [dispatch, handleClose, id]
  );

  const triggerCaptureHandler = useCallback(
    (length) => {
      captureHandler("video", length);
    },
    [captureHandler]
  );

  const captureImageClickHandler = () => {
    captureHandler("image");
  };

  const checkCaptureStatus = useCallback(() => {
    setGettingCaptureStatus(true);
    axios
      .get(`/capture/${registerationKey}`)
      .then((res) => {
        setCaptureStatus(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data?.message || "Error Getting Capture Info");
      });
  }, [registerationKey]);

  useEffect(() => {
    if (registerationKey && !captureStatus) {
      checkCaptureStatus();
    }
  }, [captureStatus, checkCaptureStatus, registerationKey]);

  useEffect(() => {
    let refetchInterval;
    if (
      registerationKey &&
      captureStatus &&
      captureStatus.capture_status === "STARTED"
    ) {
      refetchInterval = setInterval(() => checkCaptureStatus(), 5000);
    }
    return () => {
      if (
        registerationKey &&
        captureStatus &&
        captureStatus.capture_status === "STARTED"
      ) {
        clearInterval(refetchInterval);
      }
    };
  }, [captureStatus, checkCaptureStatus, registerationKey]);

  let content;

  if (id && !data) {
    content = (
      <Fragment>
        <div className="flex justify-end gap-5">
          <button
            className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>
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
    const videoID = data?.url?.split("v=")[1]?.split("&")[0];
    const disableSubmit =
      sources.registery.registry_key ||
      captureLoading ||
      captureModalOpened ||
      (gettingCaptureStatus && !captureStatus) ||
      (gettingCaptureStatus && captureStatus?.capture_status === "STARTED");

    content = (
      <Fragment>
        <div className="flex justify-end gap-5">
          <button
            className="bg-red-600/90 hover:bg-red-600 text-white transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
            onClick={openDeleteModalHandler}
          >
            <MdDelete />
          </button>
          <button
            className="bg-green/70 hover:bg-green text-white transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
            onClick={openEditModalHandler}
          >
            <FaEdit />
          </button>
          <button
            className="bg-gray-50 dark:bg-gray-800 dark:text-white  hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>
        <YoutubeView videoID={videoID}  url={data.url} />
        <Fragment>
          <div className="flex items-center justify-center gap-8 mt-5">
            <button
              disabled={disableSubmit}
              className={`bg-primary/80 hover:bg-primary transition duration-300 text-white font-bold p-3 rounded-full inline-flex items-center text-xl ${
                disableSubmit && "disable_submit_btn"
              }`}
              onClick={captureImageClickHandler}
            >
              <AiFillCamera />
            </button>
            <button
              disabled={disableSubmit}
              className={`bg-primary/80 hover:bg-primary transition duration-300 text-white font-bold p-3 rounded-full inline-flex items-center text-xl  ${
                disableSubmit && "disable_submit_btn"
              }`}
              onClick={openSliderModalHandler}
            >
              <AiFillVideoCamera />
            </button>
          </div>
          {captureLoading && (
            <div className="flex items-center mt-2">
              <LoadingSpinner />
              <span className="font-semibold text-gray-700 ml-2 dark:text-white">
                Capture in progress.
              </span>
            </div>
          )}
          {captureFailed && (
            <div className="flex items-center mt-2">
              <span className="font-semibold text-red-700 capitalize">
                {captureMessage}
              </span>
            </div>
          )}
        </Fragment>
        <EditSource
          open={editModalOpened}
          handleClose={closeEditModalHandler}
          id={id}
          handleShowClose={handleClose}
        />
        <DeleteSource
          open={deleteModal}
          handleClose={closeDeleteModalHandler}
          id={id}
          handleShowClose={handleClose}
        />
        <VideoCaptureModal
          open={captureModalOpened}
          handleClose={closeSliderModalHandler}
          onTriggerCapture={triggerCaptureHandler}
        />
      </Fragment>
    );
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[450]" onClose={handleClose}>
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
              <Dialog.Panel className="w-full h-screen md:h-fit md:max-w-4xl md:w-11/12 transform overflow-hidden rounded-md bg-white dark:bg-slate-800 py-6 px-3 md:px-6  text-left align-middle shadow-xl transition-all">
                {content}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShowSource;

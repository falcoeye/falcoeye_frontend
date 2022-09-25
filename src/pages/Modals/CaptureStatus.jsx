import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
    AiFillCheckCircle,
    AiFillCloseCircle, AiOutlineClose
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import axios from "../../utility/api-instance";
import PreviewCapture from "./PreviewCapture";
import { MdDelete } from 'react-icons/md';
import DeleteCapture from "./DeleteCapture";


const CaptureStatusModal = props => {

    const registery = useSelector((state) => state.sources.registery);

    const { registry_key: registerationKey, type: captureType } = registery

    const [captureModalOpened, setCaptureModalOpened] = useState(false)

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [gettingCaptureStatus, setGettingCaptureStatus] = useState(false);
    const [captureStatus, setCaptureStatus] = useState(null);

    const [capturePreviewOpened, setCapturePreviewOpened] = useState(false);

    const captureModalOpenHandler = () => {
        setCaptureModalOpened(true)
    }
    const captureModalCloseHandler = () => {
        setCaptureModalOpened(false)
    }

    const capturePreviewOpenHandler = useCallback(
        () => setCapturePreviewOpened(true),
        []
    );
    const capturePreviewCloselHandler = useCallback(
        () => setCapturePreviewOpened(false),
        []
    );

    const openDeleteModalHandler = useCallback(
        () => setDeleteModalOpened(true),
        []
    );
    const closeDeleteModalHandler = useCallback(
        () => setDeleteModalOpened(false),
        []
    );

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
        if (registerationKey && captureStatus && captureStatus.capture_status === "STARTED") {
            refetchInterval = setInterval(() => checkCaptureStatus(), 5000);
        }
        return () => {
            if (registerationKey && captureStatus && captureStatus.capture_status === "STARTED") {
                clearInterval(refetchInterval);
            }
        };
    }, [captureStatus, checkCaptureStatus, registerationKey]);

    let content;

    if (registerationKey) {
        content = (
            <Fragment>
                <div className="">
                    {gettingCaptureStatus && (
                        <div className="flex items-center my-2">
                            <span className="font-semibold text-gray-700 mr-2 dark:text-white">
                                Your Capture is in progress.
                            </span>
                            {captureStatus?.capture_status === "STARTED" && <LoadingSpinner />}
                            {captureStatus?.capture_status === "SUCCEEDED" && (
                                <span className="text-emerald-400">
                                    <AiFillCheckCircle />
                                </span>
                            )}
                            {captureStatus?.capture_status === "FAILED" && (
                                <span className="text-rose-700	">
                                    <AiFillCloseCircle />
                                </span>
                            )}
                        </div>
                    )}
                    {captureStatus?.capture_status === "SUCCEEDED" && (
                        <div className="flex mt-4">
                            <button
                                onClick={capturePreviewOpenHandler}
                                type="button"
                                className="capitalize focus:outline-none text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-green/30 font-medium rounded-md text-sm px-5 py-2.5"
                            >
                                preview
                            </button>
                            <PreviewCapture
                                type={captureType}
                                open={capturePreviewOpened}
                                handleClose={capturePreviewCloselHandler}
                                registerKey={registerationKey}
                            />
                        </div>
                    )}
                    {captureStatus?.capture_status === "FAILED" && (
                        <div className="flex mt-3">
                            <span className="font-semibold text-red-700 capitalize">
                                Your Capture Failed
                            </span>
                        </div>
                    )}
                </div>
                {deleteModalOpened && (
                    <DeleteCapture
                        open={deleteModalOpened}
                        handleClose={closeDeleteModalHandler}
                        registerKey={registerationKey}
                        handleShowClose={captureModalCloseHandler}
                    />
                )}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <button onClick={captureModalOpenHandler} disabled={!registerationKey} type="button" className="inline-flex gap-3 p-2 capitalize bg-rose-600 text-white text-sm   flex justify-center items-center rounded-md disabled:bg-gray-700 disabled:text-gray-400  ">
                <span className="capitalize"> Capture in Progress</span>
                {registerationKey && (
                    <span className="ml-1">
                        <LoadingSpinner small />
                    </span>
                )}
            </button>
            <Transition appear show={captureModalOpened} as={Fragment}>
                <Dialog as="div" className="relative z-[400]" onClose={captureModalCloseHandler}>
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
                                <Dialog.Panel className="w-full h-screen md:h-fit md:max-h-[90vh] md:max-w-4xl md:w-11/12 transform overflow-hidden rounded-md bg-white dark:bg-slate-800 py-6 px-3 md:px-6  text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-end mb-5 gap-5">
                                        <button
                                            className="bg-red-600/90 hover:bg-red-600 text-white  transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
                                            onClick={openDeleteModalHandler}
                                        >
                                            <MdDelete />
                                        </button>
                                        <button
                                            className="bg-gray-100 dark:bg-gray-900 dark:text-white hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
                                            onClick={captureModalCloseHandler}
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                    <div className="max-h-[calc(100vh-100px)] md:max-h-[calc(90vh-100px)] overflow-y-auto pr-3">
                                        {content}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </Fragment>
    )
}
export default CaptureStatusModal;
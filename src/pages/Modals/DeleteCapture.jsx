import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { resetRegistery } from "../../store/sources";
import axios from "../../utility/api-instance";
import "./Modals.css";

const DeleteCapture = ({ handleClose, registerKey, open, handleShowClose }) => {
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState();

    const deleteCaptureHandler = () => {
        setDeleting(true);
        let url = "/capture/";
        axios
            .delete(`${url}${registerKey}`)
            .then((res) => {
                handleClose();
                dispatch(resetRegistery());
                handleShowClose();
                toast.success("Capture has been deleted successfully");
            })
            .catch((err) => {
                setDeleting(false);
                toast.error(
                    err.response?.data?.message || "Error Deleting Capture, Try again later"
                );
            });
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[460]" onClose={handleClose}>
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                                <div className="text-[#42a7df] text-lg font-semibold text-center dark:text-white">
                                    Are You Sure You Want To Delete This Capture ?
                                </div>

                                <div className="flex items-center justify-center mt-5 gap-3">
                                    <button
                                        onClick={deleteCaptureHandler}
                                        type="button"
                                        disabled={deleting}
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5"
                                    >
                                        {deleting ? <LoadingSpinner /> : "Yes"}
                                    </button>
                                    <button
                                        onClick={handleClose}
                                        type="button"
                                        className="focus:outline-none text-white bg-green/70 hover:bg-green focus:ring-4 focus:ring-green/30 font-medium rounded-md text-sm px-5 py-2.5"
                                    >
                                        No
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DeleteCapture;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteSource } from "../../store/sources";
import axios from "../../utility/auth-instance";
import "./Modals.css";

const DeleteSource = ({ handleClose, id, open, onCloseSourceModal }) => {
  const dispatch = useDispatch();
  const deleteSourceHandler = () => {
    axios
      .delete(`/camera/${id}`)
      .then((res) => {
        handleClose();
        dispatch(deleteSource(id));
        setTimeout(() => {
          onCloseSourceModal();
        }, 100);
        toast.success("Source has been deleted successfully");
      })
      .catch((err) => {
        handleClose();
        toast.error(
          err.response?.data?.message ||
            "Error Deleting Source, Try again later"
        );
      });
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[300]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="text-[#42a7df] text-lg font-semibold text-center">
                  Are You Sure You Want To Delete This Source ?
                </div>

                <div className="flex items-center justify-center mt-5 gap-3">
                  <button
                    onClick={deleteSourceHandler}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleClose}
                    type="button"
                    className="focus:outline-none text-white bg-green/70 hover:bg-green focus:ring-4 focus:ring-green/30 font-medium rounded-lg text-sm px-5 py-2.5"
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

export default DeleteSource;

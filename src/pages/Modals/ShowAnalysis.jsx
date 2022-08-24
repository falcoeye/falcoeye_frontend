import { Dialog, Transition } from "@headlessui/react";
import Lottie from "lottie-react";
import moment from "moment";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import noDataAnimation from "../../assets/animations/no-data.json";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { deleteAnalysis } from "../../store/analysis";
import axios from "../../utility/api-instance";
import "./Modals.css";

const ShowAnalysis = ({
  handleClose,
  open,
  analysisData,
  loadingAnalysisData,
  id,
  onClearAnalysisData,
}) => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    handleClose();
    onClearAnalysisData();
  };

  const deleteAnalysisHandler = () => {
    axios
      .delete(`/analysis/${id}`)
      .then((res) => {
        closeModalHandler();
        dispatch(deleteAnalysis(id));
        toast.success("Analysis deleted successfully");
      })
      .catch((err) => {
        closeModalHandler();
        toast.error(
          err.response?.data?.message ||
            "Error Deleting Analysis, Try again later"
        );
      });
  };

  let content;

  if (!loadingAnalysisData && !analysisData) {
    content = (
      <Fragment>
        <div className="flex justify-end gap-5">
          <button
            className="bg-gray-50 dark:bg-gray-800 dark:text-white hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
            onClick={closeModalHandler}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="h-96 mt-6">
          <Lottie
            animationData={noDataAnimation}
            loop={true}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "inherit",
            }}
          />
        </div>
      </Fragment>
    );
  } else if (!loadingAnalysisData && analysisData) {
    const { name, created_at, status } = analysisData.analysis;

    content = (
      <Fragment>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-gray-700 text-xl  font-bold dark:text-white">
              {name}
            </h2>
            <p
              className={`capitalize text-sm  ${
                status === "Active"
                  ? "text-primary"
                  : status === "Error"
                  ? "text-[#c16a7b]"
                  : "text-green"
              } bg-gray-50 w-fit py-2 px-5 rounded-full font-semibold`}
            >
              {status}
            </p>
          </div>

          <p className="flex items-center gap-1 capitalize text-gray-400 dark:text-gray-300">
            <span className="text-gray-500 font-semibold dark:text-white">
              Created at :
            </span>
            {moment.utc(created_at).format("MMM DD YYYY")}
          </p>
        </div>

        <div className="flex items-center justify-center mt-5">
          <button
            onClick={deleteAnalysisHandler}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Delete
          </button>
        </div>
      </Fragment>
    );
  } else {
    content = (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[300]" onClose={closeModalHandler}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                {content}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShowAnalysis;

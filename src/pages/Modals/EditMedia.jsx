import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Modals.css";
import axios from "../../utility/api-instance";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { editMedia } from "../../store/media";
import { useDispatch } from "react-redux";

const EditMedia = ({ open, handleClose, id }) => {
  const { data } = useSelector((state) => state.media);
  const dispatch = useDispatch();

  const [mediaData, setMediaData] = useState({});
  const [sendingRequest, setSendingRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (!id) return;
    let itemData = data.find((item) => item.id === id);
    setMediaData(itemData);
  }, [data, id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setMediaData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const sendRequestHandler = async (type) => {
    setSendingRequest(true);
    try {
      const res = await axios.put(`/media/${type}/${id}`, mediaData);
      if (type === "video") {
        dispatch(editMedia({ ...res.data.video, media_type: type }));
      } else {
        dispatch(editMedia({ ...res.data.image, media_type: type }));
      }
      handleClose();
      toast.success("Media has been updated successfully");
    } catch (error) {
      console.log(error.response);
      setSendingRequest(false);
      setErrorMessage(error.response.data.message || "Something went wrong");
      if (error.response.data.errors) {
        let errorObjectKeys = Object.keys(error.response.data.errors);
        errorObjectKeys.forEach((key) => {
          toast.error(`${key}: ${error.response.data.errors[`${key}`]}`);
        });
      }
    }
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    sendRequestHandler(mediaData.media_type);
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
                <div className="cmb_heading">Edit a Media</div>
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    id="note"
                    className="modal_form_input !w-full !ml-0 dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                    name="note"
                    placeholder="Note"
                    onChange={inputChangeHandler}
                    value={mediaData.note}
                  />
                  <input
                    type="text"
                    id="tags"
                    className="modal_form_input !w-full !ml-0 dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white"
                    name="tags"
                    placeholder="Tags"
                    onChange={inputChangeHandler}
                    value={mediaData.tags}
                  />

                  {errorMessage && <p className="error_text">{errorMessage}</p>}

                  <button
                    style={{ margin: "25px auto", display: "block" }}
                    className={`login_form_btn`}
                    onClick={submitFormHandler}
                  >
                    {sendingRequest ? <LoadingSpinner /> : "Edit Media"}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditMedia;

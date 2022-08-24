import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { Fragment, useCallback } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { addMedia } from "../../store/media";
import axios from "../../utility/api-instance";
import "./Modals.css";

const UploadMedia = ({ handleClose, open }) => {
  const dispatch = useDispatch();

  const [videoURL, setVideoURL] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleImageUpload = useCallback(async (event) => {
    const file = event.target.files[0];

    let formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        setVideoURL(res.data.temporary_path);
        setVideoKey(res.data.registry_key);
      })
      .catch((err) => {
        setLoading(false);
        const message = err.response.data.message;
        toast.error(message);
      });
  }, []);

  let content;
  if (!loading && videoURL) {
    content = (
      <video className="w-full h-full object-cover" controls autoPlay>
        <source src={videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else if (!loading && !videoURL) {
    content = (
      <p className="text-gray-300 text-xl font-bold ">Select a video</p>
    );
  } else {
    content = <LoadingSpinner />;
  }

  const submitVideoHandler = async () => {
    setSubmitLoading(true);

    try {
      const res = await axios.post(`/media/video`, {
        registry_key: videoKey,
      });
      setSubmitLoading(false);
      dispatch(addMedia(res.data.video));
      toast.success(res.data.message);
      handleClose();
    } catch (error) {
      setSubmitLoading(false);
      toast.error(error.data.message || "Something went wrong!");
    }
  };

  let ButtonsContent;
  if (!loading && videoURL) {
    ButtonsContent = (
      <button
        type="button"
        onClick={submitVideoHandler}
        className="text-white bg-green/90 hover:bg-green rounded-lg font-medium text-base px-5 py-2.5  focus:outline-none flex items-center"
      >
        {submitLoading && (
          <svg
            role="status"
            className="inline mr-3 w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        )}
        Submit Video
      </button>
    );
  } else {
    ButtonsContent = (
      <label
        htmlFor="image"
        className={`relative transition h-fit duration-300 p-2 rounded-full inline-flex items-center justify-center bg-green cursor-pointer text-white`}
      >
        <BsFillCameraVideoFill className="relative fill-current z-50" />
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
            zIndex: "-1",
          }}
          type="file"
          id="image"
          accept="video/*"
          className="modal_form_input "
          name="file"
          placeholder="Upload Media"
          onChange={handleImageUpload}
        />
      </label>
    );
  }

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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-700 py-12 px-6 text-left align-middle shadow-xl transition-all">
                <div
                  className={`${
                    videoURL ? "" : "border"
                  }  border-dashed border-gray-500 aspect-video flex justify-center items-center`}
                >
                  {content}
                </div>

                <div className="flex justify-center items-end mt-5 min-h-[45px]">
                  {ButtonsContent}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UploadMedia;

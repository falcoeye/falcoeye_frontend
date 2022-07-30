import { Dialog, Transition } from '@headlessui/react';
import Lottie from 'lottie-react';
import React, { Fragment, useCallback, useState } from 'react';
import { AiFillCamera, AiOutlineClose } from 'react-icons/ai';
import { BsSliders } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import noDataAnimation from '../../../assets/animations/no-data.json';
import LoadingSpinner from '../../../Components/UI/LoadingSpinner/LoadingSpinner';
import DeleteSource from '../DeleteSource';
import EditSource from '../EditSource';
import VideoCaptureModal from './components/VideoCaptureModal';
import YoutubeView from './components/YoutubeView';
import "../Modals.css";

const ShowSource = ({ open, onCloseSourceModal, id }) => {
  const sources = useSelector((state) => state.sources);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [captureLoading, setCaptureLoading] = useState(false);
  const [captureFailed, setCaptureFailed] = useState(false);
  const [captureModalOpened, setCaptureModalOpened] = useState(false);

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

  let data;

  if (id) {
    data = sources.data.find((item) => item.id === id);
  }

  const closeSourceModalHandler = () => {
    onCloseSourceModal();
    setTimeout(() => {
      setCaptureFailed(false);
    }, 300);
  };
  const triggerCaptureHandler = () => {
    setCaptureLoading(true);
    setCaptureFailed(false);

    setTimeout(() => {
      setCaptureLoading(false);
      setCaptureFailed(true);
    }, 1500);
  };

  let content;

  if (id && !data) {
    content = (
      <Fragment>
        <div className="flex justify-end gap-5">
          <button
            className="bg-gray-50 hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
            onClick={closeSourceModalHandler}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="h-96">
          <Lottie
            animationData={noDataAnimation}
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </Fragment>
    );
  }
  if (id && data) {
    const videoID = data?.url?.split('v=')[1]?.split('&')[0];
    const disableSubmit = captureLoading || captureModalOpened;
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
            className="bg-gray-50 hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
            onClick={closeSourceModalHandler}
          >
            <AiOutlineClose />
          </button>
        </div>
        <YoutubeView videoID={videoID} />
        {videoID && (
          <>
            <div className="flex items-center justify-center gap-8 mt-5">
              <button
                disabled={disableSubmit}
                className={`bg-primary/80 hover:bg-primary transition duration-300 text-white font-bold p-3 rounded-full inline-flex items-center text-xl ${ disableSubmit && "disable_submit_btn" }`}
                onClick={triggerCaptureHandler}
              >
                <AiFillCamera />
              </button>
              <button
                disabled={disableSubmit}
                className={`bg-primary/80 hover:bg-primary transition duration-300 text-white font-bold p-3 rounded-full inline-flex items-center text-xl  ${ disableSubmit && "disable_submit_btn" }`}
                onClick={openSliderModalHandler}
              >
                <BsSliders />
              </button>
            </div>

            {captureLoading && (
              <div className="flex items-center mt-2">
                <LoadingSpinner />{' '}
                <span className="font-semibold text-gray-700">
                  Capture in progress.
                </span>
              </div>
            )}
            {captureFailed && (
              <div className="flex items-center mt-2">
                <span className="font-semibold text-red-700">
                  Capture failed.
                </span>
              </div>
            )}
          </>
        )}
        <EditSource
          open={editModalOpened}
          handleClose={closeEditModalHandler}
          id={id}
        />
        <DeleteSource
          open={deleteModal}
          handleClose={closeDeleteModalHandler}
          id={id}
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
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[200]"
          onClose={closeSourceModalHandler}
        >
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
                <Dialog.Panel className="w-full h-screen md:h-fit md:max-w-4xl md:w-11/12 transform overflow-hidden md:rounded-2xl bg-white py-6 px-3 md:px-6  text-left align-middle shadow-xl transition-all">
                  {content}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShowSource;

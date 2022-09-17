import { Dialog, Transition } from '@headlessui/react';
import Lottie from 'lottie-react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
  AiFillCamera,
  AiFillVideoCamera,
  AiOutlineClose,
} from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import noDataAnimation from '../../assets/animations/no-data.json';
import DeleteMedia from './DeleteMedia';
import './Modals.css';
import axios from '../../utility/api-instance';
import { useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import EditMedia from './EditMedia';

const ShowMedia = ({ open, handleClose, id }) => {
  const media = useSelector((state) => state.media);
  let data = useRef(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMediaOpened, setEditMediaOpened] = useState(false);

  const openEditModalHandler = useCallback(() => setEditMediaOpened(true), []);
  const closeEditModalHandler = useCallback(
    () => setEditMediaOpened(false),
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

  useEffect(() => {
    const controller = new AbortController();

    if (id && data.current) {
      const mediaType = data.current.media_type;
      let url = `media/image/${id}/img_original.jpg`;
      let type = { responseType: 'blob', signal: controller.signal };
      if (mediaType === 'video') {
        url = `media/video/${id}/video_original.mp4`;
        type = { signal: controller.signal };
      }
      setLoading(true);
      axios
        .get(url, type)
        .then((res) => {
          if (mediaType === 'image') {
            // we can all pass them to the Blob constructor directly
            const new_blob = new Blob([res.data], { type: 'image/jpg' });
            const url = URL.createObjectURL(new_blob);
            setMediaPreview(url);
            return;
          }
          setLoading(false);
          setMediaPreview(res.data);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  if (id) {
    data.current = media.data.find((item) => item.id === id);
  }

  let content;

  if (id && !data.current) {
    content = (
      <Fragment>
        <div className="flex justify-end gap-5">
          <button
            className="bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:text-white transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
            onClick={handleClose}
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

  if (id && data.current) {
    let renderedPreview = (
      <div
        className={`flex justify-center items-center h-96 bg-gray-300 dark:bg-gray-700 mb-3 ${loading && 'animate-pulse'
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
    if (mediaPreview && data.current.media_type === 'image') {
      renderedPreview = (
        <div className="flex justify-center items-center h-96 bg-gray-300 dark:bg-gray-700 mb-3">
          <img
            src={mediaPreview}
            alt={data.current.media_type}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    if (mediaPreview && data.current.media_type === 'video') {
      renderedPreview = (
        <div className="flex justify-center items-center h-96 bg-gray-300 dark:bg-gray-700 mb-3">
          <video className="w-full h-full object-cover block" controls>
            <source src={mediaPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    content = (
      <Fragment>
        <div className="flex justify-end gap-5 mb-5">
          <button
            className="bg-red-600/90 hover:bg-red-600 text-white  transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
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
            className="bg-gray-50 dark:bg-gray-800 dark:text-white hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>
        {renderedPreview}
        <div
          className={`inline-flex items-center mb-3 py-1 px-2 text-base font-medium text-center text-white capitalize ${media.media_type === 'image' ? 'bg-sky-400' : 'bg-emerald-500'
            } rounded-md`}
        >
          {data.current.media_type === 'image' ? (
            <AiFillCamera className="mr-2" />
          ) : (
            <AiFillVideoCamera className="mr-2" />
          )}
          {data.current.media_type}
        </div>
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900  capitalize dark:text-white">
          {data.current.note}
        </h5>
        <div className="flex">
          <span className="inline-flex items-center py-1 px-2 text-sm justify-center text-white capitalize bg-orange-500 rounded-md">
            {data.current.tags}
          </span>
        </div>
        {deleteModalOpened && (
          <DeleteMedia
            open={deleteModalOpened}
            handleClose={closeDeleteModalHandler}
            id={id}
            type={data.current.media_type}
            handleShowClose={handleClose}
          />
        )}
        {editMediaOpened && (
          <EditMedia
            open={editMediaOpened}
            handleClose={closeEditModalHandler}
            id={id}
          />
        )}
      </Fragment>
    );
  }

  return (
    <>
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
    </>
  );
};
export default ShowMedia;

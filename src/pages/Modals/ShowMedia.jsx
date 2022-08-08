import { Dialog, Transition } from '@headlessui/react';
import Lottie from 'lottie-react';
import React, { Fragment, useCallback, useState } from 'react';
import {
	AiFillCamera,
	AiFillVideoCamera, AiOutlineClose
} from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import noDataAnimation from '../../assets/animations/no-data.json';
import DeleteMedia from './DeleteMedia';
import './Modals.css';

const ShowMedia = ({ open, handleClose, id }) => {
	const media = useSelector((state) => state.media);
	const [deleteModalOpened, setDeleteModalOpened] = useState(false);

	const openDeleteModalHandler = useCallback(
		() => setDeleteModalOpened(true),
		[]
	);
	const closeDeleteModalHandler = useCallback(
		() => setDeleteModalOpened(false),
		[]
	);

	let data;

	if (id) {
		data = media.data.find((item) => item.id === id);
	}

	let content;

	if (id && !data) {
		content = (
			<Fragment>
				<div className="flex justify-end gap-5">
					<button
						className="bg-gray-50 hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
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

	if (id && data) {
		content = (
			<Fragment>
				<div className="flex justify-end gap-5 mb-5">
					<button
						className="bg-red-600/90 hover:bg-red-600 text-white transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
						onClick={openDeleteModalHandler}
					>
						<MdDelete />
					</button>
					<button
						className="bg-gray-50 hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
						onClick={handleClose}
					>
						<AiOutlineClose />
					</button>
				</div>
				<div className="flex justify-center items-center h-96 bg-gray-300 mb-3">
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
				{/* <h5 className="mb-3 text-xl font-semibold tracking-tight text-gray-900  capitalize ">
					{data.note}
				</h5> */}
				<div
					className={`inline-flex items-center mb-3 py-1 px-2 text-base font-medium text-center text-white capitalize ${media.media_type === 'image' ? 'bg-sky-400' : 'bg-emerald-500'
						} rounded-lg`}
				>
					{data.media_type === 'image' ? (
						<AiFillCamera className="mr-2" />
					) : (
						<AiFillVideoCamera className="mr-2" />
					)}
					{data.media_type}
				</div>
				<DeleteMedia
					open={deleteModalOpened}
					handleClose={closeDeleteModalHandler}
					id={id}
					type={data.media_type}
					handleShowClose={handleClose}
				/>
			</Fragment>
		);
	}

	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-[200]" onClose={handleClose}>
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
	);
};
export default ShowMedia;

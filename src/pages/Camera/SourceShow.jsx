import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteSource } from '../../store/sources';
import axios from '../../utility/auth-instance';

export default function SourceShow(props) {
    const { open, handleClose, id, openEditModalHandler } = props;

    const dispatch = useDispatch()
    const sources = useSelector((state) => state.sources);

    let data = null;

    if (id) {
        data = sources.data.find( item => item.id === id );
    }


    const deleteSourceHandler = (  ) => {
        axios.delete(`/camera/${id}`)
            .then((res) => {
                handleClose()
                dispatch(deleteSource(id))
                toast.success('Source deleted successfully')
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || 'Error Deleting Source, Try again later');
            });
    }

    let content;

    if (!data) {
        content = (
            <Fragment>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    There is no info about this source
                </Dialog.Title>
            </Fragment>
        );
    }
    if (data) {
        content = (
            <Fragment>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    {data.name}
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse cumque ex possimus quisquam illum pariatur obcaecati ad rerum quas, neque magni nemo. Facilis atque aliquam, alias commodi quae exercitationem esse!
                    </p>
                </div>
                <div className="mt-4">
                    <button
                        type="button"
                        className="mr-3 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={openEditModalHandler}
                    >
                        <AiFillEdit className="mr-2"  />
                        Edit
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={deleteSourceHandler}
                    >
                        <AiFillDelete className="mr-2"  />
                        Delete
                    </button>
                </div>
            </Fragment>
        );
    }

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                                {content}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

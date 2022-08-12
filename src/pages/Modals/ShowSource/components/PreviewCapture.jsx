import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import noDataAnimation from '../../../../assets/animations/no-data.json';
import Lottie from 'lottie-react';
import Loader from '../../../../Components/UI/Loader/Loader';
import '../../Modals.css';
import { toast } from 'react-toastify';
import axios from './../../../../utility/api-instance';
import LoadingSpinner from '../../../../Components/UI/LoadingSpinner/LoadingSpinner';

const PreviewCapture = ({ handleClose, open, registerKey, type }) => {
    const [captureData, setCaptureData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [data, setData] = useState({
        note: '',
        tags: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });
    };

    const getCaptureData = useCallback(() => {
        setLoading(true);
        axios
            .get(`/capture/${registerKey}`)
            .then((res) => {
                setLoading(false);
                setCaptureData(res.data);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.data?.message || 'Error Getting Capture Info');
            });
    }, [registerKey]);

    const approveCapture = useCallback(() => {
        setSubmitting(true);
        let url = `/media/image`
        if ( type === 'video' ) {
            url = `/media/video`
        }
        axios
            .post(url, {
                ...data,
                registry_key: registerKey,
            })
            .then((res) => {
                setSubmitting(false);
                handleClose();
                toast.success('Your Capture has been submitted');
            })
            .catch((err) => {
                setSubmitting(false);
                toast.error(err.data?.message || 'Error Submitting Capture');
            });
    }, [data, handleClose, registerKey, type]);

    useEffect(() => {
        getCaptureData();
    }, [getCaptureData]);

    let content;

    if (loading) {
        content = <Loader height="96" />;
    } else if (!loading && !captureData) {
        content = (
            <div className="h-96">
                <Lottie
                    animationData={noDataAnimation}
                    loop={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        );
    } else if (captureData && !loading) {
        let mediaPreview;

        if (type === 'image') {
            mediaPreview = (
                <img
                    src={captureData.temporary_path}
                    alt="capture"
                    className="max-w-full aspect-video block"
                />
            );
        } else if (type === 'video') {
            mediaPreview = (
                <video className="max-w-full aspect-video block" controls>
                    <source src={captureData.temporary_path} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            );
        }

        content = (
            <div>
                <div className="aspect-video my-5">{mediaPreview}</div>
                <form>
                    <input
                        type="text"
                        id="note"
                        className="modal_form_input"
                        name="note"
                        placeholder="Note"
                        onChange={handleChange}
                        value={data.note}
                    />
                    <input
                        type="text"
                        id="tags"
                        className="modal_form_input"
                        name="tags"
                        placeholder="Tags"
                        onChange={handleChange}
                        value={data.tags}
                    />
                </form>
                <div className="flex items-center justify-center mt-5 ">
                    <button
                        onClick={approveCapture}
                        type="button"
                        className="focus:outline-none text-white bg-green hover:bg-green/70 focus:ring-4 focus:ring-green/30 font-medium rounded-lg text-sm px-5 py-2.5 mr-3"
                    >
                        {submitting ? <LoadingSpinner /> : 'Submit'}
                    </button>
                    <button
                        onClick={handleClose}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red/30 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Capture again
                    </button>
                </div>
            </div>
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
                            <Dialog.Panel className="w-full max-w-lg  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all text-center">
                                <div className="text-[#42a7df] text-lg font-semibold text-center">
                                    Preview Capture
                                </div>
                                {content}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default PreviewCapture;

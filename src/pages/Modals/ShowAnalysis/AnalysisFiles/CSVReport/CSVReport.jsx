import { Dialog, Transition } from '@headlessui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { AiOutlineClose, AiOutlineDownload } from 'react-icons/ai';
import { usePapaParse, useCSVDownloader } from 'react-papaparse';
import { toast } from 'react-toastify';
import Loader from '../../../../../Components/UI/Loader/Loader';
import axios from '../../../../../utility/api-instance';
const CSVReport = (props) => {
    const { id, meta, handleClose, open } = props;
    const { readString } = usePapaParse();
    const { CSVDownloader, Type } = useCSVDownloader();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [list, setList] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        let url = `/analysis/${id}/${meta.filename}`;
        axios
            .get(url)
            .then((res) => {
                setLoading(false);
                setData(res.data);
                res.data &&
                    readString(res.data, {
                        header: true,
                        worker: true,
                        complete: (results) => {
                            setList(results.data);
                        },
                    });
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data.message);
            });
        return () => {
            controller.abort();
        };
    }, [id, readString, meta]);

    let content;
    if (loading && !data) {
        content = <Loader height="h-96" />;
    } else if (!loading && data && list) {
        content = (
            <div className="max-h-[calc(var(--vh)*100-108px)] md:max-h-[calc(90vh-108px)] overflow-y-auto overflow-y-auto pr-3">
                <div class="overflow-x-auto relative">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    {meta['x-axis']}
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    {meta['y-axis']}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => {
                                return (
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item[meta['x-axis']]}
                                        </th>
                                        <td class="py-4 px-6">{item[meta['y-axis']]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[300] modal-wrapper" onClose={handleClose}>
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
                            <Dialog.Panel className="w-full modal-wrapper md:h-fit md:max-h-[90vh] md:max-w-4xl md:w-11/12 transform overflow-hidden rounded-md bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-end mb-7 gap-3">
                                    {!loading && list && (
                                                <CSVDownloader
                                                    type={Type.Button}
                                                    filename={meta.filename}
                                                    bom={true}
                                                    config={{
                                                        delimiter: ';',
                                                    }}
                                                    data={data}
                                                    className="capitalize bg-rose-600 text-white text-sm py-1.5  flex justify-center items-center px-3 rounded-md ml-3"
                                                >
                                                    <span className="capitalize"> download data</span>
                                                    <span className="ml-2">
                                                        <AiOutlineDownload />
                                                    </span>
                                                </CSVDownloader>
                                    )}
                                    <button
                                        className="bg-gray-50 dark:bg-gray-800 dark:text-white hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
                                        onClick={handleClose}
                                    >
                                        <AiOutlineClose />
                                    </button>
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
export default CSVReport;

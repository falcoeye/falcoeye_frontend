import { Dialog, Transition } from '@headlessui/react';
import moment from 'moment';
import { Fragment } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { analysisActions } from '../../store/analysis';
import axios from '../../utility/api-instance';
import noDataAnimation from '../../assets/animations/no-data.json';
import Lottie from 'lottie-react';
import { AiOutlineClose } from 'react-icons/ai';
import './Modals.css';

const ShowAnalysis = ({ handleClose, id, open }) => {
  const analysis = useSelector((state) => state.analysis.data);
  const data = analysis.find( item => item.id === id )
  const dispatch = useDispatch();
  const deleteAnalysisHandler = () => {
    axios
      .delete(`/analysis/${id}`)
      .then((res) => {
        handleClose();
        dispatch(analysisActions.deleteAnalysis(id));
        toast.success('Analysis deleted successfully');
      })
      .catch((err) => {
        handleClose();
        toast.error(
          err.response?.data?.message ||
          'Error Deleting Analysis, Try again later'
        );
      });
  };

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
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-gray-700 text-xl  font-bold">
              {data.name}
            </h2>
            <p
              className={`capitalize text-sm  ${data.status === 'Active'
                  ? 'text-primary'
                  : data.status === 'Error'
                    ? 'text-[#c16a7b]'
                    : 'text-green'
                } bg-gray-50 w-fit py-2 px-5 rounded-full font-semibold`}
            >
              {data.status}
            </p>
          </div>

          <p className="flex items-center gap-1 capitalize text-gray-400">
            <span className="text-gray-500 font-semibold">
              Created at :
            </span>
            {moment.utc(data.created_at).format('MMM DD YYYY')}
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
    )
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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

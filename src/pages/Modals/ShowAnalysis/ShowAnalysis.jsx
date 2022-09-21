import { Dialog, Transition } from '@headlessui/react';
import Lottie from 'lottie-react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import noDataAnimation from '../../../assets/animations/no-data.json';
import Loader from '../../../Components/UI/Loader/Loader';
import { Cookies } from '../../../shared/utility';
import { deleteAnalysis } from '../../../store/analysis';
import apiInstance from '../../../utility/api-instance';
import axios from 'axios';
import '../Modals.css';
import ShowWorkflow from '../ShowWorkflow';
import AnalysisFiles from './AnalysisFiles/AnalysisFiles';

const ShowAnalysis = ({ handleClose, open, id, image, workflowId }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loadingAnalysisData, setLoadingAnalysisData] = useState(true);
  const [analysisMeta, setAnalysisMeta] = useState(null);
  const [workflowData, setWorkflowData] = useState(null);
  const [loadingWorkflowData, setLoadingWorkflowData] = useState(true);
  const [showWorkflowOpened, setShowWorkflowOpened] = useState(false);

  const [deletinganalysis, setDeletingAnalysis] = useState(false)

  const openWorkflowModalHandler = useCallback(() => {
    if (workflowData) {
      setShowWorkflowOpened(true);
    }
  }, [workflowData]);
  const closeWorkflowModalHandler = useCallback(() => {
    setShowWorkflowOpened(false);
  }, []);

  const fetchAnalysisDataHandler = useCallback(() => {
    apiInstance
      .get(`/analysis/${id}`)
      .then((res) => {
        setAnalysisData(res.data);
        setLoadingAnalysisData(false);
      })
      .catch((error) => {
        setLoadingAnalysisData(false);
        const { message } = error.response.data;
        toast.error(message || 'Something went wrong!');
      });
  }, [id]);

  const fetchAnalysisMetaHandler = useCallback(() => {
    apiInstance
      .get(`/analysis/${id}/meta.json`)
      .then((res) => {
        setAnalysisMeta(res.data);
      })
      .catch((error) => {
        const { message } = error.response.data;
        toast.error(`Analysis Meta: ${message}` || 'Something went wrong!');
      });
  }, [id]);

  const fetchWorkflowDataHandler = useCallback(() => {
    apiInstance
      .get(`/workflow/${workflowId}`)
      .then((res) => {
        setLoadingWorkflowData(false);
        setWorkflowData(res.data.workflow);
      })
      .catch((error) => {
        setLoadingWorkflowData(false);
        toast.error(error.response.data.msg || 'Something went wrong');
      });
  }, [workflowId]);

  useEffect(() => {
    fetchAnalysisDataHandler();
  }, [fetchAnalysisDataHandler]);

  useEffect(() => {
    fetchAnalysisMetaHandler();
  }, [fetchAnalysisMetaHandler]);

  useEffect(() => {
    fetchWorkflowDataHandler();
  }, [fetchWorkflowDataHandler]);

  useEffect(() => {
    if (  !analysisData && !analysisMeta ) {return ;}
    let refetchInterval;
    refetchInterval = setInterval( () => {
      let token = Cookies.getCookie("token")
      const headers = {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "X-API-KEY": `JWT ${token}`,
        },
      };
      const analysisDataEndpoint = `${apiInstance.defaults.baseURL}/analysis/${id}`;
      const analysisMetaEndpoint = `${apiInstance.defaults.baseURL}/analysis/${id}/meta.json`;
  
      const getAnalysisData = axios.get(analysisDataEndpoint, headers);
      const getAnalysisMetaData = axios.get(analysisMetaEndpoint, headers);
  
      axios
        .all([getAnalysisData, getAnalysisMetaData])
        .then(
          axios.spread((...responses) => {
            setAnalysisData(responses[0].data);
            setAnalysisMeta(responses[1].data);
          })
          )
        .catch((error) => {
          console.log(error)
          toast.error("Error Fetching Data");
        });
      } , [5000])
      return ( ) => {
        clearInterval(refetchInterval)
      }
  }, [analysisData, analysisMeta, id]);

  const dispatch = useDispatch();

  const closeModalHandler = () => {
    handleClose();
  };

  const deleteAnalysisHandler = () => {
    setDeletingAnalysis(true)
    axios
    .delete(`/analysis/${id}`)
    .then((res) => {
        closeModalHandler();
        dispatch(deleteAnalysis(id));
        toast.success('Analysis deleted successfully');
      })
      .catch((err) => {
        setDeletingAnalysis(false)
        closeModalHandler();
        toast.error(
          err.response?.data?.message ||
            'Error Deleting Analysis, Try again later'
        );
      });
  };

  const modalDataIsReady = !loadingAnalysisData && !loadingWorkflowData && analysisData && workflowData;

  const noModalDataFound = !loadingAnalysisData &&  !loadingWorkflowData && ( !analysisData || !workflowData );

  let content;
  if (noModalDataFound) {
    content = (
      <Fragment>
        <div className="h-96 mt-6">
          <Lottie
            animationData={noDataAnimation}
            loop={true}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'inherit',
            }}
          />
        </div>
      </Fragment>
    );
  } else if (modalDataIsReady) {
    const { name, status } = analysisData.analysis;

    content = (
      <Fragment>
        <div className="max-h-[calc(100%-108px)] md:max-h-[calc(90vh-108px)] overflow-y-auto pr-3">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <h2 className="text-gray-700 text-xl  font-bold dark:text-white">
              {name}
            </h2>
            <p className={`capitalize text-sm  ${
                status === 'Active' ? 'text-primary' : status === 'Error' ? 'text-[#c16a7b]' : 'text-green'
              } bg-gray-50 w-fit py-2 px-5 rounded-md font-semibold`}
            >
              {status}
            </p>
          </div>
          <div className="flex items-center gap-5 flex-wrap cursor-pointer w-fit"
            onClick={openWorkflowModalHandler}
          >
            <div className="rounded-md overflow-hidden w-48 h-24">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold text-base  md:text-lg text-gray-600 dark:text-gray-200">
              {workflowData.name}
            </h3>
          </div>
          {analysisMeta && <AnalysisFiles id={id} meta={analysisMeta} />}
        </div>
      </Fragment>
    );
  } else {
    content = (
      <Loader height='h-96' />
    );
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[300]"
          onClose={closeModalHandler}
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
                <Dialog.Panel className="w-full h-screen md:h-fit md:max-w-4xl md:w-11/12 transform overflow-hidden rounded-md bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end mb-7 gap-3">
                    <button
                      className="bg-red-600/90 hover:bg-red-600 text-white  transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
                      onClick={deleteAnalysisHandler}
                      disabled={deletinganalysis}
                    >
                      <MdDelete />
                    </button>

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

      {showWorkflowOpened && (
        <ShowWorkflow
          open={showWorkflowOpened}
          handleClose={closeWorkflowModalHandler}
          id={workflowData?.id}
        />
      )}
    </>
  );
};

export default ShowAnalysis;

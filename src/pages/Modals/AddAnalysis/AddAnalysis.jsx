import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Stepper from './components/Stepper';
import StepperControl from './components/StepperControl';
import Name from './components/steps/Name';
import WorkflowsStep from './components/steps/WorkflowsStep';
import Final from './components/steps/Final';
import '../Modals.css';
import { AiOutlineClose } from 'react-icons/ai';
import Source from './components/steps/Source/Source';
import axios from '../../../utility/api-instance';
import { toast } from 'react-toastify';
import Informations from './components/steps/Informations';
import { useDispatch } from 'react-redux';
import { addAnalysis, handleLastPage } from '../../../store/analysis';
import { useRef } from 'react';

const longSteps = [
  { name: 'name', label: 'Name' },
  { name: 'workflows', label: 'Workflows' },
  { name: 'source', label: 'Source' },
  { name: 'informations', label: 'Informations' },
  { name: 'completed', label: 'Completed' },
];
const shortSteps = [
  { name: 'name', label: 'Name' },
  { name: 'source', label: 'Source' },
  { name: 'informations', label: 'Informations' },
  { name: 'completed', label: 'Completed' },
];

const AddAnalysis = ({ handleClose, open, workflowId, topLayer, callback }) => {
  let steps = useRef(workflowId ? shortSteps : longSteps);

  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);

  const [analysisName, setAnalysisName] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState({
    id: workflowId || null,
  });

  const [selectedType, setSelectedType] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);

  const [fetchingParams, setFetchingParams] = useState(false);

  const [params, setParams] = useState(null);

  const [informations, setInformations] = useState(null);
  const [informationValid, setInformationValid] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const fetchParams = useCallback(() => {
    setFetchingParams(true);
    const { id } = selectedWorkflow;
    axios
      .get(`/workflow/${id}/params`)
      .then((res) => {
        setFetchingParams(false);
        setParams(res.data.workflow_params);
      })
      .catch((err) => {
        setFetchingParams(false);
        setParams(null);
        const errorMessage = err.response.data.msg || err.response.data.message;
        toast.error(errorMessage || 'Something went wrong!');
      });
  }, [selectedWorkflow]);

  useEffect(() => {
    const { id } = selectedWorkflow;
    const selectedStep = steps.current[currentStep - 1].name;
    id && selectedStep === 'source' && fetchParams();
  }, [currentStep, fetchParams, selectedWorkflow]);

  const selectWorkflowHandler = useCallback(
    (data) => setSelectedWorkflow(data),
    []
  );
  const analysisNameChangeHandler = useCallback(
    (name) => setAnalysisName(name),
    []
  );

  const selectedTypeChangeHandler = useCallback((type) => {
    setSelectedType(type);
    setSelectedSource(null);
  }, []);
  const selectedSourceChangeHandler = useCallback(
    (source) => setSelectedSource(source),
    []
  );

  const informatinChangeHandler = useCallback((data) => {
    setInformations(data);
  }, []);

  const validateInfoHandler = useCallback((val) => {
    setInformationValid(val);
  }, []);

  const submitAnalysis = useCallback(() => {
    const payload = {
      name: analysisName,
      workflow_id: selectedWorkflow.id,
      feeds: {
        source: {
          type: selectedType,
          id: selectedSource,
        },
        params: informations,
      },
    };
    setSubmitting(true);
    axios
      .post(`analysis/`, payload)
      .then((res) => {
        setSubmitting(false);
        setCurrentStep((cur) => cur + 1);
        dispatch(addAnalysis(res.data.analysis));
        dispatch(handleLastPage(true));
      })
      .catch((err) => {
        setSubmitting(false);
        const errorMessage = err.response.data.msg || err.response.data.message;
        toast.error(errorMessage || 'Error Submitting Analysis!');
      });
  }, [
    analysisName,
    dispatch,
    informations,
    selectedSource,
    selectedType,
    selectedWorkflow.id,
  ]);

  const handleActionsClick = useCallback(
    (direction) => {
      if (currentStep === steps.current.length - 1 && direction === 'next') {
        submitAnalysis();
        return;
      }
      let newStep = currentStep;
      direction === 'next' ? ++newStep : --newStep;
      newStep > 0 && newStep <= steps.current.length && setCurrentStep(newStep);
    },
    [currentStep, submitAnalysis]
  );

  const handleActionsValidation = useCallback(() => {
    let isValid = false;
    const selectedStep = steps.current[currentStep - 1];
    switch (selectedStep.name) {
      case 'name':
        if (analysisName.length > 0) {
          isValid = true;
        }
        break;
      case 'workflows':
        if (selectedWorkflow.id) {
          isValid = true;
        }
        break;
      case 'source':
        if (selectedType && selectedSource) {
          isValid = true;
        }
        break;
      case 'informations':
        if (informations) {
          isValid = informationValid;
        }
        break;
      default:
    }
    return isValid;
  }, [
    analysisName.length,
    currentStep,
    informationValid,
    informations,
    selectedSource,
    selectedType,
    selectedWorkflow.id,
  ]);

  const renderStep = (stepName) => {
    switch (stepName) {
      case 'name':
        return (
          <Name
            onAnalysisNameChange={analysisNameChangeHandler}
            analysisName={analysisName}
          />
        );
      case 'workflows':
        return (
          <WorkflowsStep
            onSelectWorkflow={selectWorkflowHandler}
            selectedWorkflow={selectedWorkflow}
          />
        );
      case 'source':
        return (
          <Source
            fetchingParams={fetchingParams}
            params={params}
            selectedType={selectedType}
            selectedSource={selectedSource}
            updateType={selectedTypeChangeHandler}
            updateSource={selectedSourceChangeHandler}
          />
        );
      case 'informations':
        return (
          <Informations
            params={params}
            updateData={informatinChangeHandler}
            validateInfo={validateInfoHandler}
          />
        );
      case 'completed':
        return <Final />;
      default:
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative modal-wrapper ${topLayer ? 'z-[401]' : 'z-[300]'}`}
        onClose={handleClose}
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
              <Dialog.Panel className="w-full modal-wrapper md:h-fit md:max-h-[90vh] md:max-w-4xl md:w-11/12 transform overflow-auto rounded-md bg-white dark:bg-gray-700 py-3 px-2 md:py-6 md:px-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end gap-5">
                  <button
                    className="bg-gray-50 dark:bg-gray-800 dark:text-white hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
                    onClick={handleClose}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="text-[#42a7df] text-2xl font-bold  text-center dark:text-white mb-5">
                  Add Analysis
                </div>
                <div className="max-h-[calc(var(--vh)*100-132px)] md:max-h-[calc(90vh-132px)] overflow-y-auto overflow-y-auto pr-3">
                  <div>
                    <div className="horizontal">
                      <Stepper steps={steps.current} currentStep={currentStep} />

                      <div className="my-2 p-2">
                        {renderStep(steps.current[currentStep - 1].name)}
                      </div>
                    </div>

                    {currentStep !== steps.current.length && (
                      <StepperControl
                        handleClick={handleActionsClick}
                        currentStep={currentStep}
                        steps={steps.current}
                        nextEnabled={handleActionsValidation}
                        submitting={submitting}
                      />
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddAnalysis;

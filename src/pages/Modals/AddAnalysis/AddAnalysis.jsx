import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import Name from "./components/steps/Name";
import WorkflowsStep from "./components/steps/WorkflowsStep";
import Final from "./components/steps/Final";
import "../Modals.css";
import { AiOutlineClose } from "react-icons/ai";
import Source from "./components/steps/Source/Source";
import axios from "../../../utility/api-instance";
import { toast } from "react-toastify";

const steps = ["Name", "Workflows", 'Source', "Completed"];

const AddAnalysis = ({ handleClose, open }) => {

  const [currentStep, setCurrentStep] = useState(1);

  const [analysisName, setAnalysisName] = useState("");
  const [selectedWorkflow, setSelectedWorkflow] = useState({ id: null });

  const [selectedType, setSelectedType] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);

  const [fetchingParams, setFetchingParams] = useState(false);

  const [params, setParams] = useState(null);


  const fetchParams = useCallback(() => {
    setFetchingParams(true)
    const { id } = selectedWorkflow;
    axios
      .get(`/workflow/${id}/params`)
      .then((res) => {
        setFetchingParams(false)
        setParams(res.data.workflow_params)
      })
      .catch((err) => {
        setFetchingParams(false)
        setParams(null)
        const errorMessage = err.response.data.msg || err.response.data.message;
        toast.error(errorMessage || 'Something went wrong!');
      });
  }, [selectedWorkflow]);

  useEffect(() => {
    const { id } = selectedWorkflow;
    id && currentStep === 3 && fetchParams();
  }, [currentStep, fetchParams, selectedWorkflow]);

  const selectWorkflowHandler = (data) => setSelectedWorkflow(data);
  const analysisNameChangeHandler = (name) => setAnalysisName(name);

  const selectedTypeChangeHandler = (type) => setSelectedType(type);
  const selectedSourceChangeHandler = (source) => setSelectedSource(source);

  const handleActionsClick = useCallback((direction) => {
    let newStep = currentStep;

    direction === "next" ? ++newStep : --newStep;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }, [currentStep]);

  const handleActionsValidation = useCallback(() => {
    let isValid = false;
    switch (currentStep) {
      case 1:
        if (analysisName.length > 0) {
          isValid = true;
        }
        break;
      case 2:
        if (selectedWorkflow.id) { isValid = true; }
        break;
      case 3:
        if (selectedType && selectedSource) { isValid = true; }
        break;
      default:
    }
    return isValid;
  }, [analysisName.length, currentStep, selectedSource, selectedType, selectedWorkflow.id])

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Name
            onAnalysisNameChange={analysisNameChangeHandler}
            analysisName={analysisName}
          />
        );
      case 2:
        return (
          <WorkflowsStep
            onSelectWorkflow={selectWorkflowHandler}
            selectedWorkflow={selectedWorkflow}
          />
        );
      case 3:
        return <Source
          fetchingParams={fetchingParams} params={params}
          selectedType={selectedType} selectedSource={selectedSource}
          updateType={selectedTypeChangeHandler} updateSource={selectedSourceChangeHandler}
        />
      case 4:
        return <Final />;
      default:
    }
  };

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
              <Dialog.Panel className="w-full h-screen max-h-screen md:h-fit  md:max-w-3xl transform overflow-auto md:rounded-2xl bg-white p-3 md:p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end gap-5">
                  <button
                    className="md:hidden bg-gray-50 hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
                    onClick={handleClose}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="text-[#42a7df] text-2xl font-bold  text-center">
                  Add Analysis
                </div>

                <div>
                  <div className="horizontal mt-5 ">
                    <Stepper steps={steps} currentStep={currentStep} />

                    <div className="my-2 p-2 md:max-h-[50vh] lg:max-h-[60vh] overflow-auto">{renderStep(currentStep)}</div>
                  </div>

                  {currentStep !== steps.length && (
                    <StepperControl handleClick={handleActionsClick} currentStep={currentStep} steps={steps}
                      analysisName={analysisName} selectedWorkflow={selectedWorkflow} nextEnabled={handleActionsValidation}
                    />
                  )}
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

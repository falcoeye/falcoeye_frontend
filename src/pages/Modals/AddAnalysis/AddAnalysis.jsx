import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import Name from "./components/steps/Name";
import WorkflowsStep from "./components/steps/WorkflowsStep";
import Final from "./components/steps/Final";
import "../Modals.css";
import { AiOutlineClose } from "react-icons/ai";

const AddAnalysis = ({ handleClose, open }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Name", "Worksflows", "Completed"];
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [analysisName, setAnalysisName] = useState("");

  const selectWorkflowHanlder = (data) => setSelectedWorkflow(data);
  const analysisNameChangeHandler = (name) => setAnalysisName(name);

  const displayStep = (step) => {
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
            onSelectWorkflow={selectWorkflowHanlder}
            selectedWorkflow={selectedWorkflow}
          />
        );
      case 3:
        return <Final />;
      default:
    }
  };

  const closeModalHandler = () => {
    handleClose();

    setTimeout(() => {
      setCurrentStep(1);

      if (currentStep === 3) {
        analysisNameChangeHandler("");
        setSelectedWorkflow(null);
      }
    }, 200);
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[300]" onClose={closeModalHandler}>
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
              <Dialog.Panel className="w-full h-screen md:h-fit  md:max-w-3xl transform overflow-hidden md:rounded-2xl bg-white p-3 md:p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end gap-5">
                  <button
                    className="md:hidden bg-gray-50 hover:bg-gray-200 transition duration-300 font-bold p-2 rounded-full inline-flex items-center"
                    onClick={closeModalHandler}
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

                    <div className="my-2 p-2">{displayStep(currentStep)}</div>
                  </div>

                  {currentStep !== steps.length && (
                    <StepperControl
                      handleClick={handleClick}
                      currentStep={currentStep}
                      steps={steps}
                      analysisName={analysisName}
                      selectedWorkflow={selectedWorkflow}
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

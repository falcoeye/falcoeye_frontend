import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import Name from "./components/steps/Name";
import WorkflowsStep from "./components/steps/WorkflowsStep";
import Final from "./components/steps/Final";
import { UseContextProvider } from "./contexts/StepperContext";
import "./Modals.css";

const AddAnalysis = ({ handleClose, open }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Name", "Worksflows", "Completed"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Name />;
      case 2:
        return <WorkflowsStep />;
      case 3:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-3 md:p-6 text-left align-middle shadow-xl transition-all">
                <div className="text-[#42a7df] text-lg font-semibold text-center">
                  Add Analysis
                </div>

                <div>
                  <div className="horizontal container mt-5 ">
                    <Stepper steps={steps} currentStep={currentStep} />

                    <div className="my-2 p-2">
                      <UseContextProvider>
                        {displayStep(currentStep)}
                      </UseContextProvider>
                    </div>
                  </div>

                  {currentStep !== steps.length && (
                    <StepperControl
                      handleClick={handleClick}
                      currentStep={currentStep}
                      steps={steps}
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

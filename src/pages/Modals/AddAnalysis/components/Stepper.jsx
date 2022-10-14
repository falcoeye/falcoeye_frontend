import React, { useState, useEffect, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (activeStep, steps) => {
    return steps.map( (step, i) => {
        if (i === steps.length - 1 && i === activeStep) {
          return {
            ...step,
            highlighted: false,
            selected: true,
            completed: true,
          };
        } else  if (i === activeStep ) {
          return {
            ...step,
            highlighted: true,
            selected: true,
            completed: false,
          };
        } else if (i < activeStep) {
          return {
            ...step,
            highlighted: false,
            selected: true,
            completed: true,
          };
        } else {
          return {
            ...step,
            highlighted: false,
            selected: false,
            completed: false,
          };
        }
    } )
  };

  useEffect(() => {
    const stepsState = steps.map((step,) =>
      Object.assign(
        {},
        {
          description: step.label,
          completed: false,
          highlighted: false,
          selected: false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center md:mb-5"
            : "flex items-center md:mb-5"
        }
      >
        <div className="relative flex flex-col items-center text-teal-600 dark:text-white">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300  h-12 w-12 flex items-center justify-center py-3  ${
              step.selected
                ? "bg-green text-white font-bold border border-green"
                : ""
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`hidden md:block absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
              step.highlighted
                ? "text-gray-900 dark:text-gray-200"
                : "text-gray-400"
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
            step.completed ? "border-green" : "border-gray-300 "
          }  `}
        ></div>
      </div>
    );
  });

  return (
    <div className="mx-1 px-3 md:mx-4 md:p-4 flex justify-between items-center mb-6">
      {stepsDisplay}
    </div>
  );
};
export default Stepper;

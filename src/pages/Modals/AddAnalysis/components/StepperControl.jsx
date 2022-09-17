import LoadingSpinner from "../../../../Components/UI/LoadingSpinner/LoadingSpinner";

export default function StepperControl({
  handleClick,
  currentStep,
  steps,
  nextEnabled,
  submitting,
}) {
  return (
    <div className="mt-4 flex justify-around">
      <button
        onClick={() => handleClick()}
        className={`cursor-pointer rounded-md border-2 border-slate-300  bg-white dark:bg-transparent dark:border-gray-800 py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:border-slate-700 hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        } dark:hover:bg-gray-800`}
      >
        Back
      </button>

      <button
        disabled={!nextEnabled() || submitting}
        onClick={() => handleClick("next")}
        className="cursor-pointer rounded-md bg-primary py-2 px-4 font-semibold uppercase border-2 border-primary text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:border-slate-700 hover:text-white disabled:bg-gray-800 disabled:cursor-not-allowed disabled:border-gray-800 dark:disabled:hover:bg-gray-900 dark:disabled:hover:border-gray-900 dark:hover:bg-primary/80 dark:hover:border-primary/80"
      >
        {currentStep < steps.length - 1 && "Next"}
        {submitting && currentStep === steps.length - 1 && <LoadingSpinner />}
        {!submitting && currentStep === steps.length - 1 && "Submit"}
      </button>
    </div>
  );
}

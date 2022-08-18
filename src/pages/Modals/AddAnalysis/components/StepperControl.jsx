import LoadingSpinner from "../../../../Components/UI/LoadingSpinner/LoadingSpinner";

export default function StepperControl({
  handleClick,
  currentStep,
  steps,
  nextEnabled,
  submitting
}) {


  return (
    <div className="mt-4 flex justify-around">
      <button
        onClick={() => handleClick()}
        className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:border-slate-700 hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Back
      </button>

      <button
        disabled={!nextEnabled()}
        onClick={() => handleClick("next")}
        className="cursor-pointer rounded-lg bg-primary py-2 px-4 font-semibold uppercase border-2 border-primary text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:border-slate-700 hover:text-white disabled:bg-gray-800 disabled:cursor-not-allowed disabled:border-gray-800"
      >
        {currentStep < steps.length - 1 &&"Next"}
        {submitting && currentStep === steps.length - 1 && <LoadingSpinner />  }
        {!submitting && currentStep === steps.length - 1 && 'Submit'  }
      </button>
    </div>
  );
}
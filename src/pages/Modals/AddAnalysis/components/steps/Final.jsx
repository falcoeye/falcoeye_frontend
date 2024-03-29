import Lottie from "lottie-react";
import submittedAnalysis from "../../../../../assets/animations/submitted-analysis.json";

const Final = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center ">
        <div className="h-44">
          <Lottie
            animationData={submittedAnalysis}
            loop={false}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="text-xl font-bold text-green text-center">
          The analysis is submitted and running
        </div>
      </div>
    </div>
  );
};

export default Final;

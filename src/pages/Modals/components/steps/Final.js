import Lottie from "lottie-react";
import noDataAnimation from "../../../../assets/animations/no-data.json";

const Final = () => {
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center ">
        <div className="h-40">
          <Lottie
            animationData={noDataAnimation}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="mt-3 text-xl font-bold text-green">
          The analysis is submitted and running
        </div>
      </div>
    </div>
  );
};

export default Final;

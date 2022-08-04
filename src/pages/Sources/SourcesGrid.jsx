import Lottie from "lottie-react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import noDataAnimation from "../../assets/animations/no-data.json";
import Loader from "../../Components/UI/Loader/Loader";
import SourceCard from "./SourceCard";

const SourcesGrid = () => {


  const sources = useSelector((state) => state.sources);

  if (sources.fetchingSources) {
    return <Loader height="96" />;
  }
  if (sources.data.length === 0 && !sources.fetchingSources) {
    return (
      <div className="h-96">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  const sourcesCards = sources.data.map((source) => {
    return (
      <SourceCard
        key={source.id}
        source={source}
      />
    );
  });

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sourcesCards}
      </div>
    </Fragment>
  );
};
export default SourcesGrid;

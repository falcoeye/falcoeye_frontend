import Lottie from "lottie-react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import noDataAnimation from "../../../../../../../../assets/animations/no-data.json";
import Loader from "../../../../../../../../Components/UI/Loader/Loader";
import { fetchSources } from "../../../../../../../../store/sources";
import SourceCard from "./components/SourceCard";

const SourceCards = (props) => {
  const { selectedSource, updateSource } = props;

  const dispatch = useDispatch();

  const sources = useSelector((state) => state.sources);
  const { fetchingSources, data } = sources;

  useEffect(() => {
    dispatch(fetchSources());
  }, [dispatch]);

  if (fetchingSources) {
    return <Loader height="h-[300px]" />;
  }
  if (data.length === 0 && !fetchingSources) {
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

  const sourcesCards = data.map((source) => {
    return (
      <SourceCard
        key={source.id}
        selectedSourceId={selectedSource}
        source={source}
        handleClick={updateSource}
      />
    );
  });

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sourcesCards}
      </div>
    </Fragment>
  );
};
export default SourceCards;

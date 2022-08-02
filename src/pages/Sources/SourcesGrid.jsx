import Lottie from "lottie-react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import noDataAnimation from "../../assets/animations/no-data.json";
import Loader from "../../Components/UI/Loader/Loader";
import ShowSource from "../Modals/ShowSource/ShowSource";
import SourceCard from "./SourceCard";

const SourcesGrid = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showSourceOpened, setShowSourceOpened] = useState(false);

  const openSourceModalHandler = (id) => {
    setShowSourceOpened(true);
    setSelectedCardId(id);
  };
  const closeSourceModalHandler = () => {
    setShowSourceOpened(false);
  };

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
        handleClick={openSourceModalHandler}
      />
    );
  });

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sourcesCards}
      </div>
      <ShowSource
        open={showSourceOpened}
        handleClose={closeSourceModalHandler}
        id={selectedCardId}
      />
    </Fragment>
  );
};
export default SourcesGrid;

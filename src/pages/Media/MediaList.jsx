import Lottie from "lottie-react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import noDataAnimation from "../../assets/animations/no-data.json";
import Loader from "../../Components/UI/Loader/Loader";
import ShowSource from "../Modals/ShowSource/ShowSource";
import MediaCard from "./MediaCard";

const MediaList = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showSourceOpened, setShowSourceOpened] = useState(false);

  const openSourceModalHandler = (id) => {
    setShowSourceOpened(true);
    setSelectedCardId(id);
  };
  const closeSourceModalHandler = () => {
    setShowSourceOpened(false);
  };

  const media = useSelector((state) => state.media);

  if (media.fetchingMedia) {
    return <Loader height="96" />;
  }
  if (media.data.length === 0 && !media.fetchingMedia) {
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

  const mediaCards = media.data.map((media) => {
    return (
      <MediaCard
        key={media.id}
        media={media}
        handleClick={openSourceModalHandler}
      />
    );
  });

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mediaCards}
      </div>
      <ShowSource
        open={showSourceOpened}
        handleClose={closeSourceModalHandler}
        id={selectedCardId}
      />
    </Fragment>
  );
};
export default MediaList;

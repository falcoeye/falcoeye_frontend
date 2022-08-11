import Lottie from 'lottie-react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import noDataAnimation from '../../assets/animations/no-data.json';
import Loader from '../../Components/UI/Loader/Loader';
import ShowMedia from '../Modals/ShowMedia';
import MediaCard from './MediaCard';

const MediaGrid = ({ data }) => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showMediaOpened, setShowMediaOpened] = useState(false);
  const media = useSelector((state) => state.media);

  const openMediaModalHandler = (id) => {
    setShowMediaOpened(true);
    setSelectedCardId(id);
  };
  const closeMediaModalHandler = () => {
    setShowMediaOpened(false);
  };

  if (media.fetchingMedia) {
    return <Loader height="96" />;
  }
  if (data.length === 0 && !media.fetchingMedia) {
    return (
      <div className="h-96">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  const mediaCards = data.map((media) => {
    return (
      <MediaCard
        key={media.id}
        media={media}
        handleClick={openMediaModalHandler}
      />
    );
  });

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {mediaCards}
      </div>
      {showMediaOpened && (
        <ShowMedia
          open={showMediaOpened}
          handleClose={closeMediaModalHandler}
          id={selectedCardId}
        />
      )}
    </Fragment>
  );
};
export default MediaGrid;

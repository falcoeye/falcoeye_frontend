import Lottie from 'lottie-react';
import { Fragment, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import noDataAnimation from '../../assets/animations/no-data.json';
import Loader from '../../Components/UI/Loader/Loader';
import { handlePage } from '../../store/media';
import ShowMedia from '../Modals/ShowMedia';
import MediaCard from './MediaCard';

const MediaGrid = ({ data }) => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showMediaOpened, setShowMediaOpened] = useState(false);
  const media = useSelector((state) => state.media);
  const dispatch = useDispatch();

  const { fetchingMedia, page, lastPage } = media

  const ovserver = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (fetchingMedia) return;
      if (ovserver.current) ovserver.current.disconnect();
      ovserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !lastPage) {
          dispatch(handlePage(page + 1));
        }
      });
      if (node) ovserver.current.observe(node);
    },
    [dispatch, fetchingMedia, lastPage, page]
  );

  const openMediaModalHandler = (id) => {
    setShowMediaOpened(true);
    setSelectedCardId(id);
  };
  const closeMediaModalHandler = () => {
    setShowMediaOpened(false);
  };

  if (fetchingMedia && data.length === 0) {
    return <Loader height="h-[500px]" />;
  }
  if (data.length === 0 && !fetchingMedia) {
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

  const mediaCards = data.map((media, index) => {
    if ( data.length - 1 === index ) {
        return (
          <MediaCard
            lastElementRef={lastElementRef}
            key={media.id}
            media={media}
            handleClick={openMediaModalHandler}
          />
        );
    }
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

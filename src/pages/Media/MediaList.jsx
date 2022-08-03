import Lottie from 'lottie-react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import noDataAnimation from '../../assets/animations/no-data.json';
import Loader from '../../Components/UI/Loader/Loader';
import ShowMedia from '../Modals/ShowMedia';
import MediaCard from './MediaCard';

const MediaList = ({ data }) => {
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

      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 capitalize">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Type
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                tag
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
              >
                Apple MacBook Pro 17"
              </th>
              <td className="py-4 px-6">Sliver</td>
              <td className="py-4 px-6">Laptop</td>
              <td className="py-4 px-6">$2999</td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
              >
                Microsoft Surface Pro
              </th>
              <td className="py-4 px-6">White</td>
              <td className="py-4 px-6">Laptop PC</td>
              <td className="py-4 px-6">$1999</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ShowMedia
        open={showMediaOpened}
        handleClose={closeMediaModalHandler}
        id={selectedCardId}
      />
    </Fragment>
  );
};
export default MediaList;

import Lottie from 'lottie-react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import noDataAnimation from '../../assets/animations/no-data.json';
import Loader from '../../Components/UI/Loader/Loader';
import ShowMedia from '../Modals/ShowMedia';
import {
  AiFillCamera,
  AiFillVideoCamera,
  AiOutlineCalendar
} from 'react-icons/ai';
import moment from 'moment';

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

  return (
    <Fragment>
      <div className="flex flex-col px-4 mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-4 ">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white capitalize">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      tag
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((media) => {
                    return (
                      <tr key={media.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 capitalize">
                            {media.note}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center mb-3 py-1 px-2 text-sm font-medium text-center text-white capitalize ${media.media_type === 'image'
                              ? 'bg-sky-400'
                              : 'bg-emerald-500'
                              } rounded-lg`}
                          >
                            {media.media_type === 'image' ? (
                              <AiFillCamera className="mr-2" />
                            ) : (
                              <AiFillVideoCamera className="mr-2" />
                            )}
                            {media.media_type}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="flex items-center gap-1 capitalize text-gray-600 mb-3">
                            <span className="mr-1">
                              <AiOutlineCalendar />
                            </span>
                            {moment.utc(media.created_at).format('MM-DD-YYYY')}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">
                            <span className="inline-flex items-center py-1 px-2 text-sm justify-center text-white capitalize bg-orange-500 rounded-md">
                              {media.tags}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={openMediaModalHandler.bind(null, media.id)}
                          type="button"
                          className="capitalize focus:outline-none text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-green/30 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                          view
                        </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showMediaOpened && (
        <ShowMedia
          open={showMediaOpened}
          handleClose={closeMediaModalHandler}
          id={selectedCardId}
        />
      ) }
    </Fragment>
  );
};
export default MediaList;

import moment from 'moment';
import {
  AiFillCamera,
  AiFillVideoCamera,
  AiOutlineCalendar,
} from 'react-icons/ai';

const MediaCard = (props) => {
  const { media, handleClick } = props;
  /* const [ image, setImage ] = useState(null);
  const [ fetching, setFetching ] = useState(false) */

  return (
    <div className='rounded-lg  cursor-pointer shadow-md' onClick={() => handleClick(media.id)} >
      <div className="flex justify-center items-center h-48 bg-gray-300 ">
        <svg
          className="w-12 h-12 text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
      <div
        className="p-4 bg-white"
      >
        <h5 className="mb-1 text-xl font-semibold tracking-tight text-gray-900  capitalize ">
          {media.note}
        </h5>
        <div
          className={`inline-flex items-center mb-3 py-1 px-2 text-base font-medium text-center text-white capitalize ${
            media.media_type === 'image' ? 'bg-sky-400' : 'bg-emerald-500'
          } rounded-lg`}
        >
          {media.media_type === 'image' ? (
            <AiFillCamera className="mr-2" />
          ) : (
            <AiFillVideoCamera className="mr-2" />
          )}
          {media.media_type}
        </div>
        <p className="flex items-center gap-1 capitalize text-gray-600 mb-3">
          <span className="mr-1">
            <AiOutlineCalendar />
          </span>
          {moment.utc(media.created_at).format('MMM DD YYYY')}
        </p>
        <div className="flex">
          <span className="inline-flex items-center py-1 px-1 text-sm justify-center text-white capitalize bg-orange-500 rounded-md">
            {media.tags}
          </span>
        </div>
      </div>
    </div>
  );
};
export default MediaCard;

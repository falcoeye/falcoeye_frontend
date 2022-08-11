import { Fragment, useCallback, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import ShowSource from "../Modals/ShowSource/ShowSource";
import axios from '../../utility/api-instance';

const SourceCard = (props) => {
  const { source } = props;
  const { id } = source;
  const [showSourceOpened, setShowSourceOpened] = useState(false);
  const [image, setImage] = useState(null);
  const [ loading, setLoading ] = useState(false)

  const openSourceModalHandler = () => {
    setShowSourceOpened(true);
  };
  const closeSourceModalHandler = () => {
    setShowSourceOpened(false);
  };

  const fetchImage = useCallback(() => {
    let url = `/camera/${id}/img_260.jpg`;
    setLoading(true)
    axios
      .get(url, { responseType: 'blob' })
      .then((res) => {
        // we can all pass them to the Blob constructor directly
        const new_blob = new Blob([res.data], { type: 'image/jpg' });
        const url = URL.createObjectURL(new_blob);
        setImage(url);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message);
      });
  }, [id]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  let renderedImage = (
    <div className={`flex justify-center items-center h-48 bg-gray-300 ${loading && 'animate-pulse'} mb-5`} >
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
  );

  if (image) {
    renderedImage = (
      <div className="flex justify-center items-center h-48 bg-gray-300 mb-5">
        <img src={image} alt={source.name} className="w-full h-full object-cover	" />
    </div>
    );
  }

  const status =
    source.status === "1" ||
    source.status === 1 ||
    source.status.toLowerCase() === "running"
      ? "Running"
      : "Stopped";
  const type =
    source.streaming_type === "StreamingServer"
      ? "Streaming Server"
      : source.streaming_type;

  return (
    <Fragment>
      <div
        className="p-4 bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer"
        onClick={openSourceModalHandler}
      >
        {renderedImage}
        <h5 className="mb-1 text-xl font-semibold tracking-tight text-gray-900  capitalize ">
          {source.name}
        </h5>
        <p className="mb-3 text-sm font-normal text-gray-500 capitalize">
          {type}
        </p>
        <div
          className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white ${
            status === "Running" ? "bg-primary" : "bg-danger"
          } rounded-lg`}
        >
          {status}
        </div>
      </div>
      {showSourceOpened && (
        <ShowSource
            open={showSourceOpened}
            handleClose={closeSourceModalHandler}
            id={source.id}
          />
      ) }
    </Fragment>
  );
};
export default SourceCard;

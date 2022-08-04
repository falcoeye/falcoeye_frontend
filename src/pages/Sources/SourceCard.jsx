import { Fragment } from "react";
import { useState } from "react";
import ShowSource from "../Modals/ShowSource/ShowSource";

const SourceCard = (props) => {
  const { source } = props;
  const [showSourceOpened, setShowSourceOpened] = useState(false);

  const openSourceModalHandler = (id) => {
    setShowSourceOpened(true);
  };
  const closeSourceModalHandler = () => {
    setShowSourceOpened(false);
  };

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

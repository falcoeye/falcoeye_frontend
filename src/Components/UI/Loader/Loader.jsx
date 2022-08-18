import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Loader = (props) => {
  const { height } = props;

  return (
    <div
      className={
        height
          ? `flex justify-center items-center w-full ${height}`
          : `flex justify-center items-center w-full h-96`
      }
    >
      <LoadingSpinner />
    </div>
  );
};

export default Loader;

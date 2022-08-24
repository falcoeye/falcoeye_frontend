const Chip = (props) => {
  const { clickHandler, active, children } = props;
  return (
    <div
      onClick={clickHandler}
      className={`inline-flex items-center py-2 px-2 text-md justify-center border-2 border-orange-500 capitalize  rounded-md cursor-pointer   ${
        active
          ? "text-orange-500 bg-white dark:bg-gray-800 dark:text-orange-400 dark:border-orange-400"
          : "text-white bg-orange-500"
      }`}
    >
      {children}
    </div>
  );
};
export default Chip;

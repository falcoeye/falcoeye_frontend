const Chip = (props) => {
  const { clickHandler, active, children, small } = props;
  return (
    <div
      onClick={clickHandler}
      className={`inline-flex items-center justify-center border-2 border-orange-500 capitalize  rounded-md cursor-pointer   ${
        active
          ? "text-orange-500 bg-white dark:bg-gray-800 dark:text-orange-400 dark:border-orange-400"
          : "text-white bg-orange-500"
      }
      ${
        small
          ? "py-1 px-2 text-base"
          : "py-2 px-2 text-md"
      }
      `}
    >
      {children}
    </div>
  );
};
export default Chip;

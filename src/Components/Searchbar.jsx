import { useContext } from "react";
import DropDown from "./DropDown/DropDown";

import AuthContext from "../store/auth-context";

export const LoadingSkelton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="flex items-center">
        <svg
          className="w-12 h-12 text-gray-200"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const Searchbar = () => {
  const { userData } = useContext(AuthContext);

  let firstUserNameLetter;
  if (userData) {
    firstUserNameLetter = userData.name.slice(0, 1).toUpperCase();
  }

  return (
    <>
      <div className="main-container pt-6 md:block hidden">
        <div className="flex md:flex-row flex-col flex-wrap lg:flex-nowrap justify-between rounded-lg lg:rounded-full gap-y-3  bg-white px-4 md:px-8 lg:px-5 py-3 lg:py-1 min-h-[42px]">
          <div className="flex-1 md:justify-end md:order-none order-first lg:basis-1/6 bas flex items-center px-3 gap-x-4">
            <div className="flex gap-x-5 items-center">
              <label
                htmlFor="default-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                />
                <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:ring-primary/20 rounded-full peer bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-primary"></div>
              </label>
              {firstUserNameLetter ? (
                <div className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center font-bold text-lg">
                  {firstUserNameLetter}
                </div>
              ) : (
                <LoadingSkelton />
              )}

              <DropDown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;

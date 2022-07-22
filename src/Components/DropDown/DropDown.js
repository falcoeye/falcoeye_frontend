import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

const DropDown = () => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptionsHandler = () => {
    setShowOptions((prevState) => !prevState);
  };

  const userData = JSON.parse(localStorage.getItem("user"));

  const { logout } = useContext(AuthContext);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleOptionsHandler}
          type="button"
          className="inline-flex justify-center mt-2 rounded-md  text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <svg
            className=" h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showOptions && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-2 space-y-4" role="none">
            <p
              className="text-white px-4 py-2 text-base bg-primary/80"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              {userData?.name}
            </p>
            <button
              onClick={logout}
              className="mx-4 text-white bg-green hover:bg-green/90  focus:ring-green/50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green dark:hover:bg-green/90 focus:outline-none dark:focus:ring-green/50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;

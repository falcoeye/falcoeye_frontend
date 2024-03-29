import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";

const DropDown = ({ userData }) => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptionsHandler = () => {
    setShowOptions((prevState) => !prevState);
  };

  const { logout } = useContext(AuthContext);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleOptionsHandler}
          type="button"
          className="inline-flex justify-center mt-2 rounded-md  text-sm font-medium text-gray-500 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
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
          className="origin-top-right absolute right-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-2 space-y-4" role="none">
            {userData ? (
              <Link
                className="text-white px-4 py-2 text-base bg-primary block"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
                to="/profile"
              >
                {userData.name}
              </Link>
            ) : (
              <div
                className="text-white px-4 py-2 text-base bg-primary block"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 rounded-full bg-gray-300 w-48"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              className="mx-4 text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5  bg-green hover:bg-green/90 focus:outline-none focus:ring-green/50"
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

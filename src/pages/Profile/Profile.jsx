import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Layout from "../../Components/Layout";
import AuthContext from "../../store/auth-context";
import { DebounceInput } from "react-debounce-input";

const Profile = () => {
  const { userData } = useContext(AuthContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (userData) setData(userData);
  }, [userData]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });

    // will complete it when BACKEND is ready.
  };

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-gray-900 text-xl capitalize dark:text-white">
          Profile
        </h2>

        <form className="mt-5 flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="text-gray-500 dark:text-gray-200">
              Name
            </label>
            {data ? (
              <DebounceInput
                debounceTimeout={500}
                type="text"
                id="name"
                className="modal_form_input !text-left !w-full !ml-0 dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white !rounded-md"
                name="name"
                placeholder="Name"
                value={data?.name || ""}
                onChange={inputChangeHandler}
              />
            ) : (
              <div className="animate-pulse min-h-[40px] max-h-[40px] py-[5px]">
                <div className="h-[36px] bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-gray-500 dark:text-gray-200">
              Email
            </label>
            {data ? (
              <DebounceInput
                debounceTimeout={500}
                type="text"
                id="email"
                className="modal_form_input !text-left !w-full !ml-0 dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white !rounded-md"
                name="email"
                placeholder="Email"
                value={data?.email || ""}
                onChange={inputChangeHandler}
              />
            ) : (
              <div className="animate-pulse min-h-[40px] max-h-[40px] py-[5px]">
                <div className="h-[36px] bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-gray-500 dark:text-gray-200"
            >
              Username
            </label>
            {data ? (
              <DebounceInput
                debounceTimeout={500}
                type="text"
                id="username"
                className="modal_form_input !text-left !w-full !ml-0 dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white !rounded-md"
                name="username"
                placeholder="Username"
                value={data?.username || ""}
                onChange={inputChangeHandler}
              />
            ) : (
              <div className="animate-pulse min-h-[40px] max-h-[40px] py-[5px]">
                <div className="h-[36px] bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;

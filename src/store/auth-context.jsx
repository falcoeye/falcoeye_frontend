import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Cookies } from "../shared/utility";
import axios from "../utility/api-instance";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, user) => {},
  logout: () => {},
  userData: null,
});

export const AuthContextProvider = (props) => {
  const intialToken = Cookies.getCookie("token");
  const initialUserData = JSON.parse(localStorage.getItem("user")) || null;

  const [token, setToken] = useState(intialToken);
  const [userData, setUserData] = useState(initialUserData);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, user) => {
    setToken(token);
    Cookies.setCookie("token", token);

    setUserData(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setToken(null);
    Cookies.deleteCookie("token");

    setUserData(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (!userData && token) {
      axios
        .get("/user/profile")
        .then((response) => {
          setUserData(response.data.user);
        })
        .catch((err) => {
          toast.error("Something went wrong!", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        });
    }
  }, [token, userData]);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

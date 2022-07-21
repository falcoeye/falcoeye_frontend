import React, { useState } from "react";
import { Cookies } from "../shared/utility";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userData: null,
});

export const AuthContextProvider = (props) => {
  const intialToken = Cookies.getCookie("token");
  const initialUserData = JSON.parse(localStorage.getItem("user"));

  const [token, setToken] = useState(intialToken);
  const [userData, setUserData] = useState(initialUserData);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, uData) => {
    setToken(token);
    Cookies.setCookie("token", token);

    setUserData(uData);
    localStorage.setItem("user", JSON.stringify(uData));
  };

  const logoutHandler = () => {
    setToken(null);
    Cookies.deleteCookie("token");

    setUserData(null);
    localStorage.removeItem("user");
  };

  const contextValue = {
    token: token,
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

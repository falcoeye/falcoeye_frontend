import React, { useState } from "react";
import { Cookies } from "../shared/utility";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, user) => {},
  logout: () => {},
  userData: null,
});

export const AuthContextProvider = (props) => {
  const intialToken = Cookies.getCookie("token");

  const initialUserData = JSON.parse(localStorage.getItem("user")) ||  null;

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

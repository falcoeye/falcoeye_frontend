import React, { useState } from "react";
import { Cookies } from "../shared/utility";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const intialToken = Cookies.getCookie("token");

    const [token, setToken] = useState(intialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        Cookies.setCookie("token", token);
    };

    const logoutHandler = () => {
        setToken(null);
        Cookies.deleteCookie("token");
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

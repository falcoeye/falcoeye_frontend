import axios from "axios";
import { Cookies } from "../shared/utility";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use(
  function (config) {
    let token = Cookies.getCookie("token");
    config.headers["Accept"] = "*/*";
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers["X-API-KEY"] = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Cookies.deleteCookie("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;

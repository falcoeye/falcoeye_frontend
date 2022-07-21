import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../store/auth-context";
import axios from "../../utility/axios-instance";

import "./Auth.css";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const { login } = authCtx;

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit =  (e) => {
    e.preventDefault();
    if (data.email.trim() === "" || data.password.trim() === "") {
      return toast.error("All fields are required!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }

    axios.post("/auth/login", data)
      .then(res => {
          login(res.data.access_token, res.data.user);
          navigate("/", { replace: true});
      })
      .catch( error => {
          if (error.response.data.message) {
            return toast.error(
              error.response.data.message || "Something went wrong!",
              {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              }
            );
          }
    
          Object.entries(error.response.data.errors).map((t, k) => {
            const errorMessage = `${t[0]}: ${t[1][0]}`;
    
            return toast.error(errorMessage, {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
          });
      } )
  };

  return (
    <div className="login_form_wrapper">
      <div className="login_form_box ">
        <div id="loginformContent">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              className="login_form_input "
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={data.email}
              required={true}
            />
            <input
              type="password"
              id="password"
              className="login_form_input "
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              required={true}
            />
            <button type="submit" className="login_form_btn" value="Login">
              Login
            </button>

            <p>
              Click here to
              <Link to="/signup" className="form_link">
                register now!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

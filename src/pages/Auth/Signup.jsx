import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../store/auth-context";
import axios from "../../utility/auth-instance";
import "./Auth.css";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
//import { addUser } from "../../store/user";
const Signup = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.name === null ||
      data.username === null ||
      data.password === null ||
      data.email === null
    ) {
      toast.error("All fields are required!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setIsLoading(true);
      try {
        const registeredData = await axios.post("/auth/register", data);
        setIsLoading(false);
        authCtx.login(
          registeredData.data.access_token,
          registeredData.data.user
        );
        navigate("/");
        if (errorMessage) {
          setErrorMessage("");
        }
      } catch (error) {
        setIsLoading(false);
        if (error.response.data.message) {
          setErrorMessage(
            error.response.data.message || "Something went wrong!"
          );
        }

        if (error.response.data.errors) {
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
        }
      }
    }
  };
  return (
    <div className="login_form_wrapper dark:!bg-slate-900">
      <div className="login_form_box ">
        <div id="loginformContent" className="dark:!bg-slate-800 !rounded-md">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              className="login_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white !rounded-md "
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={data.name}
              required={true}
            />
            <input
              type="text"
              id="username"
              className="login_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white !rounded-md "
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
              required={true}
            />
            <input
              type="email"
              id="email"
              className="login_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white !rounded-md "
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={data.email}
              required={true}
            />
            <input
              type="password"
              id="password"
              className="login_form_input dark:!bg-slate-700 dark:!border-gray-800 dark:!text-white !rounded-md "
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              required={true}
            />

            {errorMessage && <p className="error_text">{errorMessage}</p>}

            <button
              type="submit"
              className="login_form_btn !rounded-md"
              value="Signup"
              disabled={isLoading}
            >
              {isLoading && <LoadingSpinner />}
              {!isLoading && "Signup"}
            </button>

            <p className="dark:text-white">
              Click here to{" "}
              <Link to="/login" className="form_link">
                login
              </Link>{" "}
              now!
            </p>

            {process.env.REACT_APP_VERSION && (
              <p className=" text-center text-gray-400 text-base font-semibold mt-4">
                {`${process.env.REACT_APP_VERSION}`}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

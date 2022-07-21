import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utility/axios-instance";
import "./Auth.css";
//import { addUser } from "../../store/user";
const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: null,
    password: null,
    email: null,
    name: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
    console.log(data);
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
      try {
        const registered = await axios.post("/auth/register", data);
        localStorage.setItem("user", JSON.stringify(registered.data));
        //  dispatch(addUser(registered.data));

        navigate("/");
      } catch (error) {
        toast.error("Failed to register", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  return (
    <div className="login_form_wrapper">
      <div className="login_form_box ">
        <div id="loginformContent">
          <form>
            <input
              type="text"
              id="name"
              className="login_form_input "
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={data.name}
              required={true}
            />
            <input
              type="text"
              id="username"
              className="login_form_input "
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
              required={true}
            />
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
            <input
              type="submit"
              className="login_form_btn"
              value="Signup"
              onClick={handleSubmit}
            />

            <br />
            <a href="/login">Click here to login now!</a>
            <br />
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

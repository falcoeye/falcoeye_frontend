import React, { useEffect, useState } from 'react';
import './Auth.css';
import axios from '../../../axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../store/user';
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: null,
    password: null,
  });

  const dispatch = useDispatch();

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
    if (data.username === null || data.password === null) {
      toast.error('All fields are required!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        dispatch(
          addUser({
            user: {
              name: 'sdsdsd',
            },
            access_token: 'sdsdss',
          })
        );
        localStorage.setItem('user', JSON.stringify({
          user: {
            name: 'sdsdsd',
          },
          access_token: 'sdsdss',
        }));
        navigate('/');
        window.location.reload();
        const registered = await axios.post('/auth/login', data);
        localStorage.setItem('user', JSON.stringify(registered.data));
        console.log(registered.data);
        //dispatch(addUser(registered.data));

      } catch (error) {
        toast.error('Failed to Login', {
          position: 'top-center',
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
              id="email"
              className="login_form_input "
              name="username"
              placeholder="Email Address"
              onChange={handleChange}
              value={data.username}
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
              value="Login"
              onClick={handleSubmit}
            />
            <br />
            <a href="/signup">Click here to register now!</a>
            <br />
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

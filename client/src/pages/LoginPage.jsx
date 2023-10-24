import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/mask-group@2x.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="w-6 h-6"
    viewBox="0 0 48 48"
    {...props}
  >
    <defs>
      <path
        id="a"
        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <path fill="#FBBC05" d="M0 37V11l17 13z" clipPath="url(#b)" />
    <path fill="#EA4335" d="m0 11 17 13 7-6.1L48 14V0H0z" clipPath="url(#b)" />
    <path fill="#34A853" d="m0 37 30-23 7.9 1L48 0v48H0z" clipPath="url(#b)" />
    <path fill="#4285F4" d="M48 48 17 24l-4-3 35-10z" clipPath="url(#b)" />
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", email: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.MITKO_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, email, password } = values;
    if (username === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      <Link to="/">
        <img src={Logo} alt="MITKOAI Logo" className="w-20 h-20 ml-4 mb-2" />
      </Link>
      <p className="text-[#002D74] text-xl font-semibold mb-2">MITKOAI</p>
      <div className="max-w-md w-full bg-grey-100 p-4 flex flex-col rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-[#002D74] text-center mb-2">LogIn</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-gray-700 text-lg">User Name</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter User Name"
              className="w-full px-2 py-2 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autoFocus
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="text-gray-700 text-lg">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="w-full px-2 py-2 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autoFocus
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="text-gray-700 text-lg">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              minLength="8"
              className="w-full px-2 py-2 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              onChange={handleChange}
            />
          </div>
          

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white text-lg font-semibold rounded-lg py-2"
          >
            LogIn
          </button>
        </form>
        <div className="mt-4 grid grid-cols-3 items-center text-gray-500">
          <hr className="border-gray-500" />
          <p className="text-center text-lg">OR</p>
          <hr className="border-gray-500" />
        </div>
        <button className="bg-white border py-2 rounded-lg mt-4 flex justify-center items-center text-lg hoverScale-105 duration-300">
          <SvgComponent />
          <span className="ml-2">Login with Google</span>
        </button>
        <div className="text-lg flex justify-between items-center mt-4">
          <p style={{ color: "white" }}>Don't have an account...</p>
          <Link to="/register">
            <button className="py-2 px-4 bg-white border rounded-lg hover:scale-110 duration-300 border-blue-400">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

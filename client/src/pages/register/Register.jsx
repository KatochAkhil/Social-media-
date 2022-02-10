import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      userName: username.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmpassword: confirmpassword.current.value,
    };
    try {
      await axios.post("/auth/register", user);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social Media.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={submitHandler} className="loginBox">
            <input
              type="text"
              placeholder="Username"
              ref={username}
              className="loginInput"
            />
            <input
              type="email"
              placeholder="Email"
              ref={email}
              className="loginInput"
            />
            <input
              type="password"
              placeholder="Password"
              ref={password}
              className="loginInput"
            />
            <input
              type="password"
              placeholder="Password Again"
              ref={confirmpassword}
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login" className="loginRegisterLink">Log into Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

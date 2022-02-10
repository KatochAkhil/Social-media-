import React, { useRef } from "react";
import "./style.css";
import { loginCall } from "../../api";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    navigate("/");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on My Social Media.
          </span>
        </div>
        <div className="loginRight">
          <form
            className="loginBox"
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress size="20px" color="secondary" />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Create A New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

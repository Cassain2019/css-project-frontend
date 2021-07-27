import React, { useEffect, useState } from "react";
import Background from "./images/bg-01.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    require("./css/main.css");
    require("./fonts/iconic/css/material-design-iconic-font.min.css");
  }, []);
  const changeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const setCookie = (userData) => {
    toast.dismiss();
    localStorage.setItem("user_id", userData[0]._id);
    localStorage.setItem("user_type", userData[0].type);
    window.location.href = "/selection";
  };
  const exceptions = () => {
    toast.dismiss();
    toast.error(`Invalid Credentials`);

    document.getElementsByClassName("animebtn")[0].removeAttribute("disabled");
    document.getElementById("submitBtn").innerHTML = "Let Me In";

    document.getElementById("background").classList.remove();
    document.getElementById("LoginBackground").classList.remove();

    document
      .getElementById("background")
      .classList.add("container-login100-error");
    document
      .getElementById("LoginBackground")
      .classList.add("wrap-login100-error");
    document.getElementById("icon").innerHTML =
      '<i class="zmdi zmdi-alert-circle"></i>';
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Loading...");
    document
      .getElementsByClassName("animebtn")[0]
      .setAttribute("disabled", "disabled");
    document.getElementById("submitBtn").innerHTML =
      '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';
    await axios
      .post("https://css-project.herokuapp.com/login/", data)
      .then((res) =>
        res.data === "Invalid" || res.data === "error"
          ? exceptions()
          : setCookie(res.data)
      )
      .catch(() => {
        exceptions();
        toast.dismiss();
        toast.error("Server Error");
      });
  };
  return (
    <div className="limiter">
      <div
        className="container-login100"
        id="background"
        style={{ backgroundImage: `url(` + Background + `)` }}
      >
        <Toaster />
        <div className="wrap-login100" id="LoginBackground">
          <form className="login100-form validate-form" onSubmit={onSubmit}>
            <span className="login100-form-logo" id="icon">
              <i className="zmdi zmdi-landscape"></i>
            </span>

            <span className="login100-form-title p-b-34 p-t-27 mt-4">
              Log in
            </span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter Email"
            >
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={changeData}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xf207;"
              ></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={changeData}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xf191;"
              ></span>
            </div>

            <div className="contact100-form-checkbox">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox100" for="ckb1">
                Remember me
              </label>
            </div>

            <div className="container-login100-form-btn">
              <button className="animebtn" type="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p style={{ color: "#03e9f4" }} id="submitBtn">
                  Let Me In
                </p>
              </button>
            </div>
            <div className="text-center p-t-90 mt-4">
              <a className="txt1" href="/">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

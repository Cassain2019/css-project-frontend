import axios from "axios";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast from 'react-hot-toast';
import InputMask from "react-input-mask";
import $ from 'jquery';

function Account() {
  const [user, setUser] = new useState({});
  const FormData = require("form-data");
  const toastFields = { duration: 4000, position: 'top-center' };

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/" + localStorage.getItem("user_id"))
      .then((res) => setUser(res.data))
      .catch((err) => console.log("Error: " + err));
  }, [setUser]);
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/users/" + localStorage.getItem("user_id"), user)
      .then((res) => {
        res.data === "Updated"
          ? toast.success(`Info Updated`, toastFields)
          : toast.error("Please Contact Us", toastFields)
      })
      .catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) });
  };
  return (
    <>
      <div className="card-header">
        <h4 className="card-title text-primary">Account Settings</h4>
      </div>
      <div className="card-body">
        <div className="d-flex flex-row bd-highlight">
          <div className="p-2 bd-highlight">
            <img src={user.image} className="img-fluid rounded border border-primary" style={{ height: '110px' }} alt="A generic square placeholder with rounded corners in a figure." />
          </div>
          <div className="p-2 bd-highlight">
            <button className="btn btn-outline-primary mt-5" onClick={(e) => {
              e.preventDefault();
              $('#image').click();
            }}>
              Upload Image
              <span className="btn-icon-right">
                <i className="fa fa-cloud-upload"></i>
              </span>
            </button>
            <input type="file" name="image" id="image" onChange={(e) => {
              var form = new FormData();
              form.append("file", e.target.files[0]);
              axios.post("http://localhost:4000/userUpload/" + localStorage.getItem("user_id"), form,
                {
                  headers: { "Content-Type": "multipart/form-data" }
                })
                .then((res) => {
                  res.data === "Updated"
                    ? toast.success(`Image Updated`, toastFields)
                    : toast.error("Please Contact Us", toastFields)
                })
                .catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) })
            }} hidden />
            <button className="btn btn-outline-danger  ml-1 mt-5"
              onClick={(e) => {
                e.preventDefault();
                axios.post("http://localhost:4000/users/" + localStorage.getItem("user_id"),
                  { image: (user.gender === "Male") ? "images/users/man.png" : "images/users/woman.png" }
                )
                  .then((res) => {
                    res.data === "Updated"
                      ? toast.success(`Image Removed`, toastFields)
                      : toast.error("Please Contact Us", toastFields)
                  })
                  .catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) })
              }}>
              Remove Image
              <span className="btn-icon-right">
                <i className="fa fa-window-restore" aria-hidden="true"></i>
              </span>
            </button><br />
            <small>Profile image must be: JPEG, PNG, or GIF</small>
          </div>
        </div>
        <hr />
        <div className="settings-form">
          <form onSubmit={onSubmit} className="mt-3">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="John ...."
                  className="form-control"
                  defaultValue={user.firstName}
                  name="firstName"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Doe?..."
                  defaultValue={user.lastName}
                  name="lastName"
                  onChange={onChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="someone@example.com"
                  defaultValue={user.email}
                  name="email"
                  onChange={onChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label>Phone</label>
                <InputMask
                  mask="+(99) 99999999-99"
                  maskChar=" "
                  placeholder="+(xx) xxxxxx-xxx"
                  value={user.contact}
                  onChange={onChange}
                  name="contact"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label>Gender</label>
                <Select
                  value={{
                    value: user.gender,
                    label: user.gender,
                  }}
                  options={[
                    {
                      value: "Male",
                      label: "Male",
                      target: { name: "gender", value: "Male" },
                    },
                    {
                      value: "Female",
                      label: "Female",
                      target: { name: "gender", value: "Female" },
                    },
                    {
                      value: "Others",
                      label: "Others",
                      target: { name: "gender", value: "Others" },
                    },
                  ]}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                placeholder="1234 Main St"
                className="form-control"
                name="address"
                onChange={onChange}
                rows="4"
                defaultValue={user.address}
                required
              ></textarea>
            </div>
            <div className="col-12 text-center">
              <button className="customBtn third pulse" type="submit">
                Update Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Account;

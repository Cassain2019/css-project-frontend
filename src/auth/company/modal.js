import { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import Select from "react-select";
import toast from 'react-hot-toast';;

export default function Modal() {
  useEffect(() => {
    require("./css/kit.css");
  }, []);
  const [data, setData] = new useState({
    o_id: localStorage.getItem("user_id"),
    name: "",
    email: "",
    type: "",
    ntn: "",
    phone: "",
    invoiceFormat: "INV-",
    logo: "images/companies/logo.png",
    address: "",
    FormatDetails: false,
    country: "Pakistan",
    state: "",
    city: "",
    currency: "PKR - Rs",
    currSymbol: "Rs",
    dial_code: "+92",

  });
  const tabChange = (e) => {
    e.preventDefault();
    if (e.target.className === "next") {
      if ($(".tab-content > .show").next("div").length !== 0) {
        $(".tab-content > .show")
          .removeClass("show active")
          .next("div")
          .addClass("show active");
      }
    } else {
      if ($(".tab-content > .show").prev("div").length !== 0) {
        $(".tab-content > .show")
          .removeClass("show active")
          .prev("div")
          .addClass("show active");
      }
    }
  };

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.loading('Loading...');
    await axios
      .post("http://localhost:4000/companies/", data)
      .then((res) => getStarted(res.data))
      .catch(() => { toast.dismiss(); toast.error("Server Error"); });
  };

  const getStarted = (data) => {
    toast.dismiss();
    toast.success(`Welcome Into ${data.name}'s Portal`);
    localStorage.setItem('company_id', data._id);
    window.location.href = "/";
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title mb-4"
              style={{ color: "#6b6f82", fontSize: "16px" }}
            >
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </h5>
          </div>
          <div className="modal-body">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="firstPage"
                role="tabpanel"
                aria-labelledby="firstPage-tab"
              >
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src="images/intro-slide-1.png"
                      style={{ width: "200px" }}
                      alt="demo"
                    />
                  </div>
                  <div
                    className="col-md-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <h3 className="mt-3" style={{ color: "#8e24aa" }}>
                      Tell us about your business.
                    </h3>
                  </div>
                  <div
                    className="col-md-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <p className="text-center">
                      Let’s get to know what you need so we can tailor things to
                      fit you. You can change your info anytime in Settings.
                    </p>
                  </div>
                  <div className="col-md-12">
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          onChange={onChange}
                          className="form-control"
                          placeholder="1234 Main St"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          onChange={onChange}
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="type">Type</label>
                        <Select
                          className="form-control"
                          name="type"
                          onChange={onChange}
                          options={[
                            {
                              value: "Sole Trader",
                              label: "Sole Trader",
                              target: { name: "type", value: "Sole Trader" },
                            },
                            {
                              value: "Charity & Assossiation",
                              label: "Charity & Assossiation",
                              target: { name: "type", value: "Charity & Assossiation" },
                            },
                            {
                              value: "Traded company or co-operative",
                              label: "Traded company or co-operative",
                              target: {
                                name: "type",
                                value: "Traded company or co-operative",
                              },
                            },
                            {
                              value: "Private Limited Company",
                              label: "Private Limited Company",
                              target: {
                                name: "type",
                                value: "Private Limited Company",
                              },
                            },
                            {
                              value: "Patnership",
                              label: "Patnership",
                              target: { name: "type", value: "Patnership" },
                            },
                            {
                              value: "Something Else",
                              label: "Something Else",
                              target: { name: "type", value: "Something Else" },
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="secondPage"
                role="tabpanel"
                aria-labelledby="secondPage-tab"
              >
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src="images/intro-features.png"
                      style={{ width: "200px" }}
                      alt="demo"
                    />
                  </div>
                  <div
                    className="col-md-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <h3 className="mt-3" style={{ color: "#8e24aa" }}>
                      A Little Bit More.
                    </h3>
                  </div>
                  <div
                    className="col-md-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <p className="text-center">
                      Just a Little bit more and you'll then proceed to managing
                      your stuff..
                    </p>
                  </div>
                  <div className="col-md-12">
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          onChange={onChange}
                          className="form-control"
                          placeholder="1234 Main St"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="ntn">NTN</label>
                        <input
                          type="number"
                          id="ntn"
                          name="ntn"
                          onChange={onChange}
                          className="form-control"
                          placeholder="NTN"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="address">Address</label>
                        <textarea
                          className="form-control"
                          id="address"
                          onChange={onChange}
                          name="address"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="lastPage"
                role="tabpanel"
                aria-labelledby="lastPage-tab"
              >
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src="images/intro-app.png"
                      style={{ width: "200px" }}
                      alt="demo"
                    />
                  </div>
                  <div
                    className="col-md-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <h3 className="mt-4" style={{ color: "#8e24aa" }}>
                      Thanks For All Your Efforts
                    </h3>
                  </div>
                  <div
                    className="col-md-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      type="button"
                      id="submitBtn"
                      className="btn btn-rounded btn-success mt-4 mb-5"
                      style={{ background: "rgb(142, 36, 170)" }}
                      onClick={onSubmit}
                    >
                      Let's Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-footer"
            style={{ display: "table-footer-group" }}
          >
            <div style={{ display: "flex" }}>
              <div className="col-md-6">
                <a className="prev" href="/" onClick={tabChange}>
                  &lt; Prev
                </a>
              </div>
              <div
                className="col-md-6"
                style={{ justifyContent: "flex-end", display: "flex" }}
              >
                <a className="next" href="/" onClick={tabChange}>
                  Next &gt;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

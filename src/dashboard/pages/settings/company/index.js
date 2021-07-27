/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import ReactTooltip from "react-tooltip";
import $ from "jquery";

function Company() {
  const [company, setcompany] = new useState([{ logo: "" }]);
  const toastFields = { duration: 4000, position: "top-center" };
  useEffect(() => {
    axios
      .get(
        "https://css-project.herokuapp.com/companies/" +
          localStorage.getItem("company_id")
      )
      .then((res) => setcompany([res.data]))
      .catch((err) => console.log("Error: " + err));
  }, []);
  const onChange = (e) => {
    setcompany([
      {
        ...company[0],
        [e.target.name]: e.target.value,
      },
    ]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://css-project.herokuapp.com/companies/" +
          localStorage.getItem("company_id"),
        company[0]
      )
      .then((res) => {
        res.data === "Updated"
          ? toast.success(`Company Info Updated`, toastFields)
          : toast.error("Please Contact Us", toastFields);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Server Error", toastFields);
      });
  };
  return (
    <>
      <div className="card-header">
        <h4 className="card-title text-primary">Company Settings</h4>
      </div>
      <div className="card-body">
        <div className="d-flex flex-row bd-highlight">
          <div className="p-2 bd-highlight">
            <img
              src={company[0].logo}
              className="img-fluid rounded border"
              style={{ height: "110px" }}
              alt="A generic square placeholder with rounded corners in a figure."
            />
          </div>
          <div className="p-2 bd-highlight">
            <button
              className="btn btn-outline-primary mt-5"
              onClick={(e) => {
                e.preventDefault();
                $("#logo").click();
              }}
            >
              Upload Image
              <span className="btn-icon-right">
                <i className="fa fa-cloud-upload"></i>
              </span>
            </button>
            <input
              type="file"
              name="logo"
              id="logo"
              onChange={(e) => {
                var form = new FormData();
                form.append("file", e.target.files[0]);
                axios
                  .post(
                    "https://css-project.herokuapp.com/compUpload/" +
                      localStorage.getItem("company_id"),
                    form,
                    {
                      headers: { "Content-Type": "multipart/form-data" },
                    }
                  )
                  .then((res) => {
                    res.data === "Updated"
                      ? toast.success(`Image Updated`, toastFields)
                      : toast.error("Please Contact Us", toastFields);
                  })
                  .catch((err) => {
                    toast.dismiss();
                    toast.error("Server Error", toastFields);
                  });
              }}
              hidden
            />
            <button
              className="btn btn-outline-danger  ml-1 mt-5"
              onClick={(e) => {
                e.preventDefault();
                axios
                  .post(
                    "https://css-project.herokuapp.com/companies/" +
                      localStorage.getItem("company_id"),
                    { logo: "images/companies/company.png" }
                  )
                  .then((res) => {
                    res.data === "Updated"
                      ? toast.success(`Image Removed`, toastFields)
                      : toast.error("Please Contact Us", toastFields);
                    axios
                      .get(
                        "https://css-project.herokuapp.com/companies/" +
                          localStorage.getItem("company_id")
                      )
                      .then((res) => setcompany([res.data]))
                      .catch((err) => console.log("Error: " + err));
                  })
                  .catch((err) => {
                    toast.dismiss();
                    toast.error("Server Error", toastFields);
                  });
              }}
            >
              Remove Image
              <span className="btn-icon-right">
                <i className="fa fa-window-restore" aria-hidden="true"></i>
              </span>
            </button>
            <br />
            <small>Profile image must be: JPEG, PNG, or GIF</small>
          </div>
        </div>
        <hr />
        {company.map((element, index) => {
          return (
            <div className="settings-form">
              <form onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Microsoft ...."
                      className="form-control"
                      value={element.name}
                      name="name"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="company@example.com"
                      value={element.email}
                      name="email"
                      onChange={onChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Type</label>
                    <Select
                      id="inputState"
                      onChange={onChange}
                      value={{
                        value: element.type,
                        label: element.type,
                      }}
                      options={[
                        {
                          value: "Sole Trader",
                          label: "Sole Trader",
                          target: { name: "type", value: "Sole Trader" },
                        },
                        {
                          value: "Patnership",
                          label: "Patnership",
                          target: { name: "type", value: "Patnership" },
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
                          value: "Traded company or co-operative",
                          label: "Traded company or co-operative",
                          target: {
                            name: "type",
                            value: "Traded company or co-operative",
                          },
                        },
                        {
                          value: "Charity & Assossiation",
                          label: "Charity & Assossiation",
                          target: {
                            name: "type",
                            value: "Charity & Assossiation",
                          },
                        },
                        {
                          value: "Company",
                          label: "Company",
                          target: { name: "type", value: "Company" },
                        },
                        {
                          value: "Something Else",
                          label: "Something Else",
                          target: { name: "type", value: "Something Else" },
                        },
                      ]}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Phone</label>
                    <InputMask
                      mask="+(99) 99999999-99"
                      maskChar=" "
                      placeholder="+(xx) xxxxxx-xxx"
                      value={element.phone}
                      onChange={onChange}
                      name="phone"
                      className="form-control"
                    />
                  </div>
                  <ReactTooltip id="invoiceTip" place="top" effect="solid">
                    Customize InvoiceFormat
                  </ReactTooltip>
                  <div className="form-group col-md-3">
                    <label>Invoice Format</label>
                    <div className="input-group">
                      <div
                        className="input-group-prepend"
                        data-tip
                        data-for="invoiceTip"
                      >
                        <div className="input-group-text">
                          <input
                            type="checkbox"
                            name="FormatDetails"
                            id="FormatDetails"
                            checked={element.FormatDetails ? "checked" : ""}
                            onChange={(e) => {
                              setcompany([
                                {
                                  ...company[0],
                                  [e.target.name]:
                                    $("#FormatDetails").is(":checked"),
                                },
                              ]);
                              $("#FormatDetails").is(":checked")
                                ? $(".invoiceFormat").html("mmyy-1")
                                : $(".invoiceFormat").html("1");
                            }}
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="INV-"
                        name="invoiceFormat"
                        value={element.invoiceFormat}
                        onChange={onChange}
                        className="form-control"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text invoiceFormat">
                          1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label>NTN</label>
                    <InputMask
                      mask="9999999-9"
                      maskChar=" "
                      value={element.ntn}
                      name="ntn"
                      onChange={onChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>STRN</label>
                    <InputMask
                      mask="9999999999999"
                      maskChar=" "
                      value={element.strn}
                      name="strn"
                      onChange={onChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>PSTR</label>
                    <InputMask
                      mask="9999999999-aa"
                      maskChar=" "
                      value={element.pstrn}
                      name="pstrn"
                      onChange={onChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <input
                    type="text"
                    placeholder="Notes"
                    value={element.notes}
                    name="notes"
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    placeholder="1234 Main St"
                    className="form-control"
                    name="address"
                    value={element.address}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tagline</label>
                  <textarea
                    placeholder="e.g 'Our business is to understand your business.'"
                    className="form-control"
                    name="tagLine"
                    value={element.tagLine}
                    onChange={onChange}
                    rows="4"
                  ></textarea>
                </div>
                <div className="col-12 text-center">
                  <button className="customBtn third pulse" type="submit">
                    Modify Information
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Company;

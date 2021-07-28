/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Select from "react-select";
import toast, { Toaster } from 'react-hot-toast';
import $ from "jquery";
import InputMask from "react-input-mask";

export default function Dealers() {
  const location = useLocation();
  const [category, setmainCats] = new useState([]);
  let { id } = useParams();
  const [data, setData] = new useState({
    company: [localStorage.getItem("company_id")],
    name: "",
    email: "",
    phone: "",
    ntn: "",
    gst: "",
    notes: "",
    category: ".",
    type: location.pathname
      .replace("/form", "")
      .replace(`/${id}`, "")
      .replace("/", ""),
    address: "",
    creditTerms: "",
  });
  const toastFields = { duration: 4000, position: 'top-center' };


  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/dealers/specific/` + id)
        .then((res) => setData(res.data))
        .catch((err) => console.log("Error: " + err));
    }
    axios
      .get("http://localhost:4000/categories/company/" + localStorage.getItem("company_id"))
      .then((res) => setmainCats(res.data))
      .catch((err) => console.log("Error: " + err));
  }, []);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    toast.loading("Loading...");

    $(".animeBtn").attr("disabled", "disabled");
    $("#btnContent").html('<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>');
    if (!Object.values(data).every((element) => element !== "") === false) {
      let url = "http://localhost:4000/dealers/";
      if (id) { url = "http://localhost:4000/dealers/" + id; }
      axios
        .post(url, data)
        .then((res) => {
          toast.dismiss();
          if (res.data === "Added" || res.data === "Updated") {
            toast.success(`${id ? "Updated" : "Created"} Dealer`, toastFields);
            $(".animeBtn").removeAttr("disabled");
            $("#btnContent").html(`${id ? "Update" : "Create"} ${location.pathname.replace("/form", "").replace(`/${id}`, "").replace("/", "")}`);
            if (!id) {
              setData({
                company: [localStorage.getItem("company_id")],
                name: "",
                email: "",
                phone: "",
                ntn: "",
                gst: "",
                notes: "",
                category: ".",
                type: location.pathname
                  .replace("/form", "")
                  .replace(`/${id}`, "")
                  .replace("/", ""),
                address: "",
              });
            }
          } else {
            toast.error("Dealer Already Exists", toastFields);
          }
        })
        .catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) });
    } else {
      toast.dismiss();
      toast.error("Missing Fields", toastFields);
    }
  };
  return (
    <div className="content-body" style={{ textTransform: "capitalize" }}>
      <div className="container-fluid">
        <Toaster />
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  {location.pathname.replace("/form", "").replace(`/${id}`, "").replace("/", "")}{" "}
                  From
                </h4>
              </div>
              <div className="card-body">
                <div className="settings-form">
                  <form onSubmit={submit}>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label>
                          {location.pathname.replace("/form", "").replace(`/${id}`, "").replace("/", "")}{" "}
                          Name
                        </label>
                        <input
                          type="text"
                          onChange={onChange}
                          value={data.name}
                          name="name"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Email</label>
                        <input
                          type="email"
                          onChange={onChange}
                          value={data.email}
                          name="email"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Credit Terms</label>
                        <Select
                          onChange={onChange}
                          options={[
                            {
                              value: "7 Days Terms",
                              label: "7 Days Terms",
                              target: { value: "7 Days Term", name: "creditTerms" }
                            }, {
                              value: "15 Days Terms",
                              label: "15 Days Terms",
                              target: { value: "15 Days Terms", name: "creditTerms" }
                            },
                            {
                              value: "30 Days Terms",
                              label: "30 Days Terms",
                              target: { value: "30 Days Terms", name: "creditTerms" }
                            },
                            {
                              value: "60 Days Terms",
                              label: "60 Days Terms",
                              target: { value: "60 Days Terms", name: "creditTerms" }
                            },
                            {
                              value: "90 Days Terms",
                              label: "90 Days Terms",
                              target: { value: "90 Days Terms", name: "creditTerms" }
                            }
                          ]}
                          value={{ value: data.creditTerms, label: data.creditTerms }}
                          name="creditTerms"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Phone</label>
                        <InputMask
                          mask="+(99) 99999999-99"
                          maskChar=" "
                          onChange={onChange}
                          value={data.phone}
                          name="phone"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      {location.pathname
                        .replace("/form", "")
                        .replace(`/${id}`, "")
                        .replace("/", "") === "supplier" ? (
                        <div className="form-group col-md-6">
                          <label>Category</label>
                          <Select
                            value={category.map((cat, index) => {
                              if (cat._id === data.category) {
                                return {
                                  value: cat._id,
                                  label: cat.category,
                                };
                              }
                              return null;
                            })}
                            options={category.map((cat, index) => {
                              return {
                                value: cat._id,
                                label: cat.category,
                                target: { name: "category", value: cat._id },
                              };
                            })}
                            onChange={onChange}
                          />
                        </div>
                      ) : (
                        <div className="form-group col-md-6">
                          <label>Notes</label>
                          <input
                            type="text"
                            name="notes"
                            value={data.notes}
                            onChange={onChange}
                            className="form-control"
                          />
                        </div>
                      )}
                      <div className="form-group col-md-3">
                        <label>NTN</label>
                        <InputMask
                          mask="9999999-9"
                          maskChar=" "
                          onChange={onChange}
                          name="ntn"
                          value={data.ntn}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>GST</label>
                        <InputMask
                          mask="9999999999999"
                          maskChar=" "
                          onChange={onChange}
                          value={data.gst}
                          name="gst"
                          className="form-control"
                        />
                      </div>
                    </div>
                    {location.pathname
                      .replace("/form", "")
                      .replace(`/${id}`, "")
                      .replace("/", "") === "supplier" ? (
                      <div className="form-group">
                        <label>Notes</label>
                        <input
                          type="text"
                          name="notes"
                          value={data.notes}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        onChange={onChange}
                        value={data.address}
                        name="address"
                        rows={4}
                        className="form-control"
                      ></textarea>
                    </div>
                    <div className="form-group text-center mt-2">
                      <button className="animebtn" type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <p style={{ margin: 1 }} id="btnContent">
                          {id ? "Update " : "Create "}
                          {location.pathname
                            .replace("/form", "")
                            .replace(`/${id}`, "")
                            .replace("/", "")}
                        </p>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

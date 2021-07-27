/* eslint-disable no-unused-vars */
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";

export default function Form() {
  let { id } = useParams();
  const FormData = require("form-data");

  const [category, setCategory] = new useState([]);
  const [sub, setSub] = new useState([]);
  const [tax, setTax] = new useState([]);
  const [unit, setUnit] = new useState([]);
  const [product, setProduct] = new useState({});
  const [props, setprops] = new useState({
    company: [localStorage.getItem("company_id")],
    category: "",
    subCategory: "",
    name: "",
    tax: "",
    unit: "",
    packSize: "",
    cost: "",
    image: "images/product/product.png",
    status: "Active",
    current_stock: "",
    reorder_stock: "",
    stockDate: "",
    description: "",
  });
  const [file, setFile] = new useState({ file: "" });
  const toastFields = { duration: 4000, position: "top-center" };

  useEffect(() => {
    async function requests() {
      require("dropify/dist/css/dropify.min.css");
      require("dropify");
      $(".dropify").dropify();
      // CATEGORY
      axios
        .get(
          "https://css-project.herokuapp.com/categories/company/" +
            localStorage.getItem("company_id")
        )
        .then((res) => setCategory(res.data))
        .catch((err) => console.log("Error: " + err));

      // SUB CATEGORY
      axios
        .get(
          "https://css-project.herokuapp.com/subcategories/company/" +
            localStorage.getItem("company_id")
        )
        .then((res) => setSub(res.data))
        .catch((err) => console.log("Error: " + err));

      // UNIT
      axios
        .get(
          "https://css-project.herokuapp.com/units/company/" +
            localStorage.getItem("company_id")
        )
        .then((res) => setUnit(res.data))
        .catch((err) => console.log("Error: " + err));

      // Tax
      axios
        .get(
          "https://css-project.herokuapp.com/taxes/company/" +
            localStorage.getItem("company_id")
        )
        .then((res) => setTax(res.data))
        .catch((err) => console.log("Error: " + err));

      // PRODUCT
      if (id) {
        axios
          .get("https://css-project.herokuapp.com/products/" + id)
          .then((res) => {
            setProduct(res.data);
            setprops({
              comapny: [localStorage.getItem("company_id")],
              category: res.data.subCategory.category._id,
              subCategory: res.data.subCategory._id,
              name: res.data.name,
              tax: res.data.tax._id,
              unit: res.data.unit._id,
              packSize: res.data.packSize,
              cost: res.data.cost,
              image: res.data.image,
              status: res.data.status,
              current_stock: res.data.current_stock,
              reorder_stock: res.data.reorder_stock,
              stockDate: res.data.stockDate,
              description: res.data.description,
            });
            var dropify = $(".dropify").dropify({
              defaultFile: res.data.image,
            });
            dropify = dropify.data("dropify");
            dropify.resetPreview();
            dropify.clearElement();
            dropify.settings.defaultFile = res.data.image;
            dropify.destroy();
            dropify.init();
          })
          .catch((err) => console.log("Error: " + err));
      }
    }
    requests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setprops({
      ...props,
      [e.target.name]: e.target.value,
    });
  };
  const fileChange = (e) => {
    setFile({
      file: e.target.files[0],
    });
    setprops({
      ...props,
      image: id
        ? "images/product/" + id + "." + e.target.files[0].name.split(".")[1]
        : "images/product/",
    });
  };
  const categoryChange = (e) => {
    axios
      .get(
        "https://css-project.herokuapp.com/subcategories/category/" + e.value
      )
      .then((res) => setSub(res.data))
      .catch((err) => console.log("Error: " + err));
    onChange(e);
  };

  const submit = (e) => {
    e.preventDefault();
    toast.loading("Loading...");

    var form = new FormData();
    form.append("file", file.file);
    for (let key in props) {
      form.append(key, props[key]);
    }
    $(".animeBtn").attr("disabled", "disabled");
    $("#btnContent").html(
      '<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>'
    );
    if (!Object.values(props).every((element) => element !== "") === false) {
      let url = "https://css-project.herokuapp.com/products/";
      if (id) {
        url = "https://css-project.herokuapp.com/products/" + id;
      }
      axios
        .post(url, form, { headers: { "Content-Type": "multipart/form-data" } })
        .then((res) => {
          toast.dismiss();
          if (res.data === "Added" || res.data === "Updated") {
            toast.success(`${id ? "Updated" : "Created"} Product`, toastFields);
            if (!id) {
              setprops({
                company: [localStorage.getItem("company_id")],
                category: "",
                subCategory: "",
                name: "",
                tax: "",
                unit: "",
                packSize: "",
                cost: "",
                image: "images/product/product.png",
                status: "Active",
                current_stock: "",
                reorder_stock: "",
                stockDate: "",
                description: "",
              });
            }
          } else {
            toast.error("Product Already Exists", toastFields);
          }
        })
        .catch(() => {
          toast.dismiss();
          toast.error("Server Error", toastFields);
        });
    } else {
      toast.dismiss();
      toast.error("Missing Fields", toastFields);
    }
    $(".animeBtn").removeAttr("disabled");
    $("#btnContent").html(`${id ? "Update" : "Create"} Product`);
  };
  return (
    <div className="content-body">
      <div className="container-fluid">
        <Toaster />
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h4>Product From</h4>
              </div>
              <div className="card-body">
                <div className="settings-form">
                  <form onSubmit={submit}>
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        onChange={onChange}
                        placeholder="Brand Name | Product Name | Class Name | Model No | Color Name"
                        name="name"
                        value={props.name}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-row"></div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Main Category</label>
                        <Select
                          value={category.map((element, index) => {
                            if (element._id === props.category) {
                              return {
                                value: element._id,
                                label: element.category,
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
                          onChange={categoryChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Sub Category</label>
                        <Select
                          value={sub.map((element, index) => {
                            if (element._id === props.subCategory) {
                              return {
                                value: element._id,
                                label: element.subcategory,
                              };
                            }
                            return null;
                          })}
                          options={sub.map((cat, index) => {
                            return {
                              value: cat._id,
                              label: cat.subcategory,
                              target: { name: "subCategory", value: cat._id },
                            };
                          })}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label>Tax</label>
                        <Select
                          value={tax.map((element, index) => {
                            if (element._id === props.tax) {
                              return {
                                value: element._id,
                                label: `${element.name}  - ${element.percentage}%`,
                              };
                            }
                            return null;
                          })}
                          options={tax.map((tax, index) => {
                            return {
                              value: tax._id,
                              label: `${tax.name}  - ${tax.percentage}%`,
                              target: { name: "tax", value: tax._id },
                            };
                          })}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Unit</label>
                        <Select
                          value={unit.map((element, index) => {
                            if (element._id === props.unit) {
                              return {
                                value: element._id,
                                label: element.unit,
                              };
                            }
                            return null;
                          })}
                          options={unit.map((unit, index) => {
                            return {
                              value: unit._id,
                              label: unit.unit,
                              target: { name: "unit", value: unit._id },
                            };
                          })}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Product Cost</label>
                        <input
                          className="form-control"
                          type="number"
                          name="cost"
                          value={props.cost}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className="form-group col-md-2">
                        <label>Packsize</label>
                        <input
                          type="text"
                          onChange={onChange}
                          name="packSize"
                          value={props.packSize}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Describtion</label>
                      <input
                        type="text"
                        name="description"
                        onChange={onChange}
                        value={props.description}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Product Image</label>
                      <input
                        type="file"
                        className="dropify"
                        onChange={fileChange}
                        data-max-file-size="3M"
                        data-default-file={props.image}
                      />
                    </div>

                    <h4 className="text-primary mt-3">Stock Information</h4>
                    <hr />
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Current Stock</label>
                        <input
                          className="form-control"
                          name="current_stock"
                          type="number"
                          onChange={onChange}
                          value={props.current_stock}
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label>Reorder Stock at</label>
                        <input
                          className="form-control"
                          type="number"
                          name="reorder_stock"
                          value={props.reorder_stock}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className="form-group col-md-2">
                        <label>Date</label>
                        <input
                          className="form-control"
                          type="date"
                          name="stockDate"
                          value={props.stockDate}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group text-center mt-2">
                      <button className="animebtn" type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <p style={{ margin: 5 }} id="btnContent">
                          {id ? "Update" : "Create"} Product
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

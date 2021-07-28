import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

import { Toaster } from "react-hot-toast";

// Modals
import MainCategory from "../component/mainCategory";
import SubCategory from "../component/subcategory";
import Unit from "../component/unit";
import Tax from "../component/tax";

export default function View() {
  const [products, setProduct] = new useState([]);
  useEffect(() => {
    // PRODUCT
    axios
      .get("http://localhost:4000/products/company/" + localStorage.getItem("company_id"))
      .then((res) => setProduct(res.data))
      .catch((err) => console.log("Error: " + err));
  }, [setProduct]);

  const filter = (e) => {
    let value = e.target.value;
    $("#products tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1);
      return null;
    });
  };
  return (
    <div className="content-body">
      <div className="container-fluid">
        <Toaster />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Products</h4>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={filter}
                    placeholder="Search Products"
                  />
                  <div className="input-group-prepend">
                    <Link
                      type="button"
                      to="/product/form"
                      className="btn btn-primary"
                    >
                      Create a Product
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                      data-toggle="dropdown"
                    >
                      <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu">
                      <Link
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target="#mainCategory"
                        to="/product"
                      >
                        Main Category
                      </Link>
                      <Link
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target="#subCategory"
                        to="/product"
                      >
                        Sub Category
                      </Link>
                      <Link
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target="#taxModal"
                        to="/product"
                      >
                        Tax Details
                      </Link>
                      <Link
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target="#unitModal"
                        to="/product"
                      >
                        Unit
                      </Link>
                    </div>
                  </div>
                </div>
                <MainCategory />
                <SubCategory />
                <Unit />
                <Tax />
                <div className="table-responsive">
                  <table className="table table-responsive-md">
                    <thead>
                      <tr>
                        <th></th>
                        <th>
                          <strong>Name</strong>
                        </th>
                        <th>
                          <strong>Category</strong>
                        </th>
                        <th>
                          <strong>Sub Category</strong>
                        </th>
                        <th>
                          <strong>Unit</strong>
                        </th>
                        <th>
                          <strong>Cost</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="products">
                      {products.map((element, index) => {
                        return (
                          <tr key={element._id}>
                            <td></td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={element.image}
                                  className="rounded-lg mr-1"
                                  width="24"
                                  alt=""
                                />
                                <span className="w-space-no">{element.name}</span>
                              </div>
                            </td>
                            <td>
                              <strong>
                                {element.subCategory.category.category}
                              </strong>
                            </td>
                            <td>{element.subCategory.subcategory}</td>
                            <td>{element.unit.unit}</td>
                            <td>{element.cost}</td>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to={`/product/form/${element._id}`}
                                  className="btn btn-primary shadow btn-xs sharp mr-1"
                                >
                                  <i className="fa fa-pencil"></i>
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-danger shadow btn-xs sharp"
                                >
                                  <i className="fa fa-trash"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

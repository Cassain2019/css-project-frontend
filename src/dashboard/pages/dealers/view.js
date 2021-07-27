import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

// Modals
import MainCategory from "../component/mainCategory";
import SubCategory from "../component/subcategory";
import Unit from "../component/unit";
import Tax from "../component/tax";

export default function View() {
  const [dealers, setDealers] = new useState([]);
  const location = useLocation();
  useEffect(() => {
    axios
      .get(
        `https://css-project.herokuapp.com/dealers/${location.pathname.replace(
          "/",
          ""
        )}/company/` + localStorage.getItem("company_id")
      )
      .then((res) => setDealers(res.data))
      .catch((err) => console.log("Error: " + err));
  }, [location.pathname, setDealers]);

  const filter = (e) => {
    let value = e.target.value;
    $("#dealers tr").filter(function () {
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      return null;
    });
  };
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">
                  {location.pathname.replace("/", "") + "s"}
                </h4>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      "Search " + location.pathname.replace("/", "") + "s"
                    }
                    onChange={filter}
                  />
                  <div className="input-group-prepend">
                    <Link
                      type="button"
                      to={`/${location.pathname.replace("/", "")}/form`}
                      className="btn btn-primary"
                      style={{ textTransform: "capitalize" }}
                    >
                      Create a {location.pathname.replace("/", "")}
                    </Link>
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
                        <th style={{ width: "50px;" }}></th>
                        <th>
                          <strong>Name.</strong>
                        </th>
                        <th>
                          <strong>Email</strong>
                        </th>
                        <th>
                          <strong>Phone</strong>
                        </th>
                        <th>
                          <strong>NTN</strong>
                        </th>
                        <th>
                          <strong>Notes</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="dealers">
                      {dealers.map((element, index) => {
                        return (
                          <tr key={element._id}>
                            <td></td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="images/avatar/1.jpg"
                                  className="rounded-lg mr-1"
                                  width="24"
                                  alt=""
                                />
                                <span className="w-space-no">
                                  {element.name}
                                </span>
                              </div>
                            </td>
                            <td>
                              <strong>{element.email}</strong>
                            </td>
                            <td>{element.phone}</td>
                            <td>{element.ntn}</td>
                            <td>{element.notes}</td>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to={`/${location.pathname.replace(
                                    "/",
                                    ""
                                  )}/form/${element._id}`}
                                  className="btn btn-primary shadow btn-xs sharp mr-1"
                                >
                                  <i className="fa fa-pencil"></i>
                                </Link>
                                <Link
                                  to=""
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

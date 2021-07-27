import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

export default function View() {
  const [quotations, setquote] = new useState([]);
  useEffect(() => {
    // Quotaion
    axios
      .get(
        "https://css-project.herokuapp.com/quotations/company/" +
          localStorage.getItem("company_id")
      )
      .then((res) => setquote(res.data))
      .catch((err) => console.log("Error: " + err));
  }, [setquote]);

  const filter = (e) => {
    let value = e.target.value;
    $("#quotations tr").filter(function () {
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
                <h4 className="card-title">Quotations</h4>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={filter}
                    placeholder="Search Quotation"
                  />
                  <div className="input-group-prepend">
                    <Link
                      type="button"
                      to="/quotation/form"
                      className="btn btn-primary"
                    >
                      Create a Quotation
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-responsive-md">
                    <thead>
                      <tr>
                        <th></th>
                        <th>
                          <strong>Invoice No</strong>
                        </th>
                        <th>
                          <strong>Customer Name</strong>
                        </th>
                        <th>
                          <strong>Invoice Date</strong>
                        </th>
                        <th>
                          <strong>Status</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="quotations">
                      {quotations.map((element, index) => {
                        return (
                          <tr key={element._id}>
                            <td></td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="w-space-no">
                                  <strong>{element.invoiceNo}</strong>
                                </span>
                              </div>
                            </td>
                            <td>{element.customer.name}</td>
                            <td>{element.invoiceDate}</td>
                            <td>
                              <span
                                className={`badge light badge-${
                                  element.status === `In Progress`
                                    ? `warning`
                                    : `danger`
                                }`}
                              >
                                {element.status}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to={`/quotation/view/${element._id}`}
                                  className="btn btn-success shadow btn-xs sharp mr-1"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                {element.status === "In Progress" ? (
                                  <>
                                    <Link
                                      to={`/quotation/form/${element._id}`}
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
                                  </>
                                ) : (
                                  <Link
                                    to={`/proceed/sale/${element._id}`}
                                    className="btn btn-warning shadow btn-xs sharp"
                                  >
                                    <i className="fa fa-arrow-circle-right"></i>
                                  </Link>
                                )}
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

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import Select from "react-select";
import { Toaster } from "react-hot-toast";

// COMPONENTS
import AccountClass from "./accountClass";
import AccountGroup from "./accountGroup";

export default function View() {
  const [accounts, setAccounts] = new useState([]);
  useEffect(() => {
    // PRODUCT
    axios
      .get(
        "https://css-project.herokuapp.com/accounts/company/" +
          localStorage.getItem("company_id")
      )
      .then((res) => setAccounts(res.data))
      .catch((err) => console.log("Error: " + err));
  }, [setAccounts]);

  const filter = (e) => {
    let value = e.target.value;
    $("#accounts tr").filter(function () {
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      return null;
    });
  };
  const onChange = (e) => {
    return null;
  };
  return (
    <div className="content-body">
      <div className="container-fluid">
        <Toaster />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Accounts</h4>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={filter}
                    placeholder="Search Accounts"
                  />
                  <div className="input-group-prepend">
                    <Link
                      type="button"
                      to="/accounts"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#form"
                    >
                      Create a Accounts
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
                        data-target="#accountClass"
                        to="/accounts"
                      >
                        Account's Classes
                      </Link>
                      <Link
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target="#accountGroup"
                        to="/accounts"
                      >
                        Account's Groups
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-responsive-md">
                    <thead>
                      <tr>
                        <th>
                          <strong>Name</strong>
                        </th>
                        <th>
                          <strong>Title</strong>
                        </th>
                        <th>
                          <strong>Sub Title</strong>
                        </th>
                        <th>
                          <strong>Sub Sub Title</strong>
                        </th>
                        <th>
                          <strong>Description</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="accounts">
                      {accounts.map((element, index) => {
                        return (
                          <tr key={element._id}>
                            <td>
                              <strong>{element.name}</strong>
                            </td>
                            <td>{element.title}</td>
                            <td>{element.subTitle}</td>
                            <td>{element.subSubTitle}</td>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to={`/accounts`}
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
        {/* MODALS */}
        <div id="form" className="modal fade" role="dialog">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Create Accounts</h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Account Name</label>
                      <input
                        type="text"
                        name="name"
                        onChange={onChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Account Type</label>
                      <Select
                        onChange={onChange}
                        options={[
                          {
                            label: "Revenue",
                            value: "Revenue",
                            target: { name: "type", value: "Revenue" },
                          },
                          {
                            label: "Expenses",
                            value: "Expenses",
                            target: { name: "type", value: "Expenses" },
                          },
                          {
                            label: "Assets",
                            value: "Assets",
                            target: { name: "type", value: "Assets" },
                          },
                          {
                            label: "Liabilities",
                            value: "Liabilities",
                            target: { name: "type", value: "Liabilities" },
                          },
                          {
                            label: "Equity",
                            value: "Equity",
                            target: { name: "type", value: "Equity" },
                          },
                        ]}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Account Class</label>
                      <Select
                        onChange={onChange}
                        options={[{ label: "Assets", value: "Assets" }]}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label>Account Group</label>
                      <Select
                        onChange={onChange}
                        options={[{ label: "Assets", value: "Assets" }]}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        onChange={onChange}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <AccountClass />
        <AccountGroup />
        {/* END MODALS  */}
      </div>
    </div>
  );
}

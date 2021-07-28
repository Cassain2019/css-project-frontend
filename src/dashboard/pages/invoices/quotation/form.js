/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import toast, { Toaster } from 'react-hot-toast';
import $ from "jquery";

import ReactTooltip from "react-tooltip";

function Quotation() {
  // STATES
  let { id } = new useParams();
  let history = useHistory();
  var date = new Date();
  const toastFields = { duration: 4000, position: 'top-center' };
  const [products, setProduct] = new useState([]);
  const [customers, setCustomer] = new useState([]);
  const [company, setCompany] = new useState({
    currSymbol: "",
    invoiceTaxes: []
  });
  const [value, setValue] = new useState({
    id: "none",
    product: "",
    displayName: " ",
    rate: "",
    qty: "",
  });
  const [prop, setprop] = new useState({
    customer: "",
  });
  const [data, setData] = new useState({
    company: localStorage.getItem("company_id"),
    creator: localStorage.getItem("user_id"),
    invoiceNo: "",
    invoiceDate:
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0"),
    customer: "",
    transaction: "",
    quote: "",
    products: [],
    remarks: "",
    status: "In Progress",
    approvedBy: "In Progress",
  });
  const [totals, setTotals] = new useState({
    total: 0.0,
    subTotal: 0.0,
    tax: 0.0,
  });

  // ON LOAD ACTIVITIES
  useEffect(() => {
    require("../css/main.css");
    async function Requests() {
      //COMPANY
      await axios
        .get("http://localhost:4000/companies/" + localStorage.getItem("company_id"))
        .then((res) => setCompany(res.data))
        .catch((err) => console.log("Error: " + err));

      // PRODUCT
      await axios
        .get("http://localhost:4000/products/company/" + localStorage.getItem("company_id"))
        .then((res) => setProduct(res.data))
        .catch((err) => console.log("Error: " + err));

      //CUSTOMERS
      await axios
        .get(
          `http://localhost:4000/dealers/customer/company/` +
          localStorage.getItem("company_id")
        )
        .then((res) => setCustomer(res.data))
        .catch((err) => console.log("Error: " + err));

      if (id) {
        //Quotation DATA
        axios
          .get(`http://localhost:4000/quotations/specific/` + id)
          .then((res) => {
            if (res.data !== 'error') {
              setData(res.data);
              setprop({ customer: res.data.customer._id });
            } else {
              history.push("/404");
            }

          })
          .catch((err) => console.log("Error: " + err));
      }
    }
    Requests();
  }, []);

  useEffect(() => {
    if (!id) {
      // Invoice
      axios
        .get("http://localhost:4000/quotations/invoice")
        .then((res) => invoiceGen(res.data))
        .catch((err) => console.log("Error: " + err));
    }
  }, [data.invoiceNo]);

  useEffect(() => {
    let subtotal = 0;
    let total = 0;
    for (let i = 0; i < data.products.length; i++) {
      let product = products.filter((arr) => arr._id === data.products[i].name);
      let amount =
        parseFloat(data.products[i].rate) * parseInt(data.products[i].qty);
      let totl = amount * (parseInt(product[0].tax.percentage) / 100) + amount;
      subtotal += amount;
      total += totl;
    }
    setTotals({
      total:
        data.transaction === "Yes" ? total.toFixed(2) : subtotal.toFixed(2),
      subTotal: subtotal.toFixed(2),
      tax: data.transaction === "Yes" ? (total - subtotal).toFixed(2) : 0.0,
    });
  }, [data.products, data.transaction, value]);
  useEffect(() => {
    let tmpDealer = customers.filter((element) => element._id === prop.customer);
    if (tmpDealer.length > 0) {
      $("#contact").val(tmpDealer[0].phone);
      $("#address").val(tmpDealer[0].address);
    }
  }, [prop]);

  // FUNCTIONS
  const invoiceGen = async (quotation) => {
    let invoice = "";
    if (quotation.length !== 0) {
      let year =
        quotation[0].company.FormatDetails === true
          ? parseInt(date.getFullYear()) - 2000
          : "";
      let dates =
        quotation[0].company.FormatDetails === true
          ? String(date.getMonth() + 1).padStart(2, "0") + year + "-"
          : "";
      invoice = quotation[0].invoiceNo;
      let format = quotation[0].company.invoiceFormat;
      if (
        invoice.includes(format) === true &&
        invoice.includes(dates) === true
      ) {
        invoice = invoice.replace(format, "");
        invoice = invoice.replace(dates, "");
        invoice = parseInt(invoice) + 1;
        invoice = format + dates + invoice;
      } else {
        invoice = format + dates + "1";
      }
      setData({ ...data, invoiceNo: invoice });
    } else {
      //COMPANY
      await axios
        .get("http://localhost:4000/companies/" + localStorage.getItem("company_id"))
        .then((res) => {
          let year =
            res.data.FormatDetails === true
              ? parseInt(date.getFullYear()) - 2000
              : "";
          let dates =
            res.data.FormatDetails === true
              ? String(date.getMonth() + 1).padStart(2, "0") + year + "-"
              : "";
          setData({
            ...data,
            invoiceNo: res.data.invoiceFormat + dates + "1",
          });
        })
        .catch((err) => console.log("Error: " + err));
    }
  };

  // ON FIELD CHANGE FUNCTION
  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const customerChange = (e) => {
    onChange(e);
    setprop({
      customer: e.value,
    });
  };
  const changeValue = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // APPEND FUNCTION
  const appendRow = (e) => {
    e.preventDefault();
    if (!Object.values(value).every((element) => element !== "") === false) {
      if (value.id === "none") {
        setData({
          ...data,
          products: [
            ...data.products,
            {
              id: data.products.length,
              raw: " ",
              name: value.product,
              displayName: value.displayName,
              rate: value.rate,
              qty: value.qty,
            },
          ],
        });
      } else {
        let temp = data.products;
        temp[value.id] = {
          id: value.id,
          raw: data.products[value.id].raw,
          name: value.product,
          displayName: value.displayName,
          rate: parseFloat(value.rate),
          qty: parseInt(value.qty),
        };
        setData({
          ...data,
          products: temp,
        });
        $("#iconChange").removeClass("fa-pencil");
        $("#iconChange").addClass("fa-plus");
        $("#textChange").html("Insert Product");
      }
      setValue({
        id: "none",
        product: "",
        displayName: " ",
        rate: "",
        qty: "",
      });
    } else {
      toast.error("Missing Fields", toastFields);
    }
  };

  // SUBMIT
  const submit = (e) => {
    e.preventDefault();
    $(".animeBtn").attr("disabled", "disabled");
    $("#btnContent").html(
      '<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>'
    );
    let url = "http://localhost:4000/quotations/";
    if (id) {
      url = "http://localhost:4000/quotations/" + id;
    }
    if (!Object.values(data).every((element) => element !== "") === false) {
      let restriction = true;
      data.products.forEach((e) => {
        if (Object.values(e).every((element) => element !== "") === false) {
          restriction = false;
        }
      });
      if (restriction === true) {
        axios
          .post(url, data)
          .then((res) => {

            if (res.data === "Added" || res.data === "Updated") {
              toast.success(`${id ? "Updated" : "Created"} Quotation`, toastFields);
              if (!id) {
                setData({
                  comp_id: localStorage.getItem("company_id"),
                  creator: localStorage.getItem("user_id"),
                  invoiceNo: "",
                  dueDate: "",
                  invoiceDate: "",
                  customer: "",
                  transaction: "",
                  quote: "",
                  products: [],
                  remarks: "",
                  status: "UnPaid",
                  approvedBy: "UnPaid",
                });
                $("#contact").val("");
                $("#address").val("");
              }
            } else {
              toast.error("Invoice No Already Exists", toastFields);
            }
          })
          .catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) });
      } else {
        toast.dismiss();
        toast.error("Missing Fields", toastFields);
      }
    } else {
      toast.dismiss();
      toast.error("Missing Fields", toastFields);
    }
    $(".animeBtn").removeAttr("disabled");
    $("#btnContent").html(`${id ? "Update" : "Create"} Quotation`);
  };

  // OUTPUT
  return (
    <div className="content-body">
      <div className="container-fluid">
        <Toaster />
        <div className="row">
          <div className="col-xl-12">
            <form>
              <div className="form-row d-flex">
                <div className="form-group col-xl-2 col-md-2 col-sm-12 mr-auto p-2">
                  <label>Invoice No</label>
                  <input
                    type="text"
                    value={data.invoiceNo}
                    name="invoiceNo"
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group p-2 col-xl-2 col-md-2 col-6">
                  <label>Invoice Date</label>
                  <input
                    type="date"
                    onChange={onChange}
                    name="invoiceDate"
                    value={data.invoiceDate}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label>Customer</label>
                  <Select
                    onChange={customerChange}
                    options={customers.map((element, index) => {
                      return {
                        value: element._id,
                        label: element.name,
                        target: { name: "customer", value: element._id },
                      };
                    })}
                    value={customers.map((element, index) => {
                      if (element._id === prop.customer) {
                        return {
                          value: element._id,
                          label: element.name,
                        };
                      }
                    })}
                    required
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Contact</label>
                  <input
                    type="text"
                    id="contact"
                    value={
                      !id
                        ? customers.map((element, index) => {
                          if (element._id === prop.customer) {
                            return element.phone;
                          }
                        })[0]
                        : data.customer.phone
                    }
                    className="form-control"
                    readOnly
                  />
                </div>
                <div
                  className="col-md-6"
                  style={{ display: "inline-grid", justifyContent: "end" }}
                >
                  <h5>Invoice Total</h5>
                  <h1>
                    {company.currSymbol} <span>{totals.total}</span>
                  </h1>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-3">
                  <label>Billing Address</label>
                  <textarea
                    rows="5"
                    id="address"
                    value={
                      !id
                        ? customers.map((element, index) => {
                          if (element._id === prop.customer) {
                            return element.address;
                          }
                        })[0]
                        : data.customer.address
                    }
                    className="form-control"
                    readOnly
                  ></textarea>
                </div>
                <div className="form-group col-md-3">
                  <label>GST Transaction</label>
                  <Select
                    onChange={onChange}
                    required
                    options={[
                      {
                        value: "Yes",
                        label: "Yes",
                        target: { name: "transaction", value: "Yes" },
                      },
                      {
                        value: "No",
                        label: "No",
                        target: { name: "transaction", value: "No" },
                      },
                    ]}
                    value={{ value: data.transaction, label: data.transaction }}
                  />
                  <label className="mt-2">Quote Reference</label>
                  <input
                    type="text"
                    onChange={onChange}
                    value={data.quote}
                    name="quote"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm mb-3">
                      <thead>
                        <tr>
                          <th>Raw Data</th>
                          <th>Product</th>
                          <th>Display</th>
                          <th>Rate</th>
                          <th>Qty</th>
                          <th>Tax</th>
                          <th>History</th>
                          <th>Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.products.map((e, index) => {
                          let product = products.filter(
                            (arr) => arr._id === e.name
                          );
                          let amount = parseFloat(e.rate) * parseFloat(e.qty);
                          let total =
                            amount *
                            (parseInt(product[0].tax.percentage) / 100) +
                            amount;
                          return (
                            <>
                              <ReactTooltip
                                id="amountTip"
                                place="top"
                                effect="solid"
                              >
                                Amount
                              </ReactTooltip>
                              <ReactTooltip
                                id="taxTip"
                                place="top"
                                effect="solid"
                              >
                                Tax Amount
                              </ReactTooltip>

                              <ReactTooltip
                                id="totalTip"
                                place="top"
                                effect="solid"
                              >
                                Total
                              </ReactTooltip>
                              <ReactTooltip
                                id="saleTip"
                                place="top"
                                effect="solid"
                              >
                                Latest Sale Rate
                              </ReactTooltip>
                              <ReactTooltip
                                id="purchaseTip"
                                place="top"
                                effect="solid"
                              >
                                Latest Purchase Rate
                              </ReactTooltip>
                              <ReactTooltip
                                id="soldCusTip"
                                place="top"
                                effect="solid"
                              >
                                Last Sale Rate For this Customer
                              </ReactTooltip>

                              <tr key={e.id}>
                                <td>{e.raw}</td>
                                <td>{product[0].name}</td>
                                <td>{e.displayName}</td>
                                <td>{parseFloat(e.rate).toFixed(2)}</td>
                                <td>{e.qty}</td>
                                <td>{product[0].tax.percentage}%</td>
                                <td>
                                  <span data-tip data-for="purchaseTip">
                                    0.00
                                  </span>{" "}
                                  |{" "}
                                  <span data-tip data-for="saleTip">
                                    0.00
                                  </span>{" "}
                                  |{" "}
                                  <span data-tip data-for="soldCusTip">
                                    0.00
                                  </span>{" "}
                                </td>
                                <td>
                                  <span data-tip data-for="amountTip">
                                    {amount.toFixed(2)}
                                  </span>{" "}
                                  |{" "}
                                  <span data-tip data-for="taxTip">
                                    {data.transaction === "Yes"
                                      ? (total - amount).toFixed(2)
                                      : "0.00"}
                                  </span>{" "}
                                  |{" "}
                                  <span data-tip data-for="totalTip">
                                    {data.transaction === "Yes"
                                      ? total.toFixed(2)
                                      : "0.00"}
                                  </span>
                                </td>
                                <td>
                                  <i
                                    className="fa fa-pencil text-primary mr-3"
                                    aria-hidden="true"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      // ICON & TEXT CHANGE
                                      $("#iconChange").removeClass("fa-plus");
                                      $("#iconChange").addClass("fa-pencil");
                                      $("#textChange").html("Update Product");
                                      // OPENING THE WINDOW
                                      if (!$(".CPbtns").hasClass("d-none")) {
                                        $(".CPbtns").addClass("d-none");
                                        $(".CPForm").addClass("d-flex");
                                        $(".CPForm").removeClass("d-none");
                                      }
                                      //SETTING VALUE
                                      setValue({
                                        id: e.id,
                                        product: e.name,
                                        displayName: e.displayName,
                                        rate: e.rate,
                                        qty: e.qty,
                                      });
                                    }}
                                  ></i>
                                  <i
                                    className="fa fa-trash text-danger"
                                    aria-hidden="true"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      let rows = data.products.filter(
                                        (item) => item.id !== e.id
                                      );
                                      setData({
                                        ...data,
                                        products: rows,
                                      });
                                    }}
                                  ></i>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <hr />
                  <div className="CPbtns">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        $(".CPbtns").addClass("d-none");
                        $(".CPForm").addClass("d-flex");
                        $(".CPForm").removeClass("d-none");
                      }}
                      className="btn btn-outline-light"
                    >
                      Add Products
                      <span className="btn-icon-right">
                        <i className="fa fa-plus"></i>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary ml-2"
                      data-toggle="modal"
                      data-target="#ExportModal"
                    >
                      Search For Products
                      <span className="btn-icon-right">
                        <i className="fa fa-search"></i>
                      </span>
                    </button>
                  </div>
                  <div className="form-row d-none CPForm">
                    <div className="form-group col-md-4">
                      <label>Product</label>
                      <Select
                        style={{ borderRadius: "100px" }}
                        onChange={(e) => {
                          let product = products.filter(
                            (arr) => arr._id === e.target.value
                          );
                          setValue({
                            ...value,
                            product: e.target.value,
                            displayName: product[0].name,
                            rate: product[0].cost,
                            qty: "1",
                          });
                        }}
                        options={products.map((cat, index) => {
                          return {
                            value: cat._id,
                            label: cat.name,
                            target: { name: "product", value: cat._id },
                          };
                        })}
                        value={products.map((cat, index) => {
                          if (cat._id === value.product) {
                            return {
                              value: cat._id,
                              label: cat.name,
                            };
                          }
                        })}
                        placeholder={<div>Choose Product</div>}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Display Name</label>
                      <input
                        type="text"
                        style={{ height: "43px" }}
                        onChange={changeValue}
                        value={value.displayName}
                        className="form-control input-rounded"
                        name="displayName"
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Rate</label>
                      <input
                        type="number"
                        onChange={changeValue}
                        style={{ height: "43px" }}
                        value={value.rate}
                        className="form-control input-rounded"
                        name="rate"
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Quantity</label>
                      <input
                        type="number"
                        onChange={changeValue}
                        style={{ height: "43px" }}
                        value={value.qty}
                        className="form-control input-rounded"
                        name="qty"
                      />
                    </div>
                    <div className="form-group col-md-12 d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn btn-outline-success"
                        onClick={appendRow}
                      >
                        <span id="textChange">Insert Product</span>
                        <span className="btn-icon-right">
                          <i className="fa fa-plus" id="iconChange"></i>
                        </span>
                      </button>
                      <button
                        type="button"
                        className="btn btn btn-outline-danger ml-2"
                        onClick={() => {
                          $(".CPbtns").removeClass("d-none");
                          $(".CPForm").removeClass("d-flex");
                          $(".CPForm").addClass("d-none");
                        }}
                      >
                        Close
                        <span className="btn-icon-right">
                          <i className="fa fa-close"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-lg-6">
                  <label>Remarks</label>
                  <textarea
                    type="number"
                    onChange={onChange}
                    value={data.remarks}
                    rows="6"
                    name="remarks"
                    className="form-control"
                    required
                  ></textarea>
                </div>
                <div
                  className="col-12 col-lg-6"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <div className="col-12 col-lg-9">
                    <dl className="receipt__list">
                      <div className="receipt__list-row mt-4">
                        <dt className="receipt__item">Sub Total</dt>
                        <dd className="receipt__cost">{company.currSymbol} {totals.subTotal}</dd>
                      </div>
                      <div className="receipt__list-row mt-3">
                        <dt className="receipt__item">Total Tax</dt>
                        <dd className="receipt__cost">{company.currSymbol} {totals.tax}</dd>
                      </div>
                      <div className="receipt__list-row receipt__list-row--total mt-3 ">
                        <dt className="receipt__item">Total</dt>
                        <dd className="receipt__cost">{company.currSymbol} {totals.total}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="form-group text-center mt-3">
                <button className="animebtn" type="submit" onClick={submit}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <p style={{ margin: 5 }} id="btnContent">
                    {id ? "Update" : "Create"} Quotation
                  </p>
                </button>
              </div>
            </form>
            {/* MODAL  */}
            <div className="modal fade" id="ExportModal">
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Import Products</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label>Product Names</label>
                        <textarea
                          type="text"
                          name="import"
                          id="import"
                          rows={5}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-row">
                      <label>Profit Increment</label>
                      <div className="input-group mb-2">
                        <input
                          className="form-control"
                          type="number"
                          defaultValue="0"
                          name="profit"
                          min="0"
                          max="100"
                          id="profit"
                        />
                        <div className="input-group-prepend">
                          <div className="input-group-text">%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        let value = $("#import").val();
                        let profit = $("#profit").val();
                        if (value !== "") {
                          let arr = value
                            .split("\n")
                            .map(
                              Function.prototype.call,
                              String.prototype.trim
                            );
                          let temp = [];
                          for (let i = 0; i < arr.length; i++) {
                            let item = products.filter(
                              (item) =>
                                item.name
                                  .toLowerCase()
                                  .indexOf(arr[i].toLowerCase()) > -1
                            );
                            for (let j = 0; j < item.length; j++) {
                              let rate =
                                parseFloat(item[j].cost) *
                                (parseInt(profit) / 100) +
                                parseFloat(item[j].cost);
                              temp.push({
                                id: temp.length,
                                raw: arr[i],
                                name: item[j]._id,
                                displayName: item[j].name,
                                rate: rate,
                                qty: "1",
                              });
                            }
                          }
                          setData({
                            ...data,
                            products: temp,
                          });
                        } else {
                          toast.error("Missing Fields", toastFields);
                        }
                      }}
                    >
                      Create Rows
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* MODAL END  */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Quotation;

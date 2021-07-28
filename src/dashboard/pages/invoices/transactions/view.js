/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import Select from "react-select";
import toast, { Toaster } from 'react-hot-toast';

export default function View() {
  let history = useHistory();
  let date = new Date();
  let { type } = new useParams();
  const toastFields = { duration: 4000, position: 'top-center' };
  const [transactions, setTransactions] = new useState([]);
  const [tax, setTax] = new useState([]);
  const [company, setCompany] = new useState({
    currSymbol: "",
    invoiceTaxes: []
  });
  const [total, setTotal] = new useState({
    amount: 0.0,
    discount: 0.0,
    recevied: 0.0,
    invoicesTotal: 0.0,
  });
  const [multiple, setMultiple] = new useState({
    invoices: [],
    amount: [],
    discount: [],
    paymentType: "",
    taxes: [],
    receviedTax: [],
    details: "",
    date:
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0"),
  });

  //OnLoad Activities
  useEffect(() => {
    if (type !== "sale" && type !== "purchase") {
      history.push("/404");
    }
    require("../css/main.css");
    async function request() {
      //COMPANY
      await axios
        .get("http://localhost:4000/companies/" + localStorage.getItem("company_id"))
        .then((res) => setCompany(res.data))
        .catch((err) => console.log("Error: " + err));
      // Transactions
      await axios
        .get("http://localhost:4000/transactions/company/" + localStorage.getItem("company_id") + "/" + type)
        .then((res) => setTransactions(res.data))
        .catch((err) => console.log("Error: " + err));
      // Tax
      await axios
        .get("http://localhost:4000/taxes/company/" + localStorage.getItem("company_id"))
        .then((res) => setTax(res.data))
        .catch((err) => console.log("Error: " + err));
    }
    request();
  }, []);

  // TOTAL
  useEffect(() => {
    // INVOICE TOTAL & STUFF
    let invoicesTotal = 0;
    let recevied = 0;
    for (let i = 0; i < multiple.invoices.length; i++) {
      let invoice = transactions.filter(
        (arr) => arr._id === multiple.invoices[i]
      );
      let receviedSum = invoice[0].recevied.reduce((a, b) => {
        return parseFloat(a) + parseFloat(b);
      }, 0);
      let value = parseFloat(invoice[0].invtotal) - parseFloat(invoice[0].taxTotal);
      invoicesTotal += value;
      recevied += parseFloat(receviedSum);
    }
    let amount = multiple.amount.reduce((a, b) => {
      return parseFloat(a) + parseFloat(b);
    }, 0);
    let discount = multiple.discount.reduce((a, b) => {
      return parseFloat(a) + parseFloat(b);
    }, 0);

    setTotal({
      ...total,
      amount: amount,
      discount: discount,
      recevied: recevied,
      invoicesTotal: invoicesTotal,
    });
  }, [multiple]);

  let multipleChange = (e) => {
    setMultiple({
      ...multiple,
      [e.target.name]: e.target.value,
    });
  };
  const filter = (e) => {
    let value = e.target.value;
    $("#transactions tr").filter(function () {
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    });
  };
  const selection = (e) => {
    if (e.target.checked) {
      //STATE CHANGING
      let tempInvoices = multiple.invoices;
      tempInvoices.push(e.target.id);
      let tempAmount = multiple.amount;
      tempAmount.push(0);
      let tempDiscount = multiple.discount;
      tempDiscount.push(0);
      let invoiceDetails = transactions.filter((arr) => arr._id === e.target.id);

      let tempTax = multiple.receviedTax;
      let tempTotalTax = multiple.taxes
      let value = [];
      for (let i = 0; i < invoiceDetails[0].otherTax.length; i++) {
        let taxDetails = tax.filter((arr) => arr._id === invoiceDetails[0].otherTax[i].value);
        let invTotal = parseFloat(invoiceDetails[0].invtotal) - parseFloat(invoiceDetails[0].taxTotal);
        value.push((invTotal * (parseFloat(taxDetails[0].percentage) / 100)).toFixed(2));
        tempTotalTax.push(invoiceDetails[0].otherTax[i]);
      }
      tempTax.push(value);
      setMultiple({
        ...multiple,
        receviedTax: tempTax,
        invoices: tempInvoices,
        taxes: tempTotalTax,
        amount: tempAmount,
        discount: tempDiscount,
      });

      $(".onCheck").each(function (element) {
        if ($(this).attr("dealerId") !== e.target.getAttribute("dealerId")) {
          $(this).attr("disabled", "disabled");
          $(".multiplePayment").removeAttr("disabled");
        }
      });
    } else {
      let condition = false;

      //STATE CHANGING
      let tempTax = multiple.receviedTax;
      let tempInvoices = multiple.invoices;
      let tempAmount = multiple.amount;
      let tempDiscount = multiple.discount;
      let tempTotalTax = multiple.taxes;
      let i = multiple.invoices.indexOf(e.target.id);
      tempDiscount = tempDiscount.splice(i, 1);
      tempTax = tempTax.splice(i, 1);
      tempAmount = tempAmount.splice(i, 1);
      tempTotalTax = tempTotalTax.splice(i, 1);
      tempInvoices = tempInvoices.filter((arr) => arr !== e.target.id);
      setMultiple({
        ...multiple,
        receviedTax: tempTax,
        taxes: tempTotalTax,
        invoices: tempInvoices,
        amount: tempAmount,
        discount: tempDiscount,
      });

      $(".onCheck").each(function (e) {
        if ($(this).prop("checked")) {
          condition = true;
        }
      });
      if (condition === false) {
        $(".onCheck").removeAttr("disabled");
        $(".multiplePayment").attr("disabled", "disabled");
      }
    }
  };
  const refresh = (e) => {
    // Transactions
    axios
      .get(
        "http://localhost:4000/transactions/company/" +
        localStorage.getItem("company_id") +
        "/" +
        type
      )
      .then((res) => setTransactions(res.data))
      .catch((err) => console.log("Error: " + err));
  };
  const multiplePayment = async (e) => {
    e.preventDefault();

    toast.loading("Loading...");
    $(".multiBtn").attr("disabled", "disabled");
    let check = true;
    $(".remaningAmount").each((element, value) => {
      if (parseFloat($(value).html()) < 0) {
        check = false;
      }
    });
    if (
      multiple.invoices.length > 0 &&
      multiple.discount.length >= 0 &&
      multiple.taxes.length >= 0 &&
      multiple.amount.length > 0 &&
      multiple.receviedTax.length >= 0 &&
      multiple.paymentType !== "" &&
      multiple.details !== "" &&
      multiple.date !== "" &&
      check === true
    ) {
      for (let i = 0; i < multiple.invoices.length; i++) {
        let invoice = transactions.filter(
          (arr) => arr._id === multiple.invoices[i]
        );
        let recivedAmount = invoice[0].recevied.reduce((a, b) => {
          return parseFloat(a) + parseFloat(b);
        }, 0);
        let remaining = parseFloat(invoice[0].invtotal) - parseFloat(recivedAmount);
        if (multiple.receviedTax.length > 0) {
          let totalTax = multiple.receviedTax[i].reduce((a, b) => {
            return parseFloat(a) + parseFloat(b);
          }, 0);
          remaining -= totalTax;
        }
        remaining = (remaining - (parseFloat(multiple.amount[i]) + parseFloat(multiple.discount[i]))).toFixed(2);
        if (remaining >= 0) {
          // TRANSFORMING DATA
          let paidBy = invoice[0].paidBy;
          paidBy.push(localStorage.getItem("user_id"));

          let recevied = invoice[0].recevied;
          recevied.push(multiple.amount[i]);

          let discount = invoice[0].discount;
          discount.push(multiple.discount[i]);

          let taxes = multiple.taxes;
          let taxAmounts = multiple.receviedTax[i];

          let paymentType = invoice[0].paymentType;
          paymentType.push(multiple.paymentType);

          let paymentDetails = invoice[0].paymentDetails;
          paymentDetails.push(multiple.details);

          let paymentDate = invoice[0].paymentDate;
          paymentDate.push(multiple.date);

          let status = remaining > 0 ? "Partially Paid" : "Paid";
          // TRANSFORMED DATA
          let data = {
            status: status,
            paidBy: paidBy,
            recevied: recevied,
            discount: discount,
            taxes: taxes,
            taxAmounts: taxAmounts,
            paymentType: paymentType,
            paymentDetails: paymentDetails,
            paymentDate: paymentDate,
          };
          await axios
            .post("http://localhost:4000/transactions/" + invoice[0]._id, data)
            .catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) });
          if (i + 1 === multiple.invoices.length) {
            toast.dismiss();
            toast.success(`Payment Complete`, toastFields);
            $(".close").click();
            setMultiple({
              invoices: [],
              amount: [],
              discount: [],
              paymentType: "",
              taxes: [],
              receviedTax: [],
              details: "",
              date:
                date.getFullYear() +
                "-" +
                String(date.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(date.getDate()).padStart(2, "0"),
            });
            refresh();
          }
        } else {
          toast.dismiss();
          toast.success(`Remaning amount mustn't be negative`, toastFields);
          $(".multiBtn").removeAttr("disabled");
          break;
        }
      }
    } else {
      toast.dismiss();
      toast.error("Missing Fields", toastFields);
    }
    $(".multiBtn").removeAttr("disabled");
  };
  return (
    <div className="content-body">
      <div className="container-fluid">
        <Toaster />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{type.toUpperCase()}</h4>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={filter}
                    placeholder={`Search ${type}`}
                  />
                  <div className="input-group-prepend">
                    <Link
                      type="button"
                      to={`/${type}/form`}
                      className="btn btn-primary"
                    >
                      CREATE {type.toUpperCase()}
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-responsive-md"
                    id="transactionTable"
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th>
                          <strong>Invoice No</strong>
                        </th>
                        <th>
                          <strong>
                            {type === "sale" ? "Customer" : "Supplier"} Name
                          </strong>
                        </th>
                        <th>
                          <strong>Invoice Date</strong>
                        </th>
                        <th>
                          <strong>Due Date</strong>
                        </th>
                        <th>
                          <strong>Status</strong>
                        </th>
                        <th>
                          {multiple.invoices.length > 0 ? (
                            <Link
                              className="multiplePayment"
                              data-toggle="modal"
                              data-target="#paymentModal"
                              aria-hidden="true"
                              onClick={(e) => {
                                if (multiple.invoices.length > 0) {
                                  let data = transactions.filter(
                                    (arr) => arr._id === multiple.invoices[0]
                                  );
                                  $("#customerName").val(data[0].dealer.name);
                                }
                              }}
                            >
                              <i className="fa fa-money"></i>
                            </Link>
                          ) : (
                            <Link
                              onClick={(e) => {
                                toast.error("Select invoices to continue", toastFields);
                              }}>
                              <i className="fa fa-money"></i>
                            </Link>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody id="transactions">
                      {transactions.map((element, index) => {
                        return (
                          <tr key={element._id}>
                            <td>
                              {element.status !== "In Progress" ? (<div className="custom-control custom-checkbox checkbox-success check-lg">
                                <input
                                  type="checkbox"
                                  onClick={selection}
                                  className="custom-control-input onCheck"
                                  id={element._id}
                                  dealerId={element.dealer._id}
                                />
                                <label
                                  className="custom-control-label"
                                  for={element._id}
                                ></label>
                              </div>) : ""}

                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="w-space-no">
                                  <strong>{element.invoiceNo}</strong>
                                </span>
                              </div>
                            </td>
                            <td className="dealer">{element.dealer.name}</td>
                            <td>{element.invoiceDate}</td>
                            <td>{element.dueDate}</td>
                            <td>
                              <span
                                className={`badge light badge-${element.status === `In Progress` ? `warning` : `danger`}`}
                              >
                                {element.status}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to={`/transaction/view/${element._id}`}
                                  className="btn btn-success shadow btn-xs sharp mr-1"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                {element.status === "In Progress" ? (<>
                                  <Link
                                    to={`/${type}/form/${element._id}`}
                                    className="btn btn-primary shadow btn-xs sharp mr-1"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  <Link
                                    to="#"
                                    className="btn btn-danger shadow btn-xs sharp mr-1"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Link>
                                </>) : ""}
                                {type === "sale" ? (
                                  <Link
                                    to={`/redirect/purchase/${element._id}`}
                                    className="btn btn-dark shadow btn-xs sharp mr-1"
                                  >
                                    <i
                                      className="fa fa-step-forward"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                ) : (
                                  ""
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* Multiple Payment MODAL */}
                <div className="modal fade" id="paymentModal">
                  <div
                    className="modal-dialog modal-dialog-centered modal-xl"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3 className="modal-title text-primary">
                          PAYMENT
                        </h3>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label>Payment Type</label>
                            <Select
                              onChange={multipleChange}
                              options={[
                                {
                                  value: "Cash",
                                  label: "Cash",
                                  target: {
                                    name: "paymentType",
                                    value: "Cash",
                                  },
                                },
                                {
                                  value: "Cheque",
                                  label: "Cheque",
                                  target: {
                                    name: "paymentType",
                                    value: "Cheque",
                                  },
                                },
                                {
                                  value: "Others",
                                  label: "Others",
                                  target: {
                                    name: "paymentType",
                                    value: "Others",
                                  },
                                },
                              ]}
                              value={{
                                value: multiple.paymentType,
                                label: multiple.paymentType,
                              }}
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label>Date</label>
                            <input
                              type="date"
                              name="date"
                              onChange={multipleChange}
                              value={multiple.date}
                              className="form-control"
                            />
                          </div>
                          <div className="col-md-12">
                            <div className="table-responsive">
                              <table className="table header-border table-responsive-sm mb-1">
                                <thead>
                                  <tr className="text-primary">
                                    <th>Invoice No</th>
                                    <th>Invoice Total</th>
                                    <th>Recevied</th>
                                    <th>Special Taxes</th>
                                    <th>Amount</th>
                                    <th>Discount</th>
                                    <th>Remaning</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {multiple.invoices.map((e, index) => {
                                    let data = transactions.filter((arr) => arr._id === e);
                                    let recivedAmount =
                                      data[0].recevied.length > 0
                                        ? data[0].recevied.reduce((a, b) => {
                                          return (
                                            parseFloat(a) + parseFloat(b)
                                          );
                                        }, 0)
                                        : 0.0;
                                    let remaining =
                                      parseFloat(data[0].invtotal) -
                                      parseFloat(recivedAmount);
                                    if (multiple.receviedTax.length > 0) {
                                      let totalTax = multiple.receviedTax[
                                        index
                                      ].reduce((a, b) => {
                                        return parseFloat(a) + parseFloat(b);
                                      }, 0);
                                      remaining -= totalTax;
                                    }
                                    remaining = (
                                      remaining -
                                      (parseFloat(multiple.amount[index]) +
                                        parseFloat(multiple.discount[index]))
                                    ).toFixed(2);
                                    return (
                                      <tr key={data[0].invoiceNo}>
                                        <td>{data[0].invoiceNo}</td>
                                        <td>{data[0].invtotal} {company.currSymbol}</td>
                                        <td>{recivedAmount} {company.currSymbol}</td>
                                        <td>
                                          {multiple.receviedTax.length > 0
                                            ? multiple.receviedTax[index].map(
                                              (element, i) => {
                                                return (
                                                  <>
                                                    {" "}
                                                    <input
                                                      key={index}
                                                      type="number"
                                                      onChange={(event) => {
                                                        let change =
                                                          multiple.receviedTax;
                                                        change[index][i] =
                                                          event.target.value;
                                                        setMultiple({
                                                          ...multiple,
                                                          receviedTax: change,
                                                        });
                                                      }}
                                                      value={element}
                                                      style={{
                                                        border: "0",
                                                        width: "50px",
                                                        height: "auto",
                                                        padding: "0",
                                                        margin: "0",
                                                      }}
                                                    />{" "}
                                                    |
                                                  </>
                                                );
                                              }
                                            )
                                            : ""}
                                        </td>
                                        <td>
                                          <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: "100px" }}
                                            onChange={(event) => {
                                              event.preventDefault();
                                              let tempAmount = multiple.amount;
                                              let i =
                                                multiple.invoices.indexOf(e);
                                              tempAmount[i] =
                                                event.target.value;
                                              setMultiple({
                                                ...multiple,
                                                amount: tempAmount,
                                              });
                                            }}
                                            defaultValue="0"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: "100px" }}
                                            onChange={(event) => {
                                              event.preventDefault();
                                              let tempDiscount =
                                                multiple.discount;
                                              let i =
                                                multiple.invoices.indexOf(e);
                                              tempDiscount[i] =
                                                event.target.value;
                                              setMultiple({
                                                ...multiple,
                                                discount: tempDiscount,
                                              });
                                            }}
                                            defaultValue="0"
                                          />
                                        </td>
                                        <td>
                                          {" "}
                                          <span className="remaningAmount">
                                            {remaining}
                                          </span>{" "}
                                          {company.currSymbol}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="form-group col-md-6 mt-4">
                            <label>Payment Details</label>
                            <textarea
                              type="text"
                              rows="6"
                              name="details"
                              onChange={multipleChange}
                              className="form-control"
                            ></textarea>
                          </div>
                          <div className="col-md-6 mt-4">
                            <dl className="receipt__list">
                              <div className="receipt__list-row mt-4">
                                <dt className="receipt__item">Sub Total</dt>
                                <dd className="receipt__cost">
                                  {company.currSymbol} {(total.invoicesTotal - total.recevied).toFixed(2)}
                                </dd>
                              </div>
                              <div className="receipt__list-row mt-3">
                                <dt className="receipt__item">Amount</dt>
                                <dd className="receipt__cost">
                                  {company.currSymbol} {total.amount.toFixed(2)}
                                </dd>
                              </div>
                              <div className="receipt__list-row mt-3">
                                <dt className="receipt__item">Discount</dt>
                                <dd className="receipt__cost">
                                  {company.currSymbol} {total.discount.toFixed(2)}
                                </dd>
                              </div>
                              <div className="receipt__list-row receipt__list-row--total mt-3 ">
                                <dt className="receipt__item">
                                  Remaning Amount
                                </dt>
                                <dd className="receipt__cost">
                                  {company.currSymbol} {((total.invoicesTotal - total.recevied) - (total.amount + total.discount)).toFixed(2)}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          data-dismiss="modal"
                        >
                          Close
                          <span className="btn-icon-right"><i className="fa fa-close"></i></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={multiplePayment} >
                          Proceed Payment
                          <span className="btn-icon-right"><i className="fa fa-money"></i></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Multiple Payment MODAL END  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

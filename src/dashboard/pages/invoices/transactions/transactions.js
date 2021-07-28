/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import $ from "jquery";
import { Link } from "react-router-dom";

import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function InvoiceView() {
  const [transaction, setTransaction] = new useState({
    company: { currSymbol: "" },
    creator: localStorage.getItem("user_id"),
    invoiceNo: "",
    invoiceDate: "",
    dueDate: "",
    dealer: "",
    transaction: "",
    refNo: "",
    products: [],
    remarks: "",
    status: "In Progress",
    type: "",
    approvedBy: "In Progress",
    paidBy: [],
    recevied: [],
    paymentType: [],
    paymentDetails: [],
    paymentDate: [],
  });
  const [products, setProduct] = new useState([]);
  const [check, setCheck] = new useState(true);
  const [totals, setTotals] = new useState({
    total: 0.0,
    subTotal: 0.0,
    tax: 0.0,
  });
  let { id } = new useParams();
  let history = useHistory();
  const FormData = require("form-data");
  const toastFields = { duration: 4000, position: 'top-center' };

  useEffect(() => {
    require("../css/main.css");
    async function Requests() {
      // PRODUCT
      await axios
        .get("http://localhost:4000/products/company/" + localStorage.getItem("company_id"))
        .then((res) => setProduct(res.data))
        .catch((err) => console.log("Error: " + err));

      //Transaction DATA
      await axios
        .get(`http://localhost:4000/transactions/specific/` + id)
        .then((res) => {
          if (res.data !== "error") {
            setTransaction(res.data);
          } else {
            history.push("/404");
          }
        })
        .catch((err) => console.log("Error: " + err));
    }
    Requests();
  }, []);
  useEffect(() => {
    let subtotal = 0;
    let total = 0;
    for (let i = 0; i < transaction.products.length; i++) {
      let product = products.filter(
        (arr) => arr._id === transaction.products[i].name
      );
      let amount =
        parseFloat(transaction.products[i].rate) *
        parseInt(transaction.products[i].qty);
      let totl = amount * (parseInt(product[0].tax.percentage) / 100) + amount;
      subtotal += amount;
      total += totl;
    }
    setTotals({
      total:
        transaction.transaction === "Yes"
          ? total.toFixed(2)
          : subtotal.toFixed(2),
      subTotal: subtotal.toFixed(2),
      tax:
        transaction.transaction === "Yes" ? (total - subtotal).toFixed(2) : 0.0,
    });
  }, [transaction.products, transaction.transaction]);

  // FUNCTIONS
  const refresh = () => {
    axios
      .get(`http://localhost:4000/transactions/specific/` + id)
      .then((res) => {
        if (res.data !== "error") {
          setTransaction(res.data);
        } else {
          history.push("/404");
        }
      })
      .catch((err) => console.log("Error: " + err));
  };
  return (
    <div className="content-body">
      <div className="container-fluid">
        <Toaster />
        <div className="row">
          <div className="col-xl-9">
            <div className="card">
              <div className="card-body Invoice">
                <div className="p-1 d-flex bd-highlight">
                  <div className="flex-grow-1 text-left bd-highlight">
                    <img className="img-fluid rounded border" alt="A generic square placeholder with rounded corners in a figure." src={transaction.company.logo} style={{ height: "110px" }} />
                    <h4 style={{ fontSize: "20px" }} className="mt-3">
                      {transaction.company.name}
                    </h4>
                    <span style={{ fontSize: "15px" }}>
                      NTN No: {transaction.company.ntn} | GST No:{" "}
                      {transaction.company.strn}
                    </span>
                  </div>
                  <div className="bd-highlight text-right">
                    <p className="text-right">
                      <span
                        className="text-primary"
                        style={{ fontSize: "20px" }}
                      >
                        Find Everything For Your Office Needs!
                      </span>
                      <br />
                      <span style={{ fontSize: "15px" }}>
                        Laptops, Computers, Network, Janitorial Supplies
                      </span>
                      <br />
                      <span style={{ fontSize: "15px" }}>
                        Break Room Supplies, Refills, Stationery and so much
                        more
                      </span>
                      <br />
                      <span
                        className="text-primary"
                        style={{ fontSize: "15px" }}
                      >
                        Website: corporatesupplies.com.pk
                      </span>
                      <br />
                      <span
                        className="text-primary"
                        style={{ fontSize: "15px" }}
                      >
                        Email: {transaction.company.email}
                      </span>
                    </p>
                    <ul class="social-icons icon-circle list-unstyled list-inline">
                      <li><Link to="/"><i class="fa fa-facebook"></i></Link> </li>
                      <li><Link to="/"><i class="fa fa-twitter"></i></Link> </li>
                      <li><Link to="/"><i class="fa fa-linkedin"></i></Link> </li>
                      <li><Link to="/"><i class="fa fa-instagram"></i></Link> </li>
                    </ul>
                  </div>
                </div>
                <hr />

                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">
                    <strong
                      style={{ fontSize: "20px" }}
                      className="text-primary"
                    >
                      {transaction.type === "sale" ? "Customer" : "Supplier"}'s
                      Details
                    </strong>
                    <p style={{ fontSize: "16px" }}>
                      {transaction.dealer.name}
                      <br />
                      {transaction.dealer.address}
                      <br />
                      NTN: {transaction.dealer.ntn} | GST:{" "}
                      {transaction.dealer.gst}
                      <br />
                      Email: {transaction.dealer.email}
                    </p>
                  </div>
                  <div className="p-2 bd-highlight" text-left d-none d-sm-block>
                    <strong
                      style={{ fontSize: "20px" }}
                      className="text-primary"
                    >
                      Invoice Details
                    </strong>
                    <p style={{ fontSize: "16px" }}>
                      Invoice Date: {transaction.invoiceDate}
                      <br />
                      Invoice No: {transaction.invoiceNo}
                      <br />
                      Ref No: {transaction.quote}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontFamily: "calibri",
                    height: "38px",
                    backgroundColor: "#3a7afe",
                    color: "#fff",
                  }}
                  className="col-12 p-1 text-center mb-4 border"
                >
                  <strong>Product Details</strong>
                </div>
                <div className="table-responsive">
                  <table className="table header-border table-responsive-sm mb-5">
                    <thead>
                      <tr>
                        <th>S#</th>
                        <th>Product</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Qty</th>
                        {transaction.transaction === "Yes" ? (
                          <>
                            <th>Tax</th>
                            <th>Amount</th>
                          </>) : ""}
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transaction.products.map((e, index) => {
                        let product = products.filter((arr) => arr._id === e.name);
                        let amount = parseFloat(e.rate) * parseFloat(e.qty);
                        let total = transaction.transaction === "Yes" ? amount * (parseInt(product[0].tax.percentage) / 100) + amount : amount;

                        return (
                          <tr style={{ border: "1px #e6e6e6" }}>
                            <td>{index + 1}</td>
                            <td>{product[0].name}</td>
                            <td>{product[0].unit.unit}</td>
                            <td>{parseFloat(e.rate).toFixed(2)}</td>
                            <td>{e.qty}</td>
                            {transaction.transaction === "Yes" ? (
                              <>
                                <td>{product[0].tax.percentage}% | {(total - amount).toFixed(2)} {transaction.company.currSymbol}</td>
                                <td>{amount.toFixed(2)} {transaction.company.currSymbol}</td>
                              </>) : ""}
                            <td>{total.toFixed(2)} </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-6" text-right>
                    <h6
                      className="p-2 text-white"
                      style={{
                        fontSize: "16px",
                        fontFamily: "calibri",
                        backgroundColor: "#3a7afe",
                      }}
                    >
                      Terms And Conditions
                    </h6>
                    <p
                      style={{
                        fontSize: "15px",
                        fontFamily: "calibri",
                      }}
                      className="text-left"
                    >
                      {transaction.remarks}
                    </p>
                  </div>

                  <div className="col-6" text-left style={{ fontSize: "15px" }}>
                    <dl className="receipt__list">
                      <div className="receipt__list-row">
                        <dt className="receipt__item">Sub Total</dt>
                        <dd className="receipt__cost">{transaction.company.currSymbol} {totals.subTotal}</dd>
                      </div>
                      <div className="receipt__list-row mt-3">
                        <dt className="receipt__item">Total Tax</dt>
                        <dd className="receipt__cost">{transaction.company.currSymbol} {totals.tax}</dd>
                      </div>
                      <div className="receipt__list-row receipt__list-row--total mt-3">
                        <dt className="receipt__item">Grand Total</dt>
                        <dd className="receipt__cost">{transaction.company.currSymbol} {totals.total}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div
                  className="col-12 text-center mt-4"
                  style={{
                    fontSize: "12px",
                    fontFamily: "calibri",
                    marginTop: "-200px",
                    position: "bottom",
                    clear: "both",
                  }}
                >
                  <p>
                    <strong>Address: </strong>
                    {transaction.company.address}
                    <br />
                    <strong> Website : </strong>
                    https://corporatesupplies.com.pk,
                    <strong>Email : </strong>
                    <Link>{transaction.company.email}</Link>
                    <br />
                    <strong>Contact :</strong>
                    {transaction.company.phone} <br />
                    <strong>
                      <i className="fa fa-copyright"></i>{" "}
                      {transaction.company.name}{" "}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card">
              <div className="card-body">
                <button
                  className="btn btn-block btn-primary"
                  onClick={(e) => {
                    let printContents = $('.Invoice').html();
                    $('body').css("background-color", 'white');
                    document.body.innerHTML = printContents;
                    window.print();
                    window.location.reload();
                  }}
                >
                  PRINT
                </button>
                {transaction.status === "In Progress" ? (
                  <>
                    <button
                      className="btn btn-block btn-success"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/transaction/form/${id}`);
                      }}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-block btn-warning text-white"
                      onClick={async (e) => {
                        e.preventDefault();
                        toast.loading("Loading...");
                        for (let i = 0; i < transaction.products.length; i++) {
                          // GETTING PRODUCT
                          let product = products.filter((arr) => arr._id === transaction.products[i].name);
                          // ALTERING QTY
                          product[0].current_stock =
                            parseInt(product[0].current_stock) -
                            parseInt(transaction.products[i].qty);

                          // FORM DATA
                          var form = new FormData();
                          form.append("current_stock", product[0].current_stock);

                          //REQUESTING FOR UPDATE
                          await axios.post(`http://localhost:4000/products/` + product[0]._id, form)
                            .then((res) => { if (res.data !== "Updated") { setCheck(false); } })
                            .catch(() => { toast.dismiss(); toast.error("Server Error", toastFields) });

                          // BREAKING THE LOOP
                          if (check === false) { break; }
                        }
                        if (check === true) {
                          axios
                            .post(`http://localhost:4000/transactions/${id}`, {
                              status: "Approved",
                              approvedBy: localStorage.getItem("user_id"),
                            })
                            .then((res) => {
                              toast.dismiss();
                              toast.success(`Transaction Approved`, toastFields);
                              refresh();
                            })
                            .catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) }
                            );
                        } else {
                          toast.dismiss();
                          toast.error("Product Qty Error", toastFields)
                        }
                      }}
                    >
                      APPROVE
                    </button>
                    <button
                      className="btn btn-block btn-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/transaction/form/${id}`);
                      }}
                    >
                      DELETE
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InvoiceView;

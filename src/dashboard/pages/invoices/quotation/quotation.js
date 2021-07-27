/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import $ from "jquery";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function InvoiceView() {
  const toastFields = { duration: 4000, position: "top-center" };
  const [quotation, setQuotation] = new useState({
    company: { currSymbol: "" },
    creator: localStorage.getItem("user_id"),
    invoiceNo: "",
    invoiceDate: "",
    customer: "",
    transaction: "",
    quote: "",
    products: [],
    remarks: "",
    status: "In Progress",
    approved: "In Progress",
  });
  const [products, setProduct] = new useState([]);
  const [totals, setTotals] = new useState({
    total: 0.0,
    subTotal: 0.0,
    tax: 0.0,
  });
  let { id } = new useParams();
  let history = useHistory();
  useEffect(() => {
    require("../css/main.css");
    async function Requests() {
      // PRODUCT
      await axios
        .get(
          "https://css-project.herokuapp.com/products/company/" +
            localStorage.getItem("company_id")
        )
        .then((res) => setProduct(res.data))
        .catch((err) => console.log("Error: " + err));

      //Quotation DATA
      await axios
        .get(`https://css-project.herokuapp.com/quotations/specific/` + id)
        .then((res) => {
          if (res.data !== "error") {
            setQuotation(res.data);
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
    for (let i = 0; i < quotation.products.length; i++) {
      let product = products.filter(
        (arr) => arr._id === quotation.products[i].name
      );
      let amount =
        parseFloat(quotation.products[i].rate) *
        parseInt(quotation.products[i].qty);
      let totl = amount * (parseInt(product[0].tax.percentage) / 100) + amount;
      subtotal += amount;
      total += totl;
    }
    setTotals({
      total:
        quotation.transaction === "Yes"
          ? total.toFixed(2)
          : subtotal.toFixed(2),
      subTotal: subtotal.toFixed(2),
      tax:
        quotation.transaction === "Yes" ? (total - subtotal).toFixed(2) : 0.0,
    });
  }, [quotation.products, quotation.transaction]);
  return (
    <div className="content-body">
      <div className="container-fluid">
        <Toaster />
        <div className="row">
          <div className="col-xl-9">
            <div className="card Invoice">
              <div className="card-body">
                <div className="p-1 d-flex bd-highlight">
                  <div className="flex-grow-1 text-left bd-highlight">
                    <img
                      className="img-fluid rounded border"
                      alt="A generic square placeholder with rounded corners in a figure."
                      src={quotation.company.logo}
                      style={{ height: "110px" }}
                    />
                    <h4 style={{ fontSize: "20px" }} className="mt-3">
                      {quotation.company.name}
                    </h4>
                    <span style={{ fontSize: "15px" }}>
                      NTN No: {quotation.company.ntn} | GST No:{" "}
                      {quotation.company.strn}
                    </span>
                    <br />
                    <span style={{ fontSize: "15px" }}>
                      Address: {quotation.company.address}
                    </span>
                    <br />
                    <span style={{ fontSize: "15px" }}>
                      Contact No: {quotation.company.phone}
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
                        Website : corporatesupplies.com.pk
                      </span>
                      <br />
                      <span
                        className="text-primary"
                        style={{ fontSize: "15px" }}
                      >
                        Email : {quotation.company.email}
                      </span>
                    </p>
                    <ul class="social-icons icon-circle list-unstyled list-inline">
                      <li>
                        <Link to="/">
                          <i class="fa fa-facebook"></i>
                        </Link>{" "}
                      </li>
                      <li>
                        <Link to="/">
                          <i class="fa fa-twitter"></i>
                        </Link>{" "}
                      </li>
                      <li>
                        <Link to="/">
                          <i class="fa fa-linkedin"></i>
                        </Link>{" "}
                      </li>
                      <li>
                        <Link to="/">
                          <i class="fa fa-instagram"></i>
                        </Link>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
                <hr />

                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">
                    <strong
                      style={{ fontSize: "22px" }}
                      className="text-primary"
                    >
                      Customer Details
                    </strong>
                    <p style={{ fontSize: "16px" }}>
                      {quotation.customer.name}
                      <br />
                      {quotation.customer.address}
                      <br />
                      NTN : {quotation.customer.ntn} | GST:{" "}
                      {quotation.customer.gst}
                      <br />
                      Email : {quotation.customer.email}
                    </p>
                  </div>
                  <div className="p-2 bd-highlight text-right">
                    <strong
                      style={{ fontSize: "22px", textAlign: "right" }}
                      className="text-primary"
                    >
                      Invoice Details
                    </strong>
                    <p style={{ fontSize: "16px", textAlign: "right" }}>
                      Invoice Date : {quotation.invoiceDate}
                      <br />
                      Invoice No : {quotation.invoiceNo}
                      <br />
                      Ref No : {quotation.quote}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontFamily: "calibri",
                    height: "38px",
                    background:
                      "linear-gradient(-50deg, #00c6ff 0%, #0072ff  100%, #00c6ff  100%)",
                    color: "#fff",
                    textAlign: "center",
                  }}
                  className="col-12 text-center mb-4 border"
                >
                  <strong>Commercial Invoice</strong>
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
                        {quotation.transaction === "Yes" ? (
                          <>
                            <th>Tax</th>
                            <th>Amount</th>
                          </>
                        ) : (
                          ""
                        )}
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotation.products.map((e, index) => {
                        let product = products.filter(
                          (arr) => arr._id === e.name
                        );
                        let amount = parseFloat(e.rate) * parseFloat(e.qty);
                        let total =
                          quotation.transaction === "Yes"
                            ? amount *
                                (parseInt(product[0].tax.percentage) / 100) +
                              amount
                            : amount;
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{product[0].name}</td>
                            <td>{product[0].unit.unit}</td>
                            <td>
                              {parseFloat(e.rate).toFixed(2)}{" "}
                              {quotation.company.currSymbol}
                            </td>
                            <td>{e.qty}</td>
                            {quotation.transaction === "Yes" ? (
                              <>
                                <td>
                                  {product[0].tax.percentage}% |{" "}
                                  {(total - amount).toFixed(2)}{" "}
                                  {quotation.company.currSymbol}
                                </td>
                                <td>
                                  {amount.toFixed(2)}{" "}
                                  {quotation.company.currSymbol}
                                </td>
                              </>
                            ) : (
                              ""
                            )}
                            <td>
                              {total.toFixed(2)} {quotation.company.currSymbol}
                            </td>
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
                        background:
                          "linear-gradient(-50deg, #00c6ff 0%, #0072ff  100%, #00c6ff  100%)",
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
                      {quotation.remarks}
                    </p>
                  </div>
                  <div className="col-6" text-left style={{ fontSize: "15px" }}>
                    <dl className="receipt__list">
                      <div className="receipt__list-row">
                        <dt className="receipt__item">Sub Total</dt>
                        <dd className="receipt__cost">
                          {quotation.company.currSymbol} {totals.subTotal}
                        </dd>
                      </div>
                      <div className="receipt__list-row mt-3">
                        <dt className="receipt__item">Total Tax</dt>
                        <dd className="receipt__cost">
                          {quotation.company.currSymbol} {totals.tax}
                        </dd>
                      </div>
                      <div className="receipt__list-row receipt__list-row--total mt-3">
                        <dt className="receipt__item">Grand Total</dt>
                        <dd className="receipt__cost">
                          {quotation.company.currSymbol} {totals.total}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="col-md-12">
                    <h6 style={{ color: "#89879F" }}>INOVICE CREATOR</h6>
                    <p
                      style={{
                        fontSize: "15px",
                        fontFamily: "calibri",
                      }}
                      className="text-left"
                    >
                      <i className="fa fa-user mr-2" aria-hidden="true"></i>{" "}
                      {quotation.creator.firstName} {quotation.creator.lastName}
                      <br />
                      <i
                        className="fa fa-envelope mr-2"
                        aria-hidden="true"
                      ></i>{" "}
                      {quotation.creator.email}
                      <br />
                      <i
                        className="fa fa-phone mr-2"
                        aria-hidden="true"
                      ></i>{" "}
                      {quotation.creator.contact}
                    </p>
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
                ></div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 d-print-none">
            <div className="card">
              <div className="card-body">
                <button
                  className="btn-grad btn-grad-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    let printContents = $(".Invoice").html();
                    $("body").css("background-color", "white");
                    document.body.innerHTML = printContents;
                    window.print();
                    window.location.reload();
                  }}
                >
                  <i className="fa fa-print mr-1"></i> PRINT
                </button>
                {quotation.status === "In Progress" ? (
                  <>
                    <button
                      className="btn-grad btn-grad-warning mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/quotation/form/${id}`);
                      }}
                    >
                      <i className="fa fa-pencil mr-1"></i> EDIT
                    </button>
                    <button
                      className="btn-grad btn-grad-success mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        axios
                          .post(
                            `https://css-project.herokuapp.com/quotations/${id}`,
                            {
                              status: "Approved",
                              approvedBy: localStorage.getItem("user_id"),
                            }
                          )
                          .then((res) => {
                            toast.success("Invoice Approved", toastFields);
                            setQuotation({ ...quotation, status: "Approved" });
                          })
                          .catch((err) => {
                            toast.dismiss();
                            toast.error("Server Error", toastFields);
                          });
                      }}
                    >
                      <i className="fa fa-check-circle mr-1"></i> APPROVE
                    </button>
                    <button
                      className="btn-grad btn-grad-danger mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/quotation/form/${id}`);
                      }}
                    >
                      <i className="fa fa-trash mr-1"></i> DELETE
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

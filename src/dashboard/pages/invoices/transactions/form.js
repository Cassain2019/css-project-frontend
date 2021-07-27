/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";

import ReactTooltip from "react-tooltip";

function Transaction() {
  // STATES
  let { type, id, invoice, sale_id } = new useParams();
  let history = useHistory();
  var date = new Date();
  const [products, setProduct] = new useState([]);
  const [customers, setCustomers] = new useState([]);
  const [suppliers, setSuppliers] = new useState([]);
  const [tax, setTax] = new useState([]);
  const [company, setCompany] = new useState({
    currSymbol: "",
    invoiceTaxes: [],
  });
  const [value, setValue] = new useState({
    id: "none",
    product: "",
    displayName: " ",
    rate: "",
    qty: "",
    dealer: "",
  });
  const [prop, setprop] = new useState({
    dealer: "",
  });
  const [totals, setTotals] = new useState({
    total: 0.0,
    subTotal: 0.0,
    tax: 0.0,
    othertaxes: 0.0,
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
    dueDate: "",
    dealer: "",
    transaction: "",
    refNo: "",
    products: [],
    otherTax: [],
    remarks: "",
    invtotal: totals.total,
    totalTax: totals.othertaxes,
    status: "In Progress",
    type: type,
    approvedBy: "In Progress",
    paidBy: [],
    recevied: [],
    taxes: [],
    taxAmounts: [],
    discount: [],
    paymentType: [],
    paymentDetails: [],
    paymentDate: [],
  });
  const toastFields = { duration: 4000, position: "top-center" };

  // ON LOAD ACTIVITIES

  // FOR ALL THE REQUESTS
  useEffect(() => {
    require("../css/main.css");
    if (type !== "sale" && type !== "purchase") {
      history.push("/404");
    }
    async function Requests() {
      // Taxes
      await axios
        .get(
          "https://css-project.herokuapp.com/taxes/company/" +
            localStorage.getItem("company_id")
        )
        .then((res) => setTax(res.data))
        .catch((err) => console.log("Error: " + err));

      //COMPANY
      await axios
        .get(
          "https://css-project.herokuapp.com/companies/" +
            localStorage.getItem("company_id")
        )
        .then((res) => setCompany(res.data))
        .catch((err) => console.log("Error: " + err));

      // PRODUCT
      await axios
        .get(
          "https://css-project.herokuapp.com/products/company/" +
            localStorage.getItem("company_id")
        )
        .then((res) => setProduct(res.data))
        .catch((err) => console.log("Error: " + err));

      //dealers
      await axios
        .get(
          `https://css-project.herokuapp.com/dealers/company/` +
            localStorage.getItem("company_id")
        )
        .then((res) => {
          setCustomers(res.data.filter((arr) => arr.type === "customer"));
          setSuppliers(res.data.filter((arr) => arr.type === "supplier"));
        })
        .catch((err) => console.log("Error: " + err));

      if (id) {
        //Transaction DATA
        await axios
          .get(`https://css-project.herokuapp.com/transactions/specific/` + id)
          .then((res) => {
            if (res.data !== "error") {
              setData(res.data);
              setprop({ dealer: res.data.dealer._id });
            } else {
              history.push("/404");
            }
          })
          .catch((err) => console.log("Error: " + err));
      } else if (invoice) {
        //Quotation DATA
        axios
          .get(
            `https://css-project.herokuapp.com/quotations/specific/` + invoice
          )
          .then((res) => {
            if (res.data !== "error") {
              setData({
                ...data,
                dealer: res.data.customer,
                transaction: res.data.transaction,
                refNo: res.data.quote,
                products: res.data.products,
                remarks: res.data.remarks,
              });
              setprop({ dealer: res.data.customer._id });
            } else {
              history.push("/404");
            }
          })
          .catch((err) => console.log("Error: " + err));
      } else if (sale_id) {
        await axios
          .get(
            `https://css-project.herokuapp.com/transactions/specific/` + sale_id
          )
          .then((res) => {
            if (res.data !== "error") {
              setData(res.data);
              setprop({ dealer: res.data.dealer._id });
            } else {
              history.push("/404");
            }
          })
          .catch((err) => console.log("Error: " + err));
      }
    }
    Requests();
  }, []);

  // FOR INVOICE NO
  useEffect(() => {
    if (!id) {
      // Invoice
      axios
        .get("https://css-project.herokuapp.com/transactions/invoice/" + type)
        .then((res) => invoiceGen(res.data))
        .catch((err) => console.log("Error: " + err));
    }
  }, [data.invoiceNo]);

  // FOR TOTAL
  useEffect(() => {
    let subtotal = 0;
    let total = 0;
    let otherTax = 0;
    for (let i = 0; i < data.products.length; i++) {
      let product = products.filter((arr) => arr._id === data.products[i].name);
      let amount =
        parseFloat(data.products[i].rate) * parseInt(data.products[i].qty);
      let totl = amount * (parseInt(product[0].tax.percentage) / 100) + amount;
      subtotal += amount;
      total += totl;
    }
    for (let i = 0; i < company.invoiceTaxes.length; i++) {
      let invoiceTax = tax.filter(
        (arr) => arr._id === company.invoiceTaxes[i].value
      );
      otherTax += subtotal * (parseFloat(invoiceTax[0].percentage) / 100);
    }
    setTotals({
      total:
        data.transaction === "Yes"
          ? (total + otherTax).toFixed(2)
          : (subtotal + otherTax).toFixed(2),
      subTotal: subtotal.toFixed(2),
      tax: data.transaction === "Yes" ? (total - subtotal).toFixed(2) : 0.0,
      othertaxes: otherTax.toFixed(2),
    });
    setData({ ...data, status: "In Progress", type: type });
  }, [data.products, data.transaction, value, data.otherTax]);

  // FOR HISTORY ONLY
  useEffect(async () => {
    for (let i = 0; i < data.products.length; i++) {
      await axios
        .get(
          "https://css-project.herokuapp.com/transactions/latest/" +
            data.products[i].name
        )
        .then((res, product = data.products[i].name, itreation = i) => {
          for (let i = 0; i < res.data.length; i++) {
            let rate = res.data[i].products.filter(
              (arr) => arr.name === product
            )[0].rate;
            res.data[i].type === "sale"
              ? $("#Hsale-" + itreation).html(parseFloat(rate).toFixed(2))
              : $("#Hpurchase-" + itreation).html(parseFloat(rate).toFixed(2));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [data.products]);

  // FOR TOTAL TAXES AND AMOUNT
  useEffect(() => {
    setData({
      ...data,
      invtotal: totals.total,
      taxTotal: totals.othertaxes,
      otherTax: company.invoiceTaxes,
    });
  }, [totals.total]);

  // FOR CUSTOMER CHANGE
  useEffect(() => {
    let tmpDealer = customers.filter((element) => element._id === prop.dealer);
    if (tmpDealer.length > 0) {
      $("#contact").val(tmpDealer[0].phone);
      $("#address").val(tmpDealer[0].address);
      if (!id) {
        let term = tmpDealer[0].creditTerms;
        term = term.replace("Days Terms", "");
        let tempDate = new Date();
        tempDate.setDate(tempDate.getDate() + parseInt(term));
        let dueDate =
          tempDate.getFullYear() +
          "-" +
          String(tempDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(tempDate.getDate()).padStart(2, "0");
        setData({ ...data, dueDate: dueDate });
      }
    }
  }, [prop]);

  // FUNCTIONS
  const invoiceGen = async (transaction) => {
    let invoice = "";
    if (transaction.length !== 0) {
      let year =
        transaction[0].company.FormatDetails === true
          ? parseInt(date.getFullYear()) - 2000
          : "";
      let dates =
        transaction[0].company.FormatDetails === true
          ? String(date.getMonth() + 1).padStart(2, "0") + year + "-"
          : "";
      invoice = transaction[0].invoiceNo;
      let format = transaction[0].company.invoiceFormat;
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
        .get(
          "https://css-project.herokuapp.com/companies/" +
            localStorage.getItem("company_id")
        )
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
  const dealerChange = (e) => {
    onChange(e);
    setprop({
      dealer: e.value,
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
    if (
      type === "purchase"
        ? !Object.values(value).every((element) => element !== "") === false
        : value.dealer === "" &&
          value.product !== "" &&
          value.displayName !== "" &&
          value.rate !== "" &&
          value.qty !== ""
    ) {
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
              dealer: value.dealer,
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
          dealer: value.dealer,
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
        dealer: "",
      });
    } else {
      toast.error("Dealer Already Exists", toastFields);
    }
  };

  // SUBMIT
  const submit = (e) => {
    e.preventDefault();
    toast.loading("Loading...");

    $(".animeBtn").attr("disabled", "disabled");
    $("#btnContent").html(
      '<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>'
    );
    let url = "https://css-project.herokuapp.com/transactions/";
    if (id) {
      url = "https://css-project.herokuapp.com/transactions/" + id;
    }
    setData({ ...data, status: "In Progress", type: type });
    if (!Object.values(data).every((element) => element !== "") === false) {
      let restriction = true;
      data.products.forEach((e) => {
        if (type !== "purchase") {
          if (
            value.dealer === "" &&
            value.product !== "" &&
            value.displayName !== "" &&
            value.rate !== "" &&
            value.qty !== ""
          ) {
            restriction = false;
          }
        } else {
          if (Object.values(e).every((element) => element !== "") === false) {
            restriction = false;
          }
        }
      });
      if (restriction === true) {
        delete data["_id"];
        axios
          .post(url, data)
          .then((res) => {
            toast.dismiss();
            if (res.data === "Added" || res.data === "Updated") {
              toast.success(
                `${id ? "Updated" : "Created"} Transaction`,
                toastFields
              );
              if (sale_id) {
                history.push("/purchase");
              }
              if (!id) {
                setData({
                  company: localStorage.getItem("company_id"),
                  creator: localStorage.getItem("user_id"),
                  invoiceNo: "",
                  invoiceDate:
                    date.getFullYear() +
                    "-" +
                    String(date.getMonth() + 1).padStart(2, "0") +
                    "-" +
                    String(date.getDate()).padStart(2, "0"),
                  dueDate: "",
                  dealer: "",
                  transaction: "",
                  refNo: "",
                  products: [],
                  remarks: "",
                  invtotal: 0.0,
                  totalTax: 0.0,
                  status: "In Progress",
                  type: type,
                  approvedBy: "In Progress",
                  paidBy: [],
                  recevied: [],
                  otherTax: [],
                  taxes: [],
                  taxAmounts: [],
                  discount: [],
                  paymentType: [],
                  paymentDetails: [],
                  paymentDate: [],
                });
                setprop({ dealer: "" });
                $("#contact").val("");
                $("#address").val("");
              }
            } else {
              toast.error(
                "Please Contact us If You See This Again",
                toastFields
              );
            }
          })
          .catch((err) => {
            toast.dismiss();
            toast.error("Server Error", toastFields);
          });
      } else {
        toast.dismiss();
        toast.error("Missing Fields", toastFields);
      }
    } else {
      toast.dismiss();
      toast.error("Missing Fields", toastFields);
    }
    $(".animeBtn").removeAttr("disabled");
    $("#btnContent").html(`${id ? "Update" : "Create"} ${type}`);
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
                  <label>Due Date</label>
                  <input
                    type="date"
                    onChange={onChange}
                    name="dueDate"
                    value={data.dueDate}
                    className="form-control"
                    required
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
                    onChange={dealerChange}
                    options={customers.map((element, index) => {
                      return {
                        value: element._id,
                        label: element.name,
                        target: { name: "dealer", value: element._id },
                      };
                    })}
                    value={customers.map((element, index) => {
                      if (element._id === prop.dealer) {
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
                      id && invoice
                        ? data.dealer.phone
                        : customers.map((element, index) => {
                            if (element._id === prop.dealer) {
                              return element.phone;
                            }
                          })[0]
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
                      id && invoice
                        ? data.dealer.address
                        : customers.map((element, index) => {
                            if (element._id === data.dealer) {
                              return element.address;
                            }
                          })[0]
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
                  <label className="mt-2">Reference No # </label>
                  <input
                    type="text"
                    onChange={onChange}
                    value={data.refNo}
                    name="refNo"
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
                          <th>Product</th>
                          <th>Display</th>
                          {type === "purchase" ? <th>Supplier</th> : ""}
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
                          let supplier = suppliers.filter(
                            (arr) => arr._id === e.dealer
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

                              <tr key={index}>
                                <td>{product[0].name}</td>
                                <td>{e.displayName}</td>
                                {type === "purchase" ? (
                                  <td>
                                    {supplier.length === 0
                                      ? ""
                                      : supplier[0].name}
                                  </td>
                                ) : (
                                  ""
                                )}
                                <td>{parseFloat(e.rate).toFixed(2)}</td>
                                <td>{e.qty}</td>
                                <td>{product[0].tax.percentage}%</td>
                                <td>
                                  <span
                                    data-tip
                                    data-for="purchaseTip"
                                    id={`Hpurchase-${index}`}
                                  >
                                    0.00
                                  </span>{" "}
                                  |{" "}
                                  <span
                                    data-tip
                                    data-for="saleTip"
                                    id={`Hsale-${index}`}
                                  >
                                    0.00
                                  </span>{" "}
                                  |{" "}
                                  <span
                                    data-tip
                                    data-for="soldCusTip"
                                    id="soldCusTip"
                                  >
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
                                        dealer:
                                          type === "purchase" ? e.dealer : "",
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
                    <div
                      className={
                        type === "sale"
                          ? "form-group col-md-4"
                          : "form-group col-md-3"
                      }
                    >
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
                    <div
                      className={
                        type === "sale" ? "d-none" : "form-group col-md-3"
                      }
                    >
                      <label>Supplier</label>
                      <Select
                        style={{ borderRadius: "100px" }}
                        onChange={(e) => {
                          setValue({
                            ...value,
                            dealer: e.value,
                          });
                        }}
                        options={suppliers.map((element, index) => {
                          return {
                            value: element._id,
                            label: element.name,
                          };
                        })}
                        value={suppliers.map((element, index) => {
                          if (element._id === value.dealer) {
                            return {
                              value: element._id,
                              label: element.name,
                            };
                          }
                        })}
                        placeholder={<div>Choose Supplier</div>}
                      />
                    </div>

                    <div
                      className={
                        type === "sale"
                          ? "form-group col-md-4"
                          : "form-group col-md-2"
                      }
                    >
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
                        <dd className="receipt__cost">
                          {company.currSymbol} {totals.subTotal}
                        </dd>
                      </div>
                      <div className="receipt__list-row mt-3">
                        <dt className="receipt__item">Product Tax</dt>
                        <dd className="receipt__cost">
                          {company.currSymbol} {totals.tax}
                        </dd>
                      </div>
                      <div className="receipt__list-row mt-3">
                        <dt className="receipt__item">Special Tax</dt>
                        <dd className="receipt__cost">
                          {company.currSymbol} {totals.othertaxes}
                        </dd>
                      </div>
                      <div className="receipt__list-row receipt__list-row--total mt-3 ">
                        <dt className="receipt__item">Total</dt>
                        <dd className="receipt__cost">
                          {company.currSymbol} {totals.total}
                        </dd>
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
                    {id ? "Update" : "Create"} {type}
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
                          setData({ ...data, products: temp });
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
export default Transaction;

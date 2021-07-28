/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast from 'react-hot-toast';
import { getCountryInfo, getCurrencybyCountryCode } from 'get-all-country-info';

function Details() {
  const [company, setcompany] = new useState([]);
  const [tax, setTax] = new useState([]);
  const [country, setCounty] = new useState([]);
  const countryCallingCodes = require("./countryCallingCode.json");
  const toastFields = { duration: 4000, position: 'top-center' };

  useEffect(() => {
    async function requests() {
      // Tax
      await axios
        .get("http://localhost:4000/taxes/company/" + localStorage.getItem("company_id"))
        .then((res) => setTax(res.data))
        .catch((err) => console.log("Error: " + err));

      await axios
        .get("http://localhost:4000/companies/" + localStorage.getItem("company_id"))
        .then((res) => setcompany([res.data]))
        .catch((err) => console.log("Error: " + err));

      //SETTING COUNTRIES
      setCounty(getCountryInfo({ methodType: ["COUNTRY_NAME", "CURRENCY"], attributes: "" }));
    }
    requests();
  }, []);
  const onChange = (e) => {
    setcompany([
      {
        ...company[0],
        [e.target.name]: e.target.value,
      },
    ]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    toast.loading("Loading...")
    axios
      .post(
        "http://localhost:4000/companies/" + localStorage.getItem("company_id"),
        company[0]
      )
      .then((res) => {
        toast.dismiss();
        res.data === "Updated"
          ? toast.success(`Prefrences Saved`, toastFields)
          : toast.error("Please Contact Us", toastFields)
      })
      .catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) });
  };
  return (
    <>
      <div className="card-header">
        <h4 className="card-title text-primary">Prefrences</h4>
      </div>
      <div className="card-body">
        {company.map((element, index) => {
          return (
            <div className="settings-form">
              <form onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Invoice's Taxes</label>
                    <Select
                      name="invoiceTaxes"
                      isMulti
                      options={tax.map((e, index) => {
                        return {
                          value: e._id,
                          label: e.name,
                        };
                      })}
                      onChange={(e) => {
                        setcompany([{ ...company[0], invoiceTaxes: e }]);
                      }}
                      value={company[0].invoiceTaxes}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Country</label>
                    <Select
                      name="country"
                      options={country.map((e, index) => {
                        return { value: e.country_name, label: e.country_name }
                      })}
                      onChange={(e) => {
                        let currency = country.filter((arr) => arr.country_name === e.value)[0].currency;
                        let dial_code = countryCallingCodes.filter((arr) => arr.name === e.value);
                        let info = getCurrencybyCountryCode(currency);
                        if (info && dial_code.length > 0) {
                          setcompany([{
                            ...company[0],
                            country: e.value,
                            currency: currency + " - " + info.symbol_native,
                            currSymbol: info.symbol_native,
                            dial_code: dial_code[0].dial_code
                          },]);
                        }
                      }}
                      value={{ value: company[0].country, label: company[0].country }}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>State</label>
                    <input
                      className="form-control"
                      name="state"
                      onChange={onChange}
                      value={company[0].state} />
                  </div>
                  <div className="form-group col-md-2">
                    <label>Phone Code</label>
                    <input
                      className="form-control"
                      name="dial_code"
                      onChange={onChange}
                      value={company[0].dial_code}
                      readOnly />
                  </div>
                  <div className="form-group col-md-6">
                    <label>City</label>
                    <input className="form-control"
                      name="city"
                      onChange={onChange}
                      value={company[0].city} />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Zip</label>
                    <input
                      type="number"
                      name="zip"
                      onChange={onChange}
                      value={company[0].zip}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Currency</label>
                    <input
                      type="text"
                      name="currency"
                      onChange={onChange}
                      readOnly
                      value={company[0].currency}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button className="customBtn third pulse" type="submit">
                    Save Prefrences
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Details;

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

// COMPONENTS
import Modal from "./modal";

export default function Page() {
  const [companies, setCompanies] = new useState([]);
  useEffect(() => {
    require("./css/menu.css");
    require("./js/menu");

    axios
      .get("http://localhost:4000/companies/")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.log("Error: " + err));
  }, [setCompanies]);

  const setCookie = (e) => {
    toast.dismiss();
    toast.success(`Welcome Into ${e.name}'s Portal`);
    localStorage.setItem('company_id', e.target.id);
    window.location.href = '/';
  };
  return (
    <>
      <div className="MENU">
        <div className="hamburger hamburger--demo-3 js-hover">
          <div className="hamburger__line hamburger__line--01">
            <div className="hamburger__line-in hamburger__line-in--01"></div>
          </div>
          <div className="hamburger__line hamburger__line--02">
            <div className="hamburger__line-in hamburger__line-in--02"></div>
          </div>
          <div className="hamburger__line hamburger__line--03">
            <div className="hamburger__line-in hamburger__line-in--03"></div>
          </div>
          <div className="hamburger__line hamburger__line--cross01">
            <div className="hamburger__line-in hamburger__line-in--cross01"></div>
          </div>
          <div className="hamburger__line hamburger__line--cross02">
            <div className="hamburger__line-in hamburger__line-in--cross02"></div>
          </div>
        </div>
        <div>
          <Modal />
        </div>
        <div className="global-menu">
          <div className="global-menu__wrap">
            <a
              className="global-menu__item global-menu__item--demo-3"
              href="#exampleModal"
              data-toggle="modal"
            >
              Create Your Company
            </a>
            <a className="global-menu__item global-menu__item--demo-3" href="/">
              Introduction
            </a>
            <a className="global-menu__item global-menu__item--demo-3" href="/">
              Learning
            </a>
            <Link className="global-menu__item global-menu__item--demo-3" to="/logout">Logout</Link>
          </div>
        </div>
        <svg
          className="shape-overlays"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path className="shape-overlays__path"></path>
          <path className="shape-overlays__path"></path>
          <path className="shape-overlays__path"></path>
        </svg>
      </div>
      <section id="team" className="pb-5">
        <Toaster />
        <div className="container">
          <h5 className="section-title h1">Companies</h5>
          <div className="row">
            {companies.map((value, index) => {
              return (
                <div className="col-xs-12 col-sm-6 col-md-4" key={value._id}>
                  <div className="image-flip">
                    <div className="mainflip flip-0">
                      <div className="frontside">
                        <div className="card">
                          <div className="card-body text-center">
                            <p>
                              <img
                                className=" img-fluid"
                                src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"
                                alt="card"
                              />
                            </p>
                            <h4 className="card-title">{value.name}</h4>
                            <p className="card-text">
                              {value.address}
                            </p>
                            <button className="btn btn-primary" id={value._id} onClick={setCookie}>Sign In</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

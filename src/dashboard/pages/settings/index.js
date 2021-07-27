import React from "react";
import { Toaster } from "react-hot-toast";

// TABS
import Account from "./account/";
import Company from "./company/";
import Details from "./details/";

function Settings() {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <Toaster />
        <div className="row">
          <div className="col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="nav flex-column nav-pills mb-3">
                  <a
                    href="#accountSetting"
                    data-toggle="pill"
                    className="nav-link active show"
                  >
                    Account Settings
                  </a>
                  <a
                    href="#companySettings"
                    data-toggle="pill"
                    className="nav-link"
                  >
                    Company Details
                  </a>
                  <a
                    href="#settings"
                    data-toggle="pill"
                    className="nav-link"
                  >
                    Prefrences
                  </a>
                  <a
                    href="#v-pills-settings"
                    data-toggle="pill"
                    className="nav-link"
                  >
                    Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="card">
              <div className="tab-content">
                <div id="accountSetting" className="tab-pane active">
                  <Account />
                </div>
                <div id="companySettings" className="tab-pane">
                  <Company />
                </div>
                <div id="settings" className="tab-pane">
                  <Details />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;

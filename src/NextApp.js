import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory } from "react-router-dom";

// PAGES
import Dashboard from "./dashboard/index";

// AUTH
import Login from "./auth/login/index";
import Register from "./auth/register";
import CompanySelection from "./auth/company/index";
import Logout from "./auth/logout/index";

function NextApp() {
  const loginAuth = localStorage.getItem("user_id");
  const comapnyAuth = localStorage.getItem("company_id");

  const history = useHistory();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" history={history}>
          {loginAuth ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/register" history={history}>
          <Register />
        </Route>
        <Route exact path="/logout" history={history}>
          <Logout />
        </Route>
        <Route exact path="/selection" history={history}>
          {loginAuth ? (
            comapnyAuth ? (
              <Redirect to="/" />
            ) : (
              <CompanySelection />
            )
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/" history={history}>
          {loginAuth ? (
            comapnyAuth ? (
              <Dashboard />
            ) : (
              <Redirect to="/selection" />
            )
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default NextApp;

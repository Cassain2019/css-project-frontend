import React from "react";
import ReactDOM from "react-dom";
// Auth
import NextApp from "./NextApp";

// VITALS
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <NextApp />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();

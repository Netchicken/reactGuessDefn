import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import AppHeader from "./components/AppHeader";

ReactDOM.render(
  <Router>
    <AppHeader />
    <App />
  </Router>,
  document.getElementById("root")
);

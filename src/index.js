import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import AppHeader from "./components/AppHeader";
// import configureStore from "./redux/configureStore";
// import { Provider as ReduxProvider } from "react-redux";

// const store = configureStore(); // our app can access the redux store as its being wrapped in the provider component
// <ReduxProvider store={store}> // </ReduxProvider>,
ReactDOM.render(
  <Router>
    <AppHeader />
    <App />
  </Router>,
  document.getElementById("root")
);

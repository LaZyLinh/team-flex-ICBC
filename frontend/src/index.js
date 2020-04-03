import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { getAccountInfo } from "./Auth";

const accountInfo = getAccountInfo();

ReactDOM.render(<App accountInfo={accountInfo} />, document.getElementById("root"));

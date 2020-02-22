import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import "rsuite/dist/styles/rsuite-default.css";

ReactDOM.render(<App />, document.getElementById("root"));

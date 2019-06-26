import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

ReactDOM.render(<Routes />, document.getElementById("root"));
registerServiceWorker();

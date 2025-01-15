import React from "react";
import "./index.css";
import App from "./App";
import "./assets/healthcare/css/mobile.css";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

//remove below from 15-19
// let devEnv = "development"
// if (devEnv === "development") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React);
// }
const AppWithRouter = () => (
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

if (rootElement.hasChildNodes()) {
  hydrate(<AppWithRouter />, rootElement);
} else {
  render(<AppWithRouter />, rootElement);
}

reportWebVitals();

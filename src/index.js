import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TelerikGrid from "./TelerikGrid";
import Genre from "./Genre";
import "../node_modules/@progress/kendo-date-math/tz/all";
import Interstial from "./interstitialCRUD/Interstial";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <TelerikGrid /> */}
    {/* <Genre /> */}
    <Interstial />
  </React.StrictMode>
);

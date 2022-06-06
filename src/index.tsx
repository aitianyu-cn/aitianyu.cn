/**@format */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { reportWebVitals } from "./reportWebVitals";
import { HomePage } from "./app/start/HomePage";

import "bootstrap/dist/css/bootstrap.css";
import "./anim.css";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") || undefined;
const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <BrowserRouter basename={baseUrl}>
        <HomePage />
    </BrowserRouter>,
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

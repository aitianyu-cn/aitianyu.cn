/**@format */
import React from "react";
import ReactDOM from "react-dom";
import { HomePage } from "./app/home/HomePage";
import "./view/css/index.css";

ReactDOM.render(
    <React.StrictMode>
        {/* <TianyuShell/>
        <HashRouter>
            <Link to="/Page1">Page One</Link>
            <Link to="/Page2">Page Two</Link>
        </HashRouter>
        <div>
            <Title />

            <HashRouter>
                {<Redirect path="/" to="Page1" />}
                <Route path="/" component={Page1} exact />
                <Route path="/Page1" component={Page1} />
                <Route path="/Page2" component={Page2} />
            </HashRouter>
        </div> */}
        <HomePage />
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

/**@format */

import React from "react";
import logo from "./resource/logo.svg";
import "./css/App.css";

import { ITianyuViewShell } from "../aitianyu.app/model/ITianyuViewShell";

export class TianyuViewShell extends React.Component<any, any> implements ITianyuViewShell {
    public render() {
        return <div></div>;
    }
    // public render() {
    //     return (
    //         <div className="App">
    //             <header className="App-header">
    //                 <img src={logo} className="App-logo" alt="logo" />
    //                 <p>
    //                     Edit <code>src/App.js</code> and save to reload.
    //                 </p>
    //                 <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    //                     Learn React
    //                 </a>
    //             </header>
    //         </div>
    //     );
    // }
}

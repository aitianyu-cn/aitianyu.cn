/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { Application } from "../application/Application";
import { HomeNavigation } from "../navigation/HomeNavigation";

import "./css/main.css";
import { BrowserRouter } from "react-router-dom";

export class HomePage extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className="home_page_def_homePage">
                <BrowserRouter>
                    <div className="home_page_def_navigationBar">
                        <HomeNavigation />
                    </div>
                    <div className="home_page_def_contentMain">
                        <div className="home_page_def_appContentForward"></div>
                        <div className="home_page_def_appContent">
                            <Application />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

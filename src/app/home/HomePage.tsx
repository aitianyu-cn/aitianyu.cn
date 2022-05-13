/**@format */

import React from "react";
import { Configure } from "../../dty/common/core/Configure";
import { getLanguage, validatePath } from "../../dty/common/RouteHelp";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { Application } from "../application/Application";
import { HomeNavigation } from "../navigation/HomeNavigation";
import { Error } from "../../page/error/Error";

import "./css/main.css";
import { HashRouter } from "react-router-dom";

export class HomePage extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        const areaCode = getLanguage();
        Configure.generateConfigure().setArea(areaCode);

        const isPathValid = validatePath();
        if (!isPathValid) {
            return (
                <div className="home_page_def_homePage">
                    <Error />
                </div>
            );
        }

        return (
            <div className="home_page_def_homePage">
                <HashRouter>
                    <div className="home_page_def_navigationBar">
                        <HomeNavigation />
                    </div>
                    <div className="home_page_def_contentMain">
                        <div className="home_page_def_appContentForward"></div>
                        <div className="home_page_def_appContent">
                            <Application />
                        </div>
                    </div>
                </HashRouter>
            </div>
        );
    }
}

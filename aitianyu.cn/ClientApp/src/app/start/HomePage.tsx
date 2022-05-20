/**@format */

import React from "react";
import { IShellProperty, IShellState } from "src/dty/model/IShell";
import { Application } from "../application/Application";
import { Dialog } from "../dialog/Dialog";
import { HorizontalNavigation } from "../navigation/HorizontalNavigation";

import "./main.css";

export class HomePage extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div id="global_home_page" className="home_page_def_homePage">
                <Dialog />
                <div className="home_page_def_navigationBar">
                    <HorizontalNavigation />
                </div>
                <div className="home_page_def_contentMain">
                    <div className="home_page_def_appContentForward"></div>
                    <div className="home_page_def_appContent">
                        <Application />
                    </div>
                </div>
            </div>
        );
    }
}
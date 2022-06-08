/**@format */

import React from "react";
import { Configure, ITriggerData } from "src/dty/core/Configure";
import { IShellProperty, IShellState } from "src/dty/model/IShell";
import { Application } from "../application/Application";
import { Dialog } from "../dialog/Dialog";
import { HorizontalNavigation } from "../navigation/HorizontalNavigation";

import "./main.css";

export class HomePage extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public componentDidMount(): void {
        const config = Configure.generateConfigure();
        config.addTrigger("Horizontal_Navigation_valid", this.naviagtionValidTrigger.bind(this));
    }

    public componentWillUnmount(): void {
        const config = Configure.generateConfigure();
        config.removeTrigger("Horizontal_Navigation_valid");
    }

    public render(): React.ReactNode {
        return (
            <div id="global_home_page" className="home_page_def_homePage">
                <Dialog />
                <div id="horizontalNavigationBar" className="home_page_def_navigationBar">
                    <HorizontalNavigation langPage={false} />
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

    private naviagtionValidTrigger(data: ITriggerData): void {
        const horNaviBar = document.getElementById("horizontalNavigationBar");
        if (!horNaviBar) {
            return;
        }

        if (data.obj === "enable") {
            horNaviBar.style.visibility = "visible";
            return;
        }

        if (data.obj === "disable") {
            horNaviBar.style.visibility = "collapse";
            return;
        }
    }
}

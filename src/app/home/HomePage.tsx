/* eslint-disable @typescript-eslint/no-explicit-any */
/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { Application } from "../application/Application";
import { Dialog } from "../dialog/Dialog";
import { HomeNavigation } from "../navigation/HomeNavigation";

import "./css/main.css";

export class HomePage extends React.Component<IShellProperty, IShellState>{
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div id="global_home_page" className="home_page_def_homePage">
                <Dialog/>
                {/* <div id="global_message_dialog" className="global_message_dialog_bage"><Dialog/></div> */}
                <div className="home_page_def_navigationBar">
                    <HomeNavigation />
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

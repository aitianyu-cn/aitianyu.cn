/**@format */

import React from "react";
import { mobileHome } from "./MobileHome";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { Footer } from "../../app/footer/Footer";

import "./css/main.css";
import { isMobile } from "react-device-detect";

export class Home extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        if (isMobile) {
            return mobileHome();
        }

        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        const aNodes: React.ReactNode[] = [];
        for (let i = 0; i < 5; ++i) aNodes.push(<h1 key={i}>1234567890</h1>);

        return (
            <div className="page_home_main_def_baseGrid">
                <div className="page_home_main_def_content"></div>
                <div className="page_home_main_def_content">{aNodes}</div>
                <div className="page_home_main_def_footer">
                    <Footer />
                </div>
            </div>
        );
    }
}

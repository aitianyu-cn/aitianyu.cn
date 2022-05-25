/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./css/item.base.css";

export interface IHomeAboutItem {
    key: string;
    title: string;
    p1: string;
    p2: string;
}

export class HomeAboutItem extends TYViewComponent {
    private key: string;
    private title: string;
    private p1: string;
    private p2: string;

    public constructor(source: IHomeAboutItem | null) {
        super({});

        this.key = source?.key || "";
        this.title = source?.title || "";
        this.p1 = source?.p1 || "";
        this.p2 = source?.p2 || "";
    }

    public render(): React.ReactNode {
        return (
            <div
                id={this.key}
                className={isMobile ? "item_base_magnet_main_linker_container_mob" : "item_base_magnet_main_linker_container"}>
                <div className="home_project_item_base_magnet_main">
                    <div className="home_project_item_base_magnet_main_title">{this.msgBundle.getI18n(this.title)}</div>
                    <div className="home_project_item_base_magnet_main_body">
                        <p>{this.msgBundle.getI18n(this.p1)}</p>
                        <p>{this.msgBundle.getI18n(this.p2)}</p>
                    </div>
                </div>
            </div>
        );
    }
}

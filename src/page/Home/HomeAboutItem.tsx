/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

import "./css/item.base.css";
import { MsgBundle } from "./MsgBundle";

export interface IHomeAboutItem {
    key: string;
    title: string;
    p1: string;
    p2: string;
}

export class HomeAboutItem extends React.Component<IShellProperty, IShellState> {
    private key: string;
    private title: string;
    private p1: string;
    private p2: string;

    private msgBundle: MsgBundle;

    public constructor(source: IHomeAboutItem | null) {
        super({});

        this.key = source?.key || "";
        this.title = source?.title || "";
        this.p1 = source?.p1 || "";
        this.p2 = source?.p2 || "";

        this.msgBundle = MsgBundle.generateHelper();
    }

    public render(): React.ReactNode {
        return (
            <div
                id={this.key}
                className={isMobile ? "item_base_magnet_main_linker_container_mob" : "item_base_magnet_main_linker_container"}>
                <div className="home_project_item_base_magnet_main">
                    <div className="home_project_item_base_magnet_main_title">{this.msgBundle.getI18nText(this.title)}</div>
                    <div className="home_project_item_base_magnet_main_body">
                        <p>{this.msgBundle.getI18nText(this.p1)}</p>
                        <p>{this.msgBundle.getI18nText(this.p2)}</p>
                    </div>
                </div>
            </div>
        );
    }
}

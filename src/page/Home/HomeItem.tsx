/**@format */

import React from "react";
import { Link } from "react-router-dom";
import { Configure } from "../../dty/common/core/Configure";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";

import "./css/item.base.css";
import { MsgBundle } from "./MsgBundle";

export interface IHomeItemStyle {
    color: string;
}

export interface IHomeItemSource {
    key: string;
    name: string;
    desc: string;
    github: string;
    repo: string;
    style: IHomeItemStyle;
}

export class HomeItem extends React.Component<IShellProperty, IShellState> {
    private key: string;
    private name: string;
    private desc: string;
    private github: string;
    private repo: string;
    private style: IHomeItemStyle;

    private msgBundle: MsgBundle;

    public constructor(source: IHomeItemSource) {
        super({});

        this.key = source.key;
        this.name = source.name;
        this.desc = source.desc;
        this.github = source.github;
        this.repo = source.repo;
        this.style = source.style;

        this.msgBundle = MsgBundle.generateHelper();
    }

    public render(): React.ReactNode {
        const path = `/project/${this.key}`;
        const inlineStyle = {
            backgroundColor: this.style.color,
        };

        return (
            <div key={this.key}>
                <Link to={path} onClick={this.trigNavigation.bind(this)} className="item_base_magnet_main_linker">
                    <div className="item_base_magnet_main_container" style={inlineStyle}>
                        {this.msgBundle.getI18nText(this.name)}
                    </div>
                </Link>
            </div>
        );
    }

    private trigNavigation(): void {
        const config = Configure.generateConfigure();
        config.trig("horizontal_navigation", "project", this);
    }
}

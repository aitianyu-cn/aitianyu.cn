/**@format */

import React from "react";
import { Link } from "react-router-dom";
import { Configure } from "../../dty/common/core/Configure";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { IProject, IProjectStyle } from "../../dty/model/Interfaces";

import "./css/item.base.css";
import { MsgBundle } from "./MsgBundle";

export class HomeItem extends React.Component<IShellProperty, IShellState> {
    private key: string;
    private name: string;
    private desc: string;
    private github: string;
    private repo: string;
    private style: IProjectStyle;

    private msgBundle: MsgBundle;

    public constructor(source: IProject) {
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
        const baseMagnetInlineStyle = {
            backgroundColor: this.style.color,
        };
        const textInlineStyle = {
            color: this.style.fontColor,
        };

        return (
            <div key={this.key} className="item_base_magnet_main_linker_container">
                <Link to={path} onClick={this.triggerNavigation.bind(this)} className="item_base_magnet_main_linker">
                    <div className="item_base_magnet_main_container" style={baseMagnetInlineStyle}>
                        <div style={textInlineStyle}>{this.msgBundle.getI18nText(this.name)}</div>
                    </div>
                </Link>
            </div>
        );
    }

    private triggerNavigation(): void {
        const config = Configure.generateConfigure();
        config.trigger("horizontal_navigation", { obj: "project" }, this);
    }
}

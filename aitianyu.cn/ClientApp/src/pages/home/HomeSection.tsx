/**@format */

import React from "react";
import { Link } from "react-router-dom";
import { Configure } from "src/dty/core/Configure";
import { IProject, IProjectStyle } from "src/dty/model/Interfaces";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./css/section.base.css";

export class HomeSection extends TYViewComponent {
    private key: string;
    private name: string;
    private desc: string;
    private github: string;
    private repo: string;
    private style: IProjectStyle;

    public constructor(source: IProject) {
        super({});

        this.key = source.key;
        this.name = source.name;
        this.desc = source.desc;
        this.github = source.github;
        this.repo = source.repo;
        this.style = source.style;
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
                        <div style={textInlineStyle}>{this.msgBundle.getI18n(this.name)}</div>
                    </div>
                </Link>
            </div>
        );
    }

    private triggerNavigation(): void {
        const config = Configure.generateConfigure();
        config.trigger("Horizontal_Navigation_Listener", { obj: "project" });
    }
}

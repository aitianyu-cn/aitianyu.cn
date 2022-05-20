/**@format */

import React from "react";
import { Configure } from "src/dty/core/Configure";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./css/main.css";

export class Error extends TYViewComponent {
    public constructor(props: IShellProperty) {
        super(props);

        document.title = "404";
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    public componentDidMount() {
        this.triggerNavigation();
    }

    private renderNormal(): React.ReactNode {
        return (
            <div className="error_page_base_container">
                <div className="error_page_base_msg error_page_base_404">{this.msgBundle.getI18n("404_OPS_MSG")}</div>
                <div className="error_page_base_msg error_page_base_error">{this.msgBundle.getI18n("404_DES_MSG")}~</div>
                <div className="error_page_base_msg error_page_base_desc">{this.msgBundle.getI18n("404_OP1_MSG")}</div>
                <div className="error_page_base_msg error_page_base_desc">{this.msgBundle.getI18n("404_OP2_MSG")}</div>
            </div>
        );
    }

    private triggerNavigation(): void {
        const config = Configure.generateConfigure();
        config.trigger("Horizontal_Navigation_Listener", { obj: "error" });
    }
}

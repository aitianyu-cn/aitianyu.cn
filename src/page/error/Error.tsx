/**@format */

import React from "react";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { PageBase } from "../common/PageBase";

import "./css/main.css";
import { MsgBundle } from "./MsgBundle";

export class Error extends PageBase {
    private msgBundle: MsgBundle;

    public constructor(props: IShellProperty) {
        super(props);

        this.msgBundle = MsgBundle.generateHelper();
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        return (
            <div className="error_page_base_container">
                <div className="error_page_base_msg error_page_base_404">{this.msgBundle.getI18nText("404_OPS_MSG")}</div>
                <div className="error_page_base_msg error_page_base_error">{this.msgBundle.getI18nText("404_DES_MSG")}~</div>
                <div className="error_page_base_msg error_page_base_desc">{this.msgBundle.getI18nText("404_OP1_MSG")}</div>
                <div className="error_page_base_msg error_page_base_desc">{this.msgBundle.getI18nText("404_OP2_MSG")}</div>
            </div>
        );
    }
}

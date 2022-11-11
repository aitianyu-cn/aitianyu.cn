/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { Router } from "ts-core/Router";

import "./css/main.css";

const messageBundle = require_msgbundle("error", "app");

export class ErrorPage extends React.Component<IReactProperty, IReactState> {
    public constructor(props: IReactProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        return (
            <div className="error_page_base_container">
                <div className="error_page_base_msg error_page_base_404">
                    {messageBundle.getText(`ERROR_PAGE_INF_${this.props.errorCode || "000"}`)}
                </div>
                <div className="error_page_base_msg error_page_base_error">
                    {messageBundle.getText(`ERROR_PAGE_INF_${this.props.errorCode || "000"}_DES`)}~
                </div>
                <div className="error_page_base_msg error_page_base_desc">
                    {messageBundle.getText(`ERROR_PAGE_INF_${this.props.errorCode || "000"}_OP1`)}
                </div>
                <div className="error_page_base_msg error_page_base_desc">
                    {messageBundle.getText(`ERROR_PAGE_INF_${this.props.errorCode || "000"}_OP2`)}
                </div>
            </div>
        );
    }
}

/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { Router } from "ts-core/Router";

import "./css/main.css";

const messageBundle = require_msgbundle("error", "app");

export class ErrorPage extends React.Component<IReactProperty, IReactState> {
    private hash: string;

    public constructor(props: IReactProperty) {
        super(props);

        this.hash = Router.getHash();
        if (this.hash.startsWith("/")) this.hash = this.hash.substring(1);
        if (this.hash.endsWith("/")) this.hash = this.hash.substring(0, this.hash.length - 1);
        if (!!!this.hash) this.hash = "404";

        document.title = messageBundle.getText(`ERROR_PAGE_TITLE_${this.hash}`);
    }

    public render(): React.ReactNode {
        return this.renderNormal();
    }

    private renderNormal(): React.ReactNode {
        return (
            <div className="error_page_base_container">
                <div className="error_page_base_msg error_page_base_404">
                    {messageBundle.getText(`ERROR_PAGE_INF_${this.hash}`)}
                </div>
                <div className="error_page_base_msg error_page_base_error">
                    {messageBundle.getText(`ERROR_PAGE_INF_${this.hash}_DES`)}~
                </div>
                <div className="error_page_base_msg error_page_base_desc">
                    {messageBundle.getText(`ERROR_PAGE_INF_${this.hash}_OP1`)}
                </div>
                <div className="error_page_base_msg error_page_base_desc">
                    {messageBundle.getText(`ERROR_PAGE_INF_${this.hash}_OP2`)}
                </div>
            </div>
        );
    }
}

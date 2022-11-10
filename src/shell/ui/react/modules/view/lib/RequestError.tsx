/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { isMobile } from "ts-core/RuntimeHelper";

import "../css/request.error.css";

export interface IRequestErrorProperty {}

export class RequestError extends React.Component<IRequestErrorProperty, IReactState> {
    private onRefreshClick: () => void;

    public constructor(props: IRequestErrorProperty) {
        super(props);

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.onRefreshClick = () => {};
    }

    public setRetry(onRetry: () => void): void {
        this.onRefreshClick = onRetry;
    }

    public render(): React.ReactNode {
        const messageBundle = require_msgbundle("view", "modules");
        return (
            <div className="request_error_base">
                <img
                    className={isMobile() ? "request_error_page_img_mob" : "request_error_page_img"}
                    src="assert/anim/refresh.gif"
                    alt={messageBundle.getText("REQUEST_ERROR_PAGE_IMG_ALT")}
                    onClick={this.onRefreshClick}
                />
                <h4 className="request_error_page_text">{messageBundle.getText("REQUEST_ERROR_PAGE_TEXT")}</h4>
            </div>
        );
    }
}

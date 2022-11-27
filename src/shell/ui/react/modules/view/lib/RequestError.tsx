/**@format */

import React from "react";
import { require_msgbundle } from "ts-core/I18n";
import { isMobile } from "ts-core/RuntimeHelper";

import "../css/request.error.css";

const ErrorImgDark = require("./res/error_widget_refresh-dark.gif").default;
const ErrorImgLight = require("./res/error_widget_refresh-light.gif").default;

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
        const themeColor =
            (tianyuShell.core.ui?.theme.custom.theme && tianyuShell.core.ui?.theme.custom.color) ||
            tianyuShell.core.ui?.theme.default.color ||
            "dark";
        return (
            <div className="request_error_base">
                <img
                    className={isMobile ? "request_error_page_img_mob" : "request_error_page_img"}
                    src={themeColor === "dark" ? ErrorImgDark : ErrorImgLight}
                    alt={messageBundle.getText("REQUEST_ERROR_PAGE_IMG_ALT")}
                    onClick={this.onRefreshClick}
                />
                <h4 className="request_error_page_text">{messageBundle.getText("REQUEST_ERROR_PAGE_TEXT")}</h4>
            </div>
        );
    }
}

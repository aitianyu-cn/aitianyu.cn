/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

import "./css/request.error.css";

export class RequestError extends TYViewComponent {
    private onRefreshClick: () => void;

    public constructor(props: IShellProperty) {
        super(props);

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.onRefreshClick = () => {};
    }

    public setRetry(onRetry: () => void): void {
        this.onRefreshClick = onRetry;
    }

    public render(): React.ReactNode {
        return (
            <div className="request_error_base">
                <img
                    className={isMobile ? "request_error_page_img_mob" : "request_error_page_img"}
                    src="assert/anim/refresh.png"
                    alt={this.msgBundle.getI18n("REQUEST_ERROR_PAGE_IMG_ALT")}
                    onClick={this.onRefreshClick}
                />
                <h4 className="request_error_page_text">{this.msgBundle.getI18n("REQUEST_ERROR_PAGE_TEXT")}</h4>
            </div>
        );
    }
}

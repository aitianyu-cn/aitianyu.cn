/**@format */

import React from "react";
import ReactDOM from "react-dom/client";

import { ErrorPage } from "tianyu-shell/app/error/Error.loader";
import { TianyuShellNotInitialException } from "ts-core/ExceptionBase";
import { TIANYU_SHELL_UI_MAJOR_ID } from "ts-core/UI";

export function render(errorCode: string): void {
    const rootNode = document.getElementById(TIANYU_SHELL_UI_MAJOR_ID);
    if (!!!rootNode) {
        throw new TianyuShellNotInitialException("tianyu shell major page is not ready");
    }

    const root = ReactDOM.createRoot(rootNode);
    root.render(<ErrorPage errorCode={errorCode} />);
}

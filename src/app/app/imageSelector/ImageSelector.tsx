/**@format */

import React from "react";
import ReactDOM from "react-dom/client";
import { isMobile } from "ts-core/RuntimeHelper";
import { TIANYU_SHELL_UI_MAJOR_ID } from "ts-core/UI";
import { require_msgbundle } from "ts-core/I18n";

import "./css/mobile.css";
import "./css/desktop.css";
import { TianyuShellNotInitialException } from "ts-core/ExceptionBase";
import { ImageSelector } from "tianyu-shell/app/image/selector/desktop/Selector";

const messageBundle = require_msgbundle("image-selector", "app");

document.title = messageBundle.getText("IMAGE_SELECTOR_TITLE");
const rootNode = document.getElementById(TIANYU_SHELL_UI_MAJOR_ID);

if (rootNode) {
    const root = ReactDOM.createRoot(rootNode);
    if (isMobile) {
        root.render(<div className="main_body">{messageBundle.getText("NOT_SUPPORT_FOR_MOBILE")}</div>);
    } else {
        root.render(<ImageSelector />);
    }
} else {
    throw new TianyuShellNotInitialException("tianyu shell major page is not ready");
}

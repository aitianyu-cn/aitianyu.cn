/**@format */

import { ShellUIElement } from "tianyu-shell/ShellUIElement";
import { IMessageBundle, require_msgbundle } from "ts-core/I18n";
import { isMobile } from "ts-core/RuntimeHelper";
import { CallbackAction } from "ts-core/Types";

import "./css/errorWidget.css";

export class ErrorWidget extends ShellUIElement {
    private errorText: string;
    private onRefresh: CallbackAction | null;

    public constructor(errorText: string, refresh?: CallbackAction) {
        super();

        this.errorText = errorText;
        this.onRefresh = refresh || null;
    }

    public override render(): HTMLElement {
        const messageBundle = require_msgbundle("base", "widget");

        const content = document.createElement("div");
        content.classList.add("error_widget_b");

        const img = this.generateImage(messageBundle);
        const header = this.generateHeader(messageBundle);

        content.appendChild(img);
        content.appendChild(header);

        return content;
    }

    private generateImage(messageBundle: IMessageBundle): HTMLImageElement {
        const themeColor =
            (tianyuShell.core.ui?.theme.custom.theme && tianyuShell.core.ui?.theme.custom.color) ||
            tianyuShell.core.ui?.theme.default.color ||
            "dark";

        const src = this.onRefresh
            ? `static/res/widget/error_widget_refresh-${themeColor}.gif`
            : `static/res/widget/error_widget-${themeColor}.gif`;
        const alt = this.onRefresh
            ? messageBundle.getText("ERROR_WIDGET_REFRESH_IMG_ALT")
            : messageBundle.getText("ERROR_WIDGET_IMG_ALT");

        const img = document.createElement("img");
        const imgClass: string = isMobile() || !!!this.onRefresh ? "error_widget_img_m" : "error_widget_img";
        img.classList.add(imgClass);
        img.src = src;
        img.alt = alt;
        if (this.onRefresh) {
            img.onclick = this.onRefresh;
        }

        return img;
    }

    private generateHeader(messageBundle: IMessageBundle): HTMLHeadingElement {
        const header = document.createElement("h4");
        header.classList.add("error_widget_t");

        const headerText =
            this.errorText || this.onRefresh
                ? messageBundle.getText("ERROR_WIDGET_REFRESH_TEXT")
                : messageBundle.getText("ERROR_WIDGET_TEXT");
        header.textContent = headerText;

        return header;
    }
}

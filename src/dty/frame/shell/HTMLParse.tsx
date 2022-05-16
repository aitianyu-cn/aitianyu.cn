/**@format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { isMobile } from "react-device-detect";
import { Configure } from "../../common/core/Configure";
import { IMessageBundle } from "../../common/model/IMessageBundle";
import { validateJsonButton, validateJsonChild, validateJsonView } from "./HTMLJsonHelper";

import "./res/parse.button.css";

export class HTMLParse {
    private htmlSource: any;
    private msgBundle?: IMessageBundle;

    private dialogButtons: React.ReactNode[];
    private dialogView: React.ReactNode;

    public constructor(dataString: string | any, msgbundle?: IMessageBundle) {
        if (typeof dataString === "string") {
            this.htmlSource = JSON.parse(dataString);
        } else {
            this.htmlSource = dataString;
        }

        this.dialogButtons = [];
        this.dialogView = null;
        this.msgBundle = msgbundle;

        this.processHTMLSource();
    }

    private processHTMLSource(): void {
        if (this.htmlSource["buttons"] && Array.isArray(this.htmlSource["buttons"])) {
            this.processHTMLButtons();
        }

        if (this.htmlSource["view"]) {
            this.processHTMLView();
        }
    }

    private processHTMLButtons(): void {
        for (const buttonItem of this.htmlSource["buttons"]) {
            if (!validateJsonButton(buttonItem)) {
                continue;
            }

            const fuButtonClick = () => {
                buttonItem["clickTrigger"] && this.buttonTrigger(buttonItem["clickTrigger"], buttonItem["clickEvent"]);
            };
            this.dialogButtons.push(
                <div key={buttonItem["id"]} id={buttonItem["id"]} className="html_parse_button_item" onClick={fuButtonClick}>
                    <div className={isMobile ? "html_parse_button_content_mob" : "html_parse_button_content"}>
                        {buttonItem["content"] && this.convertContent(buttonItem["content"])}
                    </div>
                </div>,
            );
        }
    }

    private processHTMLView(): void {
        const itemRoot = this.htmlSource["view"];

        if (!validateJsonView(itemRoot)) {
            return;
        }

        const viewChildren: React.ReactNode[] = [];
        if (itemRoot["children"] && Array.isArray(itemRoot["children"])) {
            for (const viewChild of itemRoot["children"]) {
                const item = this.processHTMLItem(viewChild);
                item && viewChildren.push(item);
            }
        }

        this.dialogView = (
            <div id={itemRoot["id"]} className={itemRoot["class"]}>
                {viewChildren.length !== 0 ? viewChildren : itemRoot["content"] && this.convertContent(itemRoot["content"])}
            </div>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private processHTMLItem(item: any): React.ReactNode | null {
        if (!validateJsonChild(item)) {
            return null;
        }

        const id = item["id"];
        const className = item["class"];
        const type = item["type"];

        const itemChildren: React.ReactNode[] = [];
        if (item["children"] && Array.isArray(item["children"])) {
            for (const viewChild of item["children"]) {
                const item = this.processHTMLItem(viewChild);
                item && itemChildren.push(item);
            }
        }

        if (type === "div") {
            return (
                <div id={id} className={className}>
                    {(item["content"] && this.convertContent(item["content"])) || itemChildren || ""}
                </div>
            );
        } else if (type === "button") {
            const fnClick = () => {
                item["clickTrigger"] && this.buttonTrigger(item["clickTrigger"], item["clickEvent"]);
            };

            return (
                <div id={id} className={className} onClick={fnClick}>
                    {(item["content"] && this.convertContent(item["content"])) || itemChildren}
                </div>
            );
        }

        return <div id={item["id"]} className={item["class"]}></div>;
    }

    private convertContent(sourceText: string): string | null {
        if (!sourceText.match(/I18N=/)) {
            return sourceText;
        }

        const textKey = sourceText.substring(5, sourceText.length);
        return this.msgBundle ? this.msgBundle.getText(textKey) : textKey;
    }

    private buttonTrigger(triggerName: string, triggerValue: string): void {
        const config = Configure.generateConfigure();
        config.trigger(triggerName, { obj: triggerValue });
    }

    public getButtons(): React.ReactNode[] {
        return this.dialogButtons;
    }

    public getView(): React.ReactNode {
        return this.dialogView;
    }
}

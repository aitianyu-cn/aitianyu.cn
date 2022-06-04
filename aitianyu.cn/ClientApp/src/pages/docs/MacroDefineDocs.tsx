/**@format */

import React from "react";
import { IShellProperty } from "src/dty/model/IShell";
import { getLocationPath } from "src/dty/RouterHelper";
import { TYDynamicPage } from "../common/TYDynamicPage";
import { MacroDefineItem } from "./component/MacroDefineItem";

import "./css/docs.macro.define.css";

interface IMacroDefItem {
    macro: string;
    value: string;
    file: string;
}

export class MacroDefineDocs extends TYDynamicPage {
    private macroItems: IMacroDefItem[];

    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: "PROJECT_DOCS_MACRO_TITLE",
            key: `aitianyu_cn_docs_macro`,
            id: getLocationPath(-1),
            remote: `project_docs/macrodefbrowser`,
            cache: true,
            staticCache: false,
        });

        this.macroItems = [];
    }

    protected renderLoaded(): React.ReactNode {
        this.processDatas();
        return (
            <div className="docs_macro_define_base">{this.macroItems.length === 0 ? this.renderEmpty() : this.renderItems()}</div>
        );
    }

    private renderEmpty(): React.ReactNode {
        return (
            <div className="docs_macro_define_empty_title">{this.msgBundle.getI18n("TIANYU_DEV_DOCS_MACRO_DEFINE_NO_ITEM")}</div>
        );
    }

    private renderItems(): React.ReactNode {
        const aRenderItems: React.ReactNode[] = [];

        let index = 0;
        for (const item of this.macroItems) {
            const renderItem = new MacroDefineItem({});

            renderItem.setKey(`aitianyu_cn_docs_macro_item_${index}`);
            renderItem.setData(item.macro, item.value, item.file);

            aRenderItems.push(renderItem.render());

            index = index + 1;
        }

        return (
            <div className="docs_macro_define_items_base">
                <div className="docs_macro_define_items_title">
                    {this.msgBundle.getI18n("TIANYU_DEV_DOCS_MACRO_DEFINE_TITLE")}
                </div>
                <div className="docs_macro_define_items_container">{aRenderItems}</div>
            </div>
        );
    }

    private processDatas(): void {
        const rawData = this.getReceiveData();
        if (!Array.isArray(rawData)) {
            return;
        }

        for (const dataItem of rawData) {
            const macroItem: IMacroDefItem = {
                macro: dataItem["macro"],
                value: dataItem["value"],
                file: dataItem["file"],
            };

            if (macroItem.file && macroItem.macro) {
                this.macroItems.push(macroItem);
            }
        }
    }
}

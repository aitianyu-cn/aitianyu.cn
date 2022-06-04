/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { ITYViewPropCore } from "src/dty/shell/TYViewPropertyCore";

import "./macro.define.item.css";

export class MacroDefineItem extends TYViewComponent {
    private propertyCore: ITYViewPropCore;

    private macro: string;
    private value: string;
    private file: string;

    private hasValue: boolean;

    public constructor(props: IShellProperty) {
        super(props);

        this.propertyCore = {
            key: "",
        };

        this.macro = "";
        this.value = "";
        this.file = "";

        this.hasValue = false;
    }

    public setKey(key: string): void {
        this.propertyCore.key = key;
    }

    public setData(macro: string, value: string, file: string): void {
        this.macro = macro;
        this.value = value;
        this.file = file;

        this.hasValue = !!this.value && this.value !== "-";
    }

    public render(): React.ReactNode {
        return (
            <div key={this.propertyCore.key} className={isMobile ? "macro_define_item_base_mob" : "macro_define_item_base"}>
                {this.renderInternal()}
            </div>
        );
    }

    private renderInternal(): React.ReactNode {
        return (
            <div className="macro_define_item_inner">
                <div className="macro_define_item_def">{this.macro}</div>
                {this.hasValue ? (
                    <div className="macro_define_item_desc">
                        <div className="macro_define_item_desc_value">{this.value}</div>
                        <div className="macro_define_item_desc_file">{this.file}</div>
                        <div className="macro_define_item_desc_i18n">{this.msgBundle.getI18n(this.macro)}</div>
                    </div>
                ) : (
                    <div className="macro_define_item_desc_no_value">
                        <div className="macro_define_item_desc_file">{this.file}</div>
                        <div className="macro_define_item_desc_i18n">{this.msgBundle.getI18n(this.macro)}</div>
                    </div>
                )}
            </div>
        );
    }
}

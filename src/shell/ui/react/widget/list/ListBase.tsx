/**@format */

import React from "react";
import { IListWidgetAPI, IListWidgetProperty, IListWidgetStyle } from "tianyu-shell/common/model/ListWidget.model";
import { guid } from "ts-core/Guid";

interface ListWidgetStyle {
    width: string;
    widthNarrow: string;
    height: string;
    heightNarrow: string;

    borderRadio: string;
    borderColor: string;
    background: string;

    itemFontSize: string;
    itemHeight: string;
    itemColor: string;
    itemSelectedColor: string;
    itemBorder: string;
    itemBorderColor: string;
}

export class ListBase extends React.Component<IListWidgetProperty, IReactState> implements IListWidgetAPI {
    protected selectedValue: string;
    protected instanceId: string;
    protected cacheable: boolean;
    protected keys: string[];
    protected style: ListWidgetStyle;

    protected listRef: React.RefObject<HTMLDivElement>;

    public constructor(props: IListWidgetProperty) {
        super(props);

        this.cacheable = !!props.id;
        this.instanceId = props.id || guid();
        this.keys = Object.keys(props.source);
        this.selectedValue = props.defaultValue || this.keys[0] || "";
        this.style = ListBase._processStyle(props.style);

        this.listRef = React.createRef();
    }

    // **********************************************
    // ISingleListViewAPI
    // **********************************************
    getSelection(): string {
        return this.selectedValue;
    }
    getSelections(): string[] {
        return [this.selectedValue];
    }

    private static _processStyle(style?: IListWidgetStyle): ListWidgetStyle {
        const newStyle: ListWidgetStyle = {
            width: style?.width || "100%",
            widthNarrow: style?.widthNarrow || "100%",
            height: style?.height || "100%",
            heightNarrow: style?.heightNarrow || "100%",

            borderRadio: style?.borderRadio || "15px",
            borderColor: style?.borderColor || "var(--ts_ui_blk_5)",
            background: style?.background || "#ffffff00",

            itemFontSize: style?.itemFontSize || "18px",
            itemHeight: style?.itemHeight || "25px",
            itemColor: style?.itemColor || "#ffffff00",
            itemSelectedColor: style?.itemSelectedColor || "var(--ts_ui_blk_4)",
            itemBorder: style?.itemBorder || "0",
            itemBorderColor: style?.itemBorderColor || "var(--ts_ui_blk_5)",
        };

        return newStyle;
    }
}

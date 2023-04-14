/**@format */

import { CallbackActionT, MapOfString } from "ts-core/Types";

export interface IListWidgetProperty {
    id?: string;
    defaultValue?: string;
    source: MapOfString;
    style?: IListWidgetStyle;
    onValueChanged: CallbackActionT<string>;
}

export interface IListWidgetAPI {
    getSelection(): string;
    getSelections(): string[];
}

export interface IListWidgetStyle {
    width?: string;
    widthNarrow?: string;
    height?: string;
    heightNarrow?: string;

    borderRadio?: string;
    borderColor?: string;
    background?: string;

    itemFontSize?: string;
    itemHeight?: string;
    itemColor?: string;
    itemSelectedColor?: string;
    itemBorder?: string;
    itemBorderColor?: string;
}

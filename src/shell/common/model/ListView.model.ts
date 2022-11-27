/**@format */

import { CallbackActionT, MapOfType } from "ts-core/Types";

export interface IListViewSource {
    title: MapOfType<number>;
    data: MapOfType<string>[];
}

export interface IListViewStyle {
    display?: "table" | "block";
}

export interface IListViewPropertyBase {
    hideTitle?: boolean;
    selectable?: boolean;
    onSelect?: CallbackActionT<number>;
}

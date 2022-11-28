/**@format */

import { CallbackActionT, MapOfString } from "ts-core/Types";

export interface IListWidgetProperty {
    id?: string;
    defaultValue?: string;
    source: MapOfString;
    onValueChanged: CallbackActionT<string>;
}

export interface IListWidgetAPI {
    getSelection(): string;
    getSelections(): string[];
}

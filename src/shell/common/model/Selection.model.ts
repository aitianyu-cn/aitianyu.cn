/**@format */

import { CallbackAction } from "ts-core/Types";

export interface ISingleSelector {
    select(): boolean;
    leave(): void;
}

export interface ISingleSelectorGroup {
    join(unselectTrigger: CallbackAction, name?: string): ISingleSelector;
}

export interface ISingleSelectorController extends ISingleSelectorGroup {
    selectedItem(): string;
}

export interface IMultiSelectorGroup {}

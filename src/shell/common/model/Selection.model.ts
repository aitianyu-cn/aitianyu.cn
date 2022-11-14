/**@format */

import { CallbackAction, CallbackActionT } from "ts-core/Types";

// ##########################################################################
// Single selector
// single lay selector
// ##########################################################################

export interface ISingleSelector {
    select(): boolean;
    leave(): void;
}

export interface ISingleSelectorGroup {
    join(unselectTrigger: CallbackAction, name?: string): ISingleSelector;
}

export interface ISingleSelectorController extends ISingleSelectorGroup {
    selectedItem(): string;
    setSelected(name: string): void;
}

// ##########################################################################
// Multiple selector
// single lay selector
// ##########################################################################

export type MultiSelectorMode = "multi" | "single" | "single-switch";

export interface IMutliSelector {
    select(): boolean;
    unselect(): boolean;
    isSelected(): boolean;
    isDisabled(): boolean;
}

export interface IMultiSelectorEntity {
    unselect: CallbackAction;
    disable: CallbackActionT<boolean>;
}

export interface IMultiSelectorGroup {
    join(name: string, entity: IMultiSelectorEntity): IMutliSelector;
}

export interface IMultiSelectorControllerProperty {
    default: string;
    mode: MultiSelectorMode;
    selectionChanged?: CallbackActionT<string>;
}

export interface IMultiSelectorController extends IMultiSelectorGroup {
    selectedItems(): string[];
}

// ##########################################################################
// Hierarchy selector
// multi-lays complex selector
// ##########################################################################

/**
 * mulitple - multi-selection mode, allow user select multiple items
 * single   - single selection mode, allow user select only one item
 * link     - link selection mode, as same as hyperlink
 */
export type HierarchySelectorMode = "multiple" | "single" | "link";

export interface IHierarchySelectorGroup {}

/**@format */

import { ISingleSelector, ISingleSelectorController } from "tianyu-shell/common/model/Selection.model";
import { TianyuShellMultipleInstanceException } from "ts-core/ExceptionBase";
import { guid } from "ts-core/Guid";
import { CallbackAction, MapOfType } from "ts-core/Types";

interface ISingleSelectorItemController {
    select(selectorId: string): boolean;
    leave(selectorId: string): void;
}

class SingleSelector implements ISingleSelector {
    private id: string;
    private group: ISingleSelectorItemController;

    public constructor(id: string, group: ISingleSelectorItemController) {
        this.id = id;
        this.group = group;
    }

    select(): boolean {
        return this.group.select(this.id);
    }
    leave(): void {
        this.group.leave(this.id);
    }
}

interface ISingleSelectorControllerSelectorMap {
    selector: ISingleSelector;
    unselectTriggler: CallbackAction;
}

class SingleSelectorController implements ISingleSelectorController, ISingleSelectorItemController {
    private selectors: MapOfType<ISingleSelectorControllerSelectorMap>;

    private onSelectionChanged?: (id: string, select: boolean) => void;
    private onSelection: number;
    private currentSelection: string;

    public constructor(defaultSelection: string, selectionChanged?: (id: string, select: boolean) => void) {
        this.selectors = {};
        this.onSelection = -1;

        this.currentSelection = defaultSelection;
        this.onSelectionChanged = selectionChanged;
    }

    join(unselectTrigger: CallbackAction, name?: string): ISingleSelector {
        const selectorId = name || guid();
        if (this.selectors[selectorId]) {
            throw new TianyuShellMultipleInstanceException(`Single Selector Controller: duplicated selector - ${selectorId}`);
        }

        const selector = new SingleSelector(selectorId, this);
        this.selectors[selectorId] = {
            selector: selector,
            unselectTriggler: unselectTrigger,
        };

        return selector;
    }

    setSelected(id: string): void {
        if (this.currentSelection !== id) {
            this.currentSelection = id;
        }
    }

    selectedItem(): string {
        return this.currentSelection;
    }

    select(selectorId: string): boolean {
        if (this.onSelection !== -1 || !!!this.selectors[selectorId] || selectorId === this.currentSelection) {
            return false;
        }

        this.onSelection = window.setTimeout(() => {
            this.unselectOthers(selectorId);
        }, 0);

        this.currentSelection = selectorId;
        this.onSelectionChanged?.(selectorId, true);

        return true;
    }

    leave(selectorId: string): void {
        if (this.onSelection !== -1 || !!!this.selectors[selectorId]) {
            return;
        }

        delete this.selectors[selectorId];
        if (this.currentSelection === selectorId) {
            this.currentSelection = "";
            this.onSelectionChanged?.(selectorId, false);
        }
    }

    private unselectOthers(selectorId: string): void {
        for (const id of Object.keys(this.selectors)) {
            if (id === selectorId) {
                continue;
            }
            const selector = this.selectors[id];
            selector.unselectTriggler();
        }

        this.onSelection = -1;
    }
}

export function createSingleSelectorGroup(
    defaultSelection: string,
    selectionChanged?: (id: string, select: boolean) => void,
): ISingleSelectorController {
    return new SingleSelectorController(defaultSelection, selectionChanged);
}

/**@format */

import {
    IMultiSelectorController,
    IMultiSelectorControllerProperty,
    IMultiSelectorEntity,
    IMultiSelectorGroup,
    IMutliSelector,
} from "tianyu-shell/common/model/Selection.model";
import { EmptyArgumentException, TianyuShellMultipleInstanceException } from "ts-core/ExceptionBase";
import { CallbackActionT, MapOfType } from "ts-core/Types";

interface IMultiSelectorItemController {
    select(selectorId: string): boolean;
    unselect(selectorId: string): boolean;
    isSelected(selectorId: string): boolean;
    isDisabled(selectorId: string): boolean;
}

class MultiSelector implements IMutliSelector {
    private id: string;
    private group: IMultiSelectorItemController;

    public constructor(id: string, group: IMultiSelectorItemController) {
        this.id = id;
        this.group = group;
    }

    select(): boolean {
        return this.group.select(this.id);
    }
    unselect(): boolean {
        return this.group.unselect(this.id);
    }
    isSelected(): boolean {
        return this.group.isSelected(this.id);
    }
    isDisabled(): boolean {
        return this.group.isDisabled(this.id);
    }
}

interface IMultiSelectorControllerMap {
    selector: IMutliSelector;
    entity: IMultiSelectorEntity;
}

class MultiSelectorController implements IMultiSelectorController, IMultiSelectorItemController {
    private props: IMultiSelectorControllerProperty;

    private selectors: MapOfType<IMultiSelectorControllerMap>;
    private onSelection: number;
    private currentSelection: string;

    public constructor(props: IMultiSelectorControllerProperty) {
        this.props = props;

        this.selectors = {};
        this.onSelection = -1;
        this.currentSelection = props.default;
    }

    join(name: string, entity: IMultiSelectorEntity): IMutliSelector {
        if (!!!name) {
            throw new EmptyArgumentException("Multiple Selector Controller: empty join selector");
        }
        if (this.selectors[name]) {
            throw new TianyuShellMultipleInstanceException(`Multiple Selector Controller: duplicated selector - ${name}`);
        }

        const selector = new MultiSelector(name, this);
        this.selectors[name] = {
            selector: selector,
            entity: entity,
        };

        return selector;
    }
    selectedItems(): string[] {
        return [];
    }

    select(selectorId: string): boolean {
        if (this.onSelection !== -1 || !!!this.selectors[selectorId] || selectorId === this.currentSelection) {
            return false;
        }

        // if (this.props.mode === "single-switch") {
        //     this.onSelection = window.setTimeout(() => {
        //         this.unselecteOthers(selectorId);
        //     }, 0);
        // } else if (this.props.mode === "single")

        // this.currentSelection = selectorId;
        // this.props.selectionChanged?.(selectorId);

        return true;
    }
    unselect(selectorId: string): boolean {
        if (this.onSelection !== -1 || !!!this.selectors[selectorId] || selectorId === this.currentSelection) {
            return false;
        }

        // if (this.props.mode === "single-switch") {
        //     this.onSelection = window.setTimeout(() => {
        //         this.unselecteOthers(selectorId);
        //     }, 0);
        // } else if (this.props.mode === "single")

        // this.currentSelection = selectorId;
        // this.props.selectionChanged?.(selectorId);

        return true;
    }
    isSelected(selectorId: string): boolean {
        return false;
    }
    isDisabled(selectorId: string): boolean {
        return false;
    }

    private unselecteOthers(selectorId: string): void {
        //
    }
}

export function createMultiSelectorGroup(): void {
    // IMultiSelectorGroup
}

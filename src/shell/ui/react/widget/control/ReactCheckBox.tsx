/**@format */

import React from "react";
import { IMultiSelectorEntity, IMultiSelectorGroup, IMutliSelector } from "tianyu-shell/common/model/Selection.model";
import { isMobile } from "ts-core/RuntimeHelper";

export interface IReactCheckBoxProperty extends IReactControlProperty {
    group: IMultiSelectorGroup;
    id: string;
    value: string;
}

export class ReactCheckBox extends React.Component<IReactCheckBoxProperty, IReactState> implements IMultiSelectorEntity {
    private selector: IMutliSelector;
    private disabled: boolean;
    private selected: boolean;

    public constructor(props: IReactCheckBoxProperty) {
        super(props);

        this.selector = props.group.join(props.id, this);

        this.disabled = this.selector.isDisabled();
        this.selected = this.selector.isSelected();
    }

    public override render(): React.ReactNode {
        return <div></div>;
    }

    private onSelect(): void {
        if (this.selected) {
            return;
        }

        if (this.selector.select()) {
            this.selected = true;
        }
    }

    unselect(): void {
        if (!this.selected) {
            return;
        }

        this.selected = false;
        this.forceUpdate();
    }
    disable(state: boolean): void {
        if (state === this.disabled) {
            return;
        }

        this.disabled = state;
        this.forceUpdate();
    }
}

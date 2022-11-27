/**@format */

import React from "react";
import { ISingleSelector, ISingleSelectorGroup } from "tianyu-shell/common/model/Selection.model";
import { isMobile } from "ts-core/RuntimeHelper";

export interface IReactRadioButtonProperty extends IReactControlProperty {
    group: ISingleSelectorGroup;
    id: string;
    value: string;
    selected?: boolean;
    size?: number;
    color?: string;
    selectedColor?: string;
    border?: string;
    insideMargin?: number | string;
}

export class ReactRadioButton extends React.Component<IReactRadioButtonProperty, IReactState> {
    private selector: ISingleSelector;
    private isLoaded: boolean;
    private isSelected: boolean;

    private isWorking: boolean;
    private opacity: number;

    public constructor(props: IReactRadioButtonProperty) {
        super(props);

        this.isSelected = !!props.selected;
        this.isLoaded = false;
        this.selector = props.group.join(this.onUnselect.bind(this), this.props.id);

        this.isWorking = false;
        this.opacity = this.isSelected ? 100 : 0;
    }

    public override componentDidMount(): void {
        this.isLoaded = true;
    }

    public override componentWillUnmount(): void {
        this.isLoaded = false;
        this.selector.leave();
    }

    public override forceUpdate(callback?: (() => void) | undefined): void {
        if (this.isLoaded) {
            super.forceUpdate(callback);
        }
    }

    public override render(): React.ReactNode {
        const size = this.props.size || 16;
        const selectSize = size / 2;

        const radioBaseStyle = {
            display: "flex",
        };
        const radioContainerStyle = {
            marginTop: "auto",
            marginBottom: "auto",
            width: size,
            height: size,
            borderRadius: size,
            border: this.props.border || "1px var(--ts_ui_blk_7) solid",
            backgroundColor: this.props.color || "#ffffff00",
        };
        const radioButtonStyle = {
            width: selectSize,
            height: selectSize,
            borderRadius: selectSize,
            margin: (size - selectSize) / 2,
            opacity: `${this.opacity}%`,
            backgroundColor: this.props.selectedColor || "var(--ts_ui_blk_2)",
        };
        const radioTextStyle = {
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: this.props.insideMargin || 10,
            userSelect: "none" as any,
        };
        return (
            <div style={radioBaseStyle} onClick={isMobile ? this.onSelect.bind(this) : undefined}>
                <div style={radioContainerStyle} onClick={isMobile ? undefined : this.onSelect.bind(this)}>
                    <div style={radioButtonStyle} />
                </div>
                <div style={radioTextStyle}>{this.props.value}</div>
            </div>
        );
    }

    private onUnselect(): void {
        if (this.isWorking) {
            return;
        }

        if (this.isSelected) {
            this.isWorking = true;
            this.isSelected = false;

            this.selectionChangeAnimation(false);
        }
    }
    private onSelect(): void {
        if (this.isWorking) {
            return;
        }

        if (this.isSelected) {
            return;
        }

        if (this.selector.select()) {
            this.isWorking = true;
            this.isSelected = true;

            this.selectionChangeAnimation(true);
        }
    }

    private selectionChangeAnimation(direct: boolean): void {
        if (direct) {
            // unselect -> select
            if (this.opacity >= 100) {
                this.isWorking = false;
            } else {
                this.opacity += 3;
                this.forceUpdate();
                window.setTimeout(() => {
                    this.selectionChangeAnimation(true);
                }, 1);
            }
        } else {
            if (this.opacity <= 0) {
                this.isWorking = false;
            } else {
                this.opacity -= 3;
                this.forceUpdate();
                window.setTimeout(() => {
                    this.selectionChangeAnimation(false);
                }, 1);
            }
        }
    }
}

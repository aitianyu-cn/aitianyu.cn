/**@format */

import React from "react";
import { CacheController } from "tianyu-app/home/DependencyLoader";
import { IListWidgetProperty } from "tianyu-shell/common/model/ListWidget.model";
import { isMobile } from "ts-core/RuntimeHelper";
import { ListBase } from "./ListBase";

import DROPDOWN_ICON from "./res/dropdown.svg";

export class SingleList extends ListBase {
    private expand: boolean;

    public constructor(props: IListWidgetProperty) {
        super(props);

        this.expand = false;
    }

    public override componentDidMount(): void {
        this.updateListStatus();
    }

    public override componentDidUpdate(
        _prevProps: Readonly<IListWidgetProperty>,
        _prevState: Readonly<IReactState>,
        _snapshot?: any,
    ): void {
        this.updateListStatus();
    }

    public override render(): React.ReactNode {
        return isMobile ? this.renderForNarrow() : this.renderForNormal();
    }

    private renderForNarrow(): React.ReactNode {
        return this.expand ? this.renderForNarrow_Expand() : this.renderForNarrow_Unexpand();
    }

    private renderForNarrow_Expand(): React.ReactNode {
        return <div></div>;
    }

    private renderForNarrow_Unexpand(): React.ReactNode {
        return (
            <div>
                <div>{this.props.source[this.selectedValue]}</div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: DROPDOWN_ICON }} />
                </div>
            </div>
        );
    }

    private narrow_onExpand(): void {
        this.expand = !this.expand;
        this.forceUpdate();
    }

    private onNarrowHover(): void {
        //
    }

    private renderForNormal(): React.ReactNode {
        const memberStyle: React.CSSProperties = {
            width: "100%",
            padding: "5px",
            borderWidth: "0 0 1px 0",
            borderStyle: "solid",
            userSelect: "none",
        };
        const members: React.ReactNode[] = [];
        for (const sourceMemberKey of Object.keys(this.props.source)) {
            const sourceMemberValue = this.props.source[sourceMemberKey];
            const memberItem = (
                <div
                    key={sourceMemberKey}
                    onClick={() => {
                        this.onClick(sourceMemberKey);
                    }}
                    style={memberStyle}>
                    {sourceMemberValue}
                </div>
            );
            members.push(memberItem);
        }

        const listStyle: React.CSSProperties = {};
        return (
            <div style={listStyle} ref={this.listRef}>
                {members}
            </div>
        );
    }

    private onClick(value: string): void {
        if (!!!value || value === this.selectedValue) {
            return;
        }

        if (this.cacheable) {
            const listId = `REACT_WIDGET_LIST_SINGLE_${this.instanceId}`;
            CacheController.cache(listId, { scrollTop: this.listRef.current?.scrollTop || -1 });
        }

        if (isMobile) {
            this.expand = false;
            this.forceUpdate();
        }

        this.props.onValueChanged(value);
    }

    private updateListStatus(): void {
        if (this.cacheable) {
            const listId = `REACT_WIDGET_LIST_SINGLE_${this.instanceId}`;
            const cache = CacheController.get(listId);

            const scrollTop = cache?.scrollTop;
            if (typeof scrollTop === "number" && -1 !== scrollTop && this.listRef.current) {
                this.listRef.current.scrollTop = scrollTop;
            }
        }
    }
}

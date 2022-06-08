/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { IShellProperty } from "src/dty/model/IShell";
import { TYDynamicPage } from "src/pages/common/TYDynamicPage";
import { getArchDocsRemote } from "../../APIDocsHelper";

import "./docs.comp.arch.selector.css";

interface IArchitectureTotal {
    row: number;
    col: number;
}

interface IArchitectureItem extends IArchitectureTotal {
    rowSpan?: number;
    colSpan?: number;
    borderRadiusTopLeft?: boolean;
    borderRadiusTopRigth?: boolean;
    borderRadiusBottomLeft?: boolean;
    borderRadiusBottomRigth?: boolean;
    backgroundColor?: string;
}

interface IArchitectureItems {
    [key: string]: IArchitectureItem;
}

interface IArchitecture {
    total: IArchitectureTotal;
    items: IArchitectureItems;
}

export class ArchitectureSelector extends TYDynamicPage {
    private archSource: IArchitecture | null;

    public constructor(props: IShellProperty) {
        super({
            ...props,
            title: `PROJECT_DOCS_ARCH_SELECTOR_${getArchDocsRemote().replace("-", "_").toUpperCase()}_TITLE`,
            key: `aitianyu_cn_docs_arch`,
            id: `${getArchDocsRemote()}/arch.json`,
            remote: `/resources/arch`,
        });

        this.archSource = null;
    }
    protected renderLoaded(): React.ReactNode {
        return <div className="docs_comp_arch_selector_items_internal">{this.renderInternal()}</div>;
    }
    protected override loadDataSuccess(): void {
        try {
            this.archSource = this.getReceiveData() as IArchitecture;
        } catch {
            this.archSource = null;
        }
    }

    private renderInternal(): React.ReactNode {
        if (!this.archSource || Object.keys(this.archSource.items).length === 0) {
            return this.renderEmpty();
        }

        return this.renderNormal();
    }
    private renderNormal(): React.ReactNode {
        const total: IArchitectureTotal = this.archSource?.total || {
            row: 0,
            col: 0,
        };

        const items = Object.keys(this.archSource?.items || {});
        const renderItems: React.ReactNode[] = [];
        for (const item of items) {
            const itemText = this.getItemText(item);
            const fnClick = () => {
                this.onItemClick(item);
            };
            const oStyle = this.generateItemStyle(total, this.archSource?.items[item]);

            renderItems.push(
                <div
                    id={item}
                    key={item}
                    onClick={fnClick}
                    style={oStyle}
                    className={
                        isMobile ? "docs_comp_arch_selector_item_items_normal_mob" : "docs_comp_arch_selector_item_items_normal"
                    }>
                    {itemText}
                </div>,
            );
        }

        return <div className="docs_comp_arch_selector_items_grid">{renderItems}</div>;
    }

    private renderEmpty(): React.ReactNode {
        return <h2>{this.msgBundle.getI18n("TIANYU_DEV_DOCS_ARCH_EMPTY")}</h2>;
    }

    private getItemText(itemT: string): string {
        const translateItem = `TIANYU_DEV_DOCS_ARCH_${getArchDocsRemote().toUpperCase()}_${itemT.toUpperCase()}`;

        return this.msgBundle.getI18n(translateItem.replace("-", "_"));
    }

    private onItemClick(itemKey: string): void {
        window.location.hash = `#${itemKey}`;
    }

    private generateItemStyle(total: IArchitectureTotal, itemData?: IArchitectureItem): React.CSSProperties {
        const oStyle: React.CSSProperties = {};

        if (itemData) {
            if (itemData.rowSpan) {
                oStyle.gridRowStart = itemData.row;
                oStyle.gridRowEnd = itemData.row + itemData.rowSpan;
            } else {
                oStyle.gridRow = itemData.row;
                oStyle.gridRowEnd = itemData.row + 1;
            }

            if (itemData.col === 0 || itemData.colSpan) {
                oStyle.gridColumnStart = itemData.col || 1;
                oStyle.gridColumnEnd = itemData.col === 0 ? 1 + total.col : itemData.col + (itemData.colSpan || 0);
            } else {
                oStyle.gridColumn = itemData.col;
            }

            if (itemData.backgroundColor) {
                oStyle.backgroundColor = itemData.backgroundColor;
            }

            if (itemData.borderRadiusTopLeft) {
                oStyle.borderTopLeftRadius = "15px";
            }

            if (itemData.borderRadiusTopRigth) {
                oStyle.borderTopRightRadius = "15px";
            }

            if (itemData.borderRadiusBottomLeft) {
                oStyle.borderBottomLeftRadius = "15px";
            }

            if (itemData.borderRadiusBottomRigth) {
                oStyle.borderBottomRightRadius = "15px";
            }
        }

        return oStyle;
    }
}

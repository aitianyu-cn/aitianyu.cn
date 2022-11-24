/**@format */

import React from "react";
import { IBlockChart, IBlockRegionChart } from "tianyu-shell/common/model/Chart.model";
import { CallbackActionT, MapOfType } from "ts-core/Types";

export interface IBlockRegionChartProperty {
    total: IBlockChart;
    source: MapOfType<IBlockRegionChart>;
    onSelected: CallbackActionT<string>;
}

export class BlockRegionChart extends React.Component<IBlockRegionChartProperty, IReactState> {
    public constructor(props: IBlockRegionChartProperty) {
        super(props);
    }

    public override render(): React.ReactNode {
        const keys = Object.keys(this.props.source);
        if (keys.length === 0) {
            return <div></div>;
        }

        const items: React.ReactNode[] = [];
        for (const key of keys) {
            const item = new BlockRegionChartItem({
                key: key,
                container: this.props.total,
                data: this.props.source[key],
                onSelected: this.props.onSelected,
            });

            items.push(item.render());
        }

        return <div>{items}</div>;
    }
}

interface IBlockRegionChartItemProperty {
    key: string;
    container: IBlockChart;
    data: IBlockRegionChart;
    onSelected: CallbackActionT<string>;
}

class BlockRegionChartItem extends React.Component<IBlockRegionChartItemProperty, IReactState> {
    public constructor(props: IBlockRegionChartItemProperty) {
        super(props);
    }

    public override render(): React.ReactNode {
        return (
            <div
                key={this.props.key}
                onClick={() => {
                    this.props.onSelected(this.props.key);
                }}
                style={this.generateItemStyle()}>
                {this.props.data.i18n}
            </div>
        );
    }

    private generateItemStyle(): React.CSSProperties {
        const oStyle: React.CSSProperties = {};

        const total = this.props.container;
        const itemData = this.props.data;
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

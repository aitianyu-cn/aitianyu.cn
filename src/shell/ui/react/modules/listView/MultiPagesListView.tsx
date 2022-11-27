/**@format */

import React from "react";
import { IListViewPropertyBase, IListViewSource } from "tianyu-shell/common/model/ListView.model";

export interface IMultiPagesListViewProperty extends IListViewPropertyBase {
    start: number;
    size: number;
    onLoadPage: (size: number, start: number) => Promise<IListViewSource>;
}

export class MultiPagesListView extends React.Component<IMultiPagesListViewProperty, IReactState> {}

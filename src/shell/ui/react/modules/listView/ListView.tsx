/**@format */

import React from "react";
import { IListViewPropertyBase, IListViewSource } from "tianyu-shell/common/model/ListView.model";

export interface IListViewProperty extends IListViewPropertyBase {
    source: IListViewSource;
}

export class ListView extends React.Component<IListViewProperty, IReactState> {}

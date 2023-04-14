/**@format */

import React from "react";
import { IListViewPropertyBase, IListViewSource } from "tianyu-shell/common/model/ListView.model";

export interface ISinglePageListViewProperty extends IListViewPropertyBase {
    source: IListViewSource;
}

export class SinglePageListView extends React.Component<ISinglePageListViewProperty, IReactState> {}

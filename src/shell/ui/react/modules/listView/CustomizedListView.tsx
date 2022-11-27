/**@format */

import React from "react";
import { IListViewSource } from "tianyu-shell/common/model/ListView.model";

export interface ICustomizedListViewProperty {
    source: IListViewSource;
}

export class CustomizedListView extends React.Component<ICustomizedListViewProperty, IReactState> {}

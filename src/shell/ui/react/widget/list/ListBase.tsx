/**@format */

import React from "react";
import { IListWidgetAPI, IListWidgetProperty } from "tianyu-shell/common/model/ListWidget.model";
import { guid } from "ts-core/Guid";

export class ListBase extends React.Component<IListWidgetProperty, IReactState> implements IListWidgetAPI {
    protected selectedValue: string;
    protected instanceId: string;
    protected cacheable: boolean;

    protected listRef: React.RefObject<HTMLDivElement>;

    public constructor(props: IListWidgetProperty) {
        super(props);

        this.cacheable = !!props.id;
        this.instanceId = props.id || guid();
        this.selectedValue = props.defaultValue || "";

        this.listRef = React.createRef();
    }

    // **********************************************
    // ISingleListViewAPI
    // **********************************************
    getSelection(): string {
        return this.selectedValue;
    }
    getSelections(): string[] {
        return [this.selectedValue];
    }
}

/**@format */

import React from "react";
import { guid } from "ts-core/Guid";
import { isMobile } from "ts-core/RuntimeHelper";
import { CallbackActionT, MapOfString } from "ts-core/Types";

export interface ISingleListViewProperty {
    id?: string;
    defaultValue?: string;
    source: MapOfString;
    onValueChanged: CallbackActionT<string>;
}

export interface ISingleListViewAPI {
    getSelection(): string;
    getSelections(): string[];
}

export class SingleListView extends React.Component<ISingleListViewProperty, IReactState> implements ISingleListViewAPI {
    private selectedVaue: string;
    private instanceId: string;

    public constructor(props: ISingleListViewProperty) {
        super(props);

        this.instanceId = props.id || guid();
        this.selectedVaue = props.defaultValue || "";
    }

    public override render(): React.ReactNode {
        return isMobile() ? this.renderForMobile() : this.renderForNormal();
    }

    private renderForMobile(): React.ReactNode {
        return <div></div>;
    }

    private renderForNormal(): React.ReactNode {
        return <div></div>;
    }

    // **********************************************
    // ISingleListViewAPI
    // **********************************************
    getSelection(): string {
        return this.selectedVaue;
    }
    getSelections(): string[] {
        return [this.selectedVaue];
    }
}

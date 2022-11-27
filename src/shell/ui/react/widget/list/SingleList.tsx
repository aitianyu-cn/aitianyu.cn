/**@format */

import React from "react";
import { guid } from "ts-core/Guid";
import { isMobile } from "ts-core/RuntimeHelper";
import { CallbackActionT, MapOfString } from "ts-core/Types";

export interface ISingleListProperty {
    id?: string;
    defaultValue?: string;
    source: MapOfString;
    onValueChanged: CallbackActionT<string>;
}

export interface ISingleListAPI {
    getSelection(): string;
    getSelections(): string[];
}

export class SingleList extends React.Component<ISingleListProperty, IReactState> implements ISingleListAPI {
    private selectedVaue: string;
    private instanceId: string;

    public constructor(props: ISingleListProperty) {
        super(props);

        this.instanceId = props.id || guid();
        this.selectedVaue = props.defaultValue || "";
    }

    public override render(): React.ReactNode {
        return isMobile ? this.renderForMobile() : this.renderForNormal();
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

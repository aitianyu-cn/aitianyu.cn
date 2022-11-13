/**@format */

import React from "react";
import { ICheckBoxSource } from "tianyu-shell/common/model/CheckBoxSource.model";

export interface IReactCheckBoxProperty extends IReactControlProperty {
    source: ICheckBoxSource;
    multiSelection?: boolean;
}

export class ReactCheckBox extends React.Component<IReactCheckBoxProperty, IReactState> {
    public constructor(props: IReactCheckBoxProperty) {
        super(props);
    }

    public override render(): React.ReactNode {
        return <div></div>;
    }
}

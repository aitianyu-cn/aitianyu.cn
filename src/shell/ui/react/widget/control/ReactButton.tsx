/**@format */

import React from "react";

export interface IReactButtonProperty extends IReactControlProperty {}

export class ReactButton extends React.Component<IReactButtonProperty, IReactState> {
    public constructor(props: IReactButtonProperty) {
        super(props);
    }

    public override render(): React.ReactNode {
        return <div></div>;
    }
}

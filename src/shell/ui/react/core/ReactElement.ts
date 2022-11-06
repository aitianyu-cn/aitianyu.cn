/**@format */

import React from "react";

export class ReactElement extends React.Component<IReactProperty, IReactState> {
    public constructor(props?: IReactProperty) {
        super(props || {});
    }
}

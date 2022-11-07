/**@format */

import React from "react";

export class ReactElement<T> extends React.Component<IReactProperty | T, IReactState> {
    public constructor(props?: IReactProperty | T) {
        super(props || {});
    }
}

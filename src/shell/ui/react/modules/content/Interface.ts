/**@format */

import React, { CSSProperties } from "react";
import { MapOfType } from "ts-core/Types";

export interface IReactContentComponent {}

export class ReactContentComponent extends React.Component<IReactContentComponent, IReactState> {}

export type ReactContentRouterParamGenerater = () => IReactContentComponent;

export interface IReactContentRouter {
    component: typeof React.Component;
    paramGenerater: ReactContentRouterParamGenerater;

    /**
     * This flag means that when the hash is not change
     * whether needs to re-render the view always
     */
    forceUpdate: boolean;
}

export interface IReactContentProperty {
    default: string;
    router: MapOfType<IReactContentRouter>;
    fallback?: IReactContentRouter;
    style: CSSProperties;
}

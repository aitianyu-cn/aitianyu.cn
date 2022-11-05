/**@format */

import { CallbackAction } from "ts-core/Types";

export interface INavigationRouter {
    [prefix: string]: string;
}

export interface INavigationOption {
    autosize: boolean;
    sizeChanged: CallbackAction;
    router?: INavigationRouter;
}

/**@format */

import { ILoginPostResult } from "./Login.model";

export interface IRetrievePost {
    email: string;
}

export interface IRetrievePostResult extends ILoginPostResult {}

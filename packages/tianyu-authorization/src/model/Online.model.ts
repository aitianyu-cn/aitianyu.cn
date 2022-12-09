/**@format */

export interface IOnlineLoginResult {
    result: number;
    id?: string;
    user?: string;
    email?: string;
    token?: string;
    message: (number | string)[];
}

export interface IOnlineStatusResult {
    state: number;
    valid: boolean;
    active: number;
}

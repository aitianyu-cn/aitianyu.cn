/**@format */

export interface IOnlineLoginResult {
    result: number;
    id?: string;
    user?: string;
    email?: string;
    token?: string;
    message: (number | string)[];
}

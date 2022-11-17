/**@format */

export type LoginResult = "success" | "dup_user" | "dup_mail" | "invalid_active" | "failed";

export interface ILoginPost {
    user: string;
    mail: string;
    name: string;
    pw: string;
    active: string;
}

export interface ILoginPostResult {
    state: LoginResult;
    token: string;
}

export interface ILoginGet {
    token: string;
    vcode: string;
}

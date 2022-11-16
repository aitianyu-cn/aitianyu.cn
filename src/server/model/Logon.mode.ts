/**@format */

export type LogonResult = "success" | "dup_user" | "dup_mail" | "invalid_active" | "failed";

export interface ILogonPost {
    user: string;
    mail: string;
    name: string;
    pw: string;
    active: string;
}

export interface ILogonPostResult {
    state: LogonResult;
    token: string;
}

export interface ILogonGet {
    token: string;
    vcode: string;
}

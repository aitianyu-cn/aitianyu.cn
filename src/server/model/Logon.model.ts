/**@format */

export type LogonUserType = "user-name" | "email";

export type LogonResultType = "success" | "non_user" | "no_varify" | "error";

export interface ILogonPost {
    user: string;
    userType: LogonUserType;
    password: string;
}

export interface ILogonResult {
    user: string;
    name: string;
    email: string;
    result: LogonResultType;
    token: string;
}

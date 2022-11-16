/**@format */

export type LoginUserType = "user-name" | "email";

export type LoginResultType = "success" | "non_user" | "no_varify" | "error";

export interface ILoginPost {
    user: string;
    userType: LoginUserType;
    password: string;
    identify: string;
}

export interface ILoginResult {
    user: string;
    name: string;
    email: string;
    result: LoginResultType;
    token: string;
}

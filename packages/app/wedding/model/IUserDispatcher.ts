/**@format */

export type UserCashLevel = "HIGH" | "NORMAL" | "LESS" | "NULL";

export interface IUserResponseBase {
    unicode: string;
}

export interface IUserNewOrUpdateResponse extends IUserResponseBase {
    status: "new" | "update" | "failure";
}

export interface IUserValidationResponse extends IUserResponseBase {
    status: "valid " | "invalid";
    level: UserCashLevel;
}

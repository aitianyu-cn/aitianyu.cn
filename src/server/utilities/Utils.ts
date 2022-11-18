/**@format */

import { LogonUserType } from "tianyu-server/model/Logon.model";

const reg = /^([a-zA-Z0-9])(\w|\-|\.)+@[a-zA-Z0-9]+\.([a-zA-Z])+$/;
export function checkUserType(user: string): LogonUserType {
    return reg.test(user) ? "email" : "user-name";
}

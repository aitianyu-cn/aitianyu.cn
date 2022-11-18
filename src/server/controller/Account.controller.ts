/**@format */

import { AITIANYU_CN_OPERATION_SUCCESS, AITIANYU_CN_USER_SERVER } from "tianyu-server/Global";
import { IAccountVerify, ILoginPost, ILoginPostResult } from "tianyu-server/model/Login.model";
import { ILogonPost, ILogonResult, LogonResultType, LogonUserType } from "tianyu-server/model/Logon.model";
import { CacheController } from "tianyu-shell/common/controller/Cache.controller";
import { Cookie } from "ts-core/Cookie";
import { guidSHA } from "ts-core/Guid";
import { sha256 } from "ts-sec/Hash";

const USER_LOGIN_TOKEN_NAME = "TIANYU_cID";
const USER_LOGIN_IDENTIFY_NAME = "TIANYU_xID";

interface ILogonPostTransferData {
    user: string;
    userType: LogonUserType;
    password: string;
    identify: string;
}

export const UserLoginStateKey = "aitianyu-cn-user-login-state";

export const UserLoginKey = "aitianyu-cn-user";
export const UserLoginNameKey = "aitianyu-cn-user-name";
export const UserLoginEmailKey = "aitianyu-cn-user-email";

export function isUserLogon(): boolean {
    return CacheController.get(UserLoginStateKey);
}

export async function loadUserLogonState(): Promise<void> {
    return new Promise<void>((resolve) => {
        const token = Cookie.get(USER_LOGIN_TOKEN_NAME);
        const identify = Cookie.get(USER_LOGIN_IDENTIFY_NAME);

        CacheController.cache(UserLoginStateKey, false);
        if (!!!token || !!!identify) {
            resolve();
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${AITIANYU_CN_USER_SERVER}/aitianyu/cn/user/account/login`);
        xhr.send();
        xhr.onloadend = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                const loginResult = JSON.parse(response) as ILogonResult;
                if (loginResult && loginResult.result === "success") {
                    CacheController.cache(UserLoginStateKey, true);
                    CacheController.cache(UserLoginKey, loginResult.user);
                    CacheController.cache(UserLoginNameKey, loginResult.name);
                    CacheController.cache(UserLoginEmailKey, loginResult.email);
                }
            }
            resolve();
        };
    });
}

export async function logon(post: ILogonPost): Promise<LogonResultType> {
    return new Promise<LogonResultType>((resolve) => {
        const identify = guidSHA();
        const postData: ILogonPostTransferData = {
            user: post.user,
            userType: post.userType,
            password: sha256(post.password),
            identify: identify,
        };
        const postString = JSON.stringify(postData);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${AITIANYU_CN_USER_SERVER}/aitianyu/cn/user/account/login`);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(postString);
        xhr.onloadend = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                const logonResult = JSON.parse(response) as ILogonResult;
                if (logonResult && logonResult.result === "success") {
                    const date = new Date(Date.now());
                    const expires = new Date(date.setDate(date.getDate() + 30));
                    Cookie.set(USER_LOGIN_TOKEN_NAME, logonResult.token, {
                        expires: expires,
                    });
                    Cookie.set(USER_LOGIN_IDENTIFY_NAME, identify, {
                        expires: expires,
                    });

                    CacheController.cache(UserLoginStateKey, true);
                    CacheController.cache(UserLoginKey, logonResult.user);
                    CacheController.cache(UserLoginNameKey, logonResult.name);
                    CacheController.cache(UserLoginEmailKey, logonResult.email);
                }
                resolve(logonResult?.result || "error");
            } else {
                resolve("error");
            }
        };
    });
}

export async function login(post: ILoginPost): Promise<ILoginPostResult> {
    return new Promise<ILoginPostResult>((resolve) => {
        // set the encode
        post.pw = sha256(post.pw);
        const postString = JSON.stringify(post);

        const postResult: ILoginPostResult = {
            token: "",
            state: "failed",
        };

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${AITIANYU_CN_USER_SERVER}/aitianyu/cn/user/account/logon`);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(postString);
        xhr.onloadend = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                const loginResult = JSON.parse(response) as ILoginPostResult;
                if (loginResult) {
                    postResult.state = loginResult.state;
                    postResult.token = loginResult.token;
                }
            }
            resolve(postResult);
        };
    });
}

export async function verify(post: IAccountVerify): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const postString = JSON.stringify(post);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${AITIANYU_CN_USER_SERVER}/aitianyu/cn/user/account/verify`);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(postString);
        xhr.onloadend = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                resolve(AITIANYU_CN_OPERATION_SUCCESS === response);
            } else {
                resolve(false);
            }
        };
    });
}

/**@format */

import { FeatureToggle } from "./core/FeatureToggle";
import { guid } from "./Guid";
import { SHA256 } from "./SHA256";

export interface ILoginToken {
    validation: number;
    singature: string;
}

export interface ILoginResult {
    state: number;
    error: string;
    token: ILoginToken;
}

export interface ILoginData {
    logged: boolean;
    token: string;
    name: string;
    time: number;
}

let loginTimer = -1;

export function checkLogin(): boolean {
    const user = localStorage["user"];
    const logged = localStorage["logged"];
    const token = localStorage["token"];
    if (!user || !logged || !token) {
        return false;
    }

    const nTST = Number.parseInt(localStorage["tokenStartTime"]);
    const tokenStartTime = Number.isNaN(nTST) ? 0 : nTST;

    const nTS = Number.parseInt(localStorage["tokenTime"]);
    const tokenTime = Number.isNaN(nTS) ? 0 : nTS;

    const tokenTimeValid = Date.now() - tokenStartTime < tokenTime - 10000;

    if (!(tokenTimeValid && user && logged && token)) {
        delete localStorage["user"];
        delete localStorage["logged"];
        delete localStorage["token"];

        return false;
    }

    return true;
}

export function updateLogin(loginData: ILoginData): void {
    localStorage["user"] = loginData.name;
    localStorage["logged"] = loginData.logged;
    localStorage["token"] = loginData.token;
    localStorage["tokenStartTime"] = Date.now();
    localStorage["tokenTime"] = loginData.time;

    startTimer();
}

export function getUserName(): string {
    return localStorage["user"] || "";
}

function startTimer(): void {
    if (0 < loginTimer) {
        window.clearTimeout(loginTimer);
    }

    const nTS = Number.parseInt(localStorage["tokenTime"]);
    const tokenTime = Number.isNaN(nTS) ? 0 : nTS;

    const holdTime = tokenTime - 30000;
    // const holdTime = tokenTime;

    loginTimer = window.setTimeout(autoRenew, holdTime);
}

function initManagerHelper(): void {
    console.log("Manager Helper: Initing");

    if (!checkLogin()) {
        return;
    }

    console.log("Manager Helper: Currently - Login");

    const nTST = Number.parseInt(localStorage["tokenStartTime"]);
    const tokenStartTime = Number.isNaN(nTST) ? 0 : nTST;

    const nTS = Number.parseInt(localStorage["tokenTime"]);
    const tokenTime = Number.isNaN(nTS) ? 0 : nTS;

    let holdTime = tokenTime - (Date.now() - tokenStartTime);
    holdTime = holdTime < 30000 ? 0 : holdTime;

    loginTimer = window.setTimeout(autoRenew, holdTime);
}

async function autoRenew(): Promise<void> {
    console.log("Manager Helper: Start Renew Token");

    // to start a renew
    const token = localStorage["token"];
    const streaming = guid().replace("-", "");
    const remote = `/manager/usercenter/renew/${token}/${streaming}`;

    try {
        const response = await fetch(remote);
        const receive = await response.json();

        const state = receive["state"] || 505;
        const newToken = receive["token"];

        if (state === 200 && newToken) {
            const validation = newToken["validation"] || 0;
            const singature = newToken["singature"] || "";

            if (0 < validation && singature) {
                const singatureHash = SHA256.create(`${singature}${streaming}`);
                const loginData: ILoginData = {
                    logged: true,
                    token: singatureHash.getHash(),
                    name: localStorage["user"],
                    time: validation,
                };

                updateLogin(loginData);
                return;
            }
        }

        window.alert("登录异常，已退出登录");
    } catch {
        window.alert("当前无法连接到服务器，已退出登录");
    }
    window.location.reload();
}

initManagerHelper();

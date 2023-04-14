/**
 * @format
 *
 * User logon - user and password verify
 *
 * test user: testuser | 91b4d142823f7d20c5f08df69122de43f35f057a988d9619f6d3138485c9a203
 */

import {
    HttpHandler,
    DatabasePools,
    IHttpQuery,
    IHttpResponseError,
    ERROR_CODE as SERVER_ERROR_CODE,
} from "@aitianyu.cn/server-base";
import { OperationResult } from "../common/Definitions";
import { ONLINE_RESULT, ONLINE_RESULT_MESSAGE, ONLINE_STATE } from "../common/OnlineResults";
import { IOnlineLoginResult, IOnlineStatusResult } from "../model/Online.model";
import { guid } from "@aitianyu.cn/types";

const TOKEN_OUT_TIME = 2592000000;

const ERROR_CODE = {
    INVALID_OPERATION: 20000,
};

interface IVerifyUserResult {
    result: number;
    id: string;
    email: string;
    license: number;
    message: string[];
}

interface IOnlineCache {
    id: string;
    identify: string;
    time: number;
    valid: boolean;
    license: number;
}

interface IOnlineCacheRecord extends IOnlineCache {
    token: string;
}

export class OnlineDispatcher {
    private dbPool: DatabasePools;
    private onlineCache: Map<string, IOnlineCache>;
    private locationCache: Map<string, string>;

    private cacheInitPromise: Promise<void>;
    private isCacheValid: boolean;

    public constructor(databasePool: DatabasePools) {
        this.dbPool = databasePool;
        this.onlineCache = new Map<string, IOnlineCache>();
        this.locationCache = new Map<string, string>();

        this.cacheInitPromise = this.__initCache();
        this.isCacheValid = false;
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/authorization/online/login", this._login.bind(this));
        handler.setRouter("aitianyu/cn/authorization/online/logout", this._logout.bind(this));
        handler.setRouter("aitianyu/cn/authorization/online/status", this._status.bind(this));
    }

    private async _login(query: IHttpQuery, _messageLists: IHttpResponseError[]): Promise<IOnlineLoginResult> {
        await this.cacheInitPromise;
        if (!this.isCacheValid) {
            await this.__initCache();
        }

        const loginInfo = query.query;

        const result: IOnlineLoginResult = { result: ONLINE_RESULT.SUCCESS, message: [] };

        const user = loginInfo["user"];
        const password = loginInfo["pw"];
        const location = loginInfo["local"];
        if (!!!user || !!!password || !!!location) {
            result.result = ONLINE_RESULT.LOST_INFO;
            !!!user && result.message.push(ONLINE_RESULT_MESSAGE.LOST_USER);
            !!!password && result.message.push(ONLINE_RESULT_MESSAGE.LOST_PW);
            !!!location && result.message.push(ONLINE_RESULT_MESSAGE.LOST_LOCATION);

            return result;
        }

        return new Promise<IOnlineLoginResult>(async (resolve) => {
            const verifyResult = await this.__verifyUser(user, password);
            result.message.push(...verifyResult.message);
            result.user = user;

            if (verifyResult.result !== ONLINE_RESULT.SUCCESS) {
                result.result = verifyResult.result;
                resolve(result);
                return;
            }

            const usingUser = await this.__getLocationStatus(location);
            if (!!usingUser && usingUser !== verifyResult.id) {
                result.result = ONLINE_RESULT.LOCAL_USING;
            } else {
                try {
                    const token = guid();
                    await this.__loginOrUpdateToken(verifyResult, location, token);
                    result.token = token;
                    result.email = verifyResult.email;
                    result.id = verifyResult.id;
                } catch (e) {
                    result.result = ONLINE_RESULT.SYSTEM_WRONG;
                    result.message.push((e as any)?.message || "could not login due to system error");
                }
            }

            resolve(result);
            return;
        });
    }

    private async _logout(query: IHttpQuery, messageLists: IHttpResponseError[]): Promise<string> {
        await this.cacheInitPromise;
        if (!this.isCacheValid) {
            await this.__initCache();
        }

        const token = query.query["token"];

        if (!!!token || typeof token !== "string") {
            return OperationResult.Failed;
        }

        try {
            let offlineOpState: boolean = true;
            const onlineStatus = await this.__getStatusByToken(token, messageLists);
            if (onlineStatus.valid) {
                if (onlineStatus.state === ONLINE_STATE.ONLINE) {
                    // delete login status
                    const user = this.onlineCache.get(token);
                    offlineOpState = offlineOpState && !!user;
                    offlineOpState = offlineOpState && this.onlineCache.delete(token);
                    offlineOpState = offlineOpState && this.locationCache.delete(user?.identify || "");
                    if (offlineOpState) {
                        await this.__removeTokenFromDatabase(token);
                    }
                }
            }

            return onlineStatus.valid && offlineOpState ? OperationResult.Success : OperationResult.Failed;
        } catch (e) {
            messageLists.push({
                code: SERVER_ERROR_CODE.SYSTEM_EXCEPTIONS,
                text: (e as any)?.message || "operation failed, try again later.",
            });
            return OperationResult.Failed;
        }
    }

    private async _status(query: IHttpQuery, messageLists: IHttpResponseError[]): Promise<IOnlineStatusResult> {
        await this.cacheInitPromise;
        if (!this.isCacheValid) {
            await this.__initCache();
        }

        const token = query.query["token"];

        const user = query.query["user"];
        const location = query.query["local"];

        if (!!token && typeof token === "string") {
            return this.__getStatusByToken(token, messageLists);
        }

        if (!!user && typeof user === "string" && !!location && typeof location === "string") {
            return this.__getStatusByUserAndLocation(user, location, messageLists);
        }

        messageLists.push({
            code: ERROR_CODE.INVALID_OPERATION,
            text: "could not check the status of user, there is not any valid data.",
        });
        return { state: ONLINE_STATE.ERROR, valid: false, active: 0 };
    }

    private async __initCache(): Promise<void> {
        if (this.isCacheValid) return;

        const sql = `select * from tianyu_user.logon;`;
        await new Promise<void>((resolve) => {
            this.dbPool.execute(
                "tianyu_user",
                sql,
                (value: any) => {
                    const invalidList: string[] = [];
                    try {
                        const cacheList: IOnlineCacheRecord[] = [];
                        let hasError: boolean = false;
                        if (Array.isArray(value)) {
                            for (const item of value) {
                                try {
                                    const cache: IOnlineCacheRecord = {
                                        token: item["token"] || "",
                                        identify: item["identify"] || "",
                                        id: item["id"] || "",
                                        time: item["time"] || 0,
                                        valid: item["valid"] === 1,
                                        license: item["active"] || 0,
                                    };
                                    if (!!cache.token && !!cache.identify && !!cache.id && !!cache.time) {
                                        if (cache.valid) {
                                            cacheList.push(cache);
                                        } else {
                                            invalidList.push(cache.token);
                                        }
                                    } else if (!!cache.token) {
                                        invalidList.push(cache.token);
                                    }
                                } catch {
                                    hasError = hasError || true;
                                    break;
                                }
                            }
                        }

                        if (!hasError) {
                            this.isCacheValid = true;
                            for (const item of cacheList) {
                                this.onlineCache.set(item.token, item);
                                this.locationCache.set(item.identify, item.token);
                            }
                        }
                    } finally {
                        const oPromise =
                            invalidList.length > 0 ? this.__removeTokensFromDatabase(invalidList) : Promise.resolve();
                        oPromise.finally(resolve);
                    }
                },
                (_error) => {
                    resolve();
                },
            );
        });
    }

    private async __verifyUser(user: string, password: string): Promise<IVerifyUserResult> {
        return new Promise<IVerifyUserResult>((resolve) => {
            const sql =
                "SELECT " +
                "userTable.id, " +
                "userTable.user, " +
                "userTable.email, " +
                "userTable.pw, " +
                "activeTable.type as liscense " +
                "from `tianyu_user`.`user` as userTable " +
                "LEFT JOIN `tianyu_user`.`actives` as activeTable " +
                "ON user = '" +
                user +
                "' AND activeTable.id = userTable.active;";
            const res: IVerifyUserResult = {
                result: ONLINE_RESULT.SUCCESS,
                id: "",
                email: "",
                license: 0,
                message: [],
            };
            try {
                this.dbPool.execute(
                    "tianyu_user",
                    sql,
                    (result: any[]) => {
                        if (!Array.isArray(result) || result.length === 0) {
                            res.result = ONLINE_RESULT.WRONG_USER;
                        } else {
                            const verifyPW: boolean = password === (result[0]?.["pw"] || "");
                            if (verifyPW) {
                                if (typeof result[0]["liscense"] === "number" && result[0]["liscense"] !== 0) {
                                    res.id = result[0]["id"];
                                    res.email = result[0]["email"];
                                    res.license = result[0]["liscense"];
                                } else {
                                    res.result = ONLINE_RESULT.INACCESSIBLE;
                                }
                            } else {
                                res.result = ONLINE_RESULT.WRONG_PW;
                            }
                        }

                        resolve(res);
                    },
                    (error: string) => {
                        res.result = ONLINE_RESULT.SYSTEM_WRONG;
                        res.message.push(error);
                        resolve(res);
                    },
                );
            } catch (e) {
                res.result = ONLINE_RESULT.SYSTEM_WRONG;
                res.message.push((e as any)?.message || "service error");
                resolve(res);
            }
        });
    }

    private async __getStatusByToken(token: string, messageLists: IHttpResponseError[]): Promise<IOnlineStatusResult> {
        try {
            const user = this.onlineCache.get(token);
            if (!!user) {
                user.valid = user.valid && Date.now() - user.time < TOKEN_OUT_TIME;
                if (!user.valid) {
                    this.onlineCache.delete(token);
                    this.locationCache.delete(user.identify);
                    await this.__removeTokenFromDatabase(token);
                }
            }

            return {
                state: user?.valid ? ONLINE_STATE.ONLINE : ONLINE_STATE.OFFLINE,
                valid: true,
                active: user?.valid ? user.license : 0,
            };
        } catch (e) {
            messageLists.push({
                code: SERVER_ERROR_CODE.SYSTEM_EXCEPTIONS,
                text: (e as any)?.message || "could not get status by token.",
            });
            return { state: ONLINE_STATE.OFFLINE, valid: false, active: 0 };
        }
    }

    private async __getStatusByUserAndLocation(
        user: string,
        location: string,
        messageLists: IHttpResponseError[],
    ): Promise<IOnlineStatusResult> {
        try {
            // to refresh the cache
            await this.__getLocationStatus(location);
            const token = this.locationCache.get(location) || "";
            const cachedUser = this.onlineCache.get(token);
            const checkUser = cachedUser?.id === user;
            return {
                state: checkUser ? ONLINE_STATE.ONLINE : ONLINE_STATE.OFFLINE,
                valid: true,
                active: checkUser ? cachedUser?.license || 0 : 0,
            };
        } catch (e) {
            messageLists.push({
                code: SERVER_ERROR_CODE.SYSTEM_EXCEPTIONS,
                text: (e as any)?.message || "could not get status by user and location.",
            });
            return { state: ONLINE_STATE.OFFLINE, valid: false, active: 0 };
        }
    }

    private async __getLocationStatus(location: string): Promise<string | null> {
        const token = this.locationCache.get(location);
        if (!!token) {
            const cache = this.onlineCache.get(token);
            if (!!cache) {
                cache.valid = cache.valid && Date.now() - cache.time < TOKEN_OUT_TIME;
                if (cache.valid) {
                    return cache.id;
                }

                // clean token data if invalid
                this.onlineCache.delete(token);
                await this.__removeTokenFromDatabase(token);
            }

            // clean location data if invalid
            this.locationCache.delete(location);
        }

        return null;
    }

    private async __loginOrUpdateToken(verification: IVerifyUserResult, location: string, token: string): Promise<void> {
        // clean old cache
        let oldToken = this.locationCache.get(location);
        if (oldToken) {
            this.onlineCache.delete(oldToken);
            this.locationCache.delete(location);
        }

        this.locationCache.set(location, token);

        const onlineCache: IOnlineCache = {
            id: verification.id,
            identify: location,
            time: Date.now(),
            valid: true,
            license: verification.license,
        };
        this.onlineCache.set(token, onlineCache);

        void new Promise<void>(async (resolve) => {
            if (oldToken) {
                // remove token from database
                await this.__removeTokenFromDatabase(oldToken);
            }

            // add token to database
            await this.__addTokenToDatabase(token, onlineCache);

            resolve();
        });
    }

    private async __removeTokenFromDatabase(token: string): Promise<void> {
        const sql = `DELETE FROM tianyu_user.logon WHERE token = '${token}';`;

        return new Promise<void>((resolve, reject) => {
            this.dbPool.execute(
                "tianyu_user",
                sql,
                (_value: any) => {
                    resolve();
                },
                reject,
            );
        });
    }

    private async __removeTokensFromDatabase(tokens: string[]): Promise<void> {
        const tokenString = tokens.join("','");
        const sql = `DELETE FROM tianyu_user.logon WHERE token in ('${tokenString}');`;

        return new Promise<void>((resolve, reject) => {
            this.dbPool.execute(
                "tianyu_user",
                sql,
                (_value: any) => {
                    resolve();
                },
                reject,
            );
        });
    }

    private async __addTokenToDatabase(token: string, cacheData: IOnlineCache): Promise<void> {
        const sql = `insert into tianyu_user.logon values(
            '${token}',
            '${cacheData.identify}',
            '${cacheData.id}',
            '${cacheData.time}',
            '${cacheData.valid ? 1 : 0}',
            '${cacheData.license}'
            );`;

        return new Promise<void>((resolve, reject) => {
            this.dbPool.execute(
                "tianyu_user",
                sql,
                (_value: any) => {
                    resolve();
                },
                reject,
            );
        });
    }
}

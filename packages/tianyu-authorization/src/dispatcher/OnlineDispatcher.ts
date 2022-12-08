/**
 * @format
 *
 * User logon - user and password verify
 */

import { DatabasePools, IHttpQuery, IHttpResponseError, MapOfString, MapOfType } from "@aitianyu.cn/server-base";
import { HttpHandler } from "@aitianyu.cn/server-base";
import { resolve } from "path";
import { guid } from "../common/Guid";
import { ONLINE_RESULT, ONLINE_RESULT_MESSAGE } from "../common/OnlineResults";
import { IOnlineLoginResult } from "../model/Online.model";

const TOKEN_OUT_TIME = 2592000000;

interface IVerifyUserResult {
    result: number;
    id: string;
    email: string;
    message: string[];
}

interface IOnlineCache {
    id: string;
    identify: string;
    time: number;
    valid: boolean;
}

export class OnlineDispatcher {
    private dbPool: DatabasePools;
    private onlineCache: Map<string, IOnlineCache>;
    private locationCache: Map<string, string>;

    public constructor(databasePool: DatabasePools) {
        this.dbPool = databasePool;
        this.onlineCache = new Map<string, IOnlineCache>();
        this.locationCache = new Map<string, string>();
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/authorization/online/login", this._login.bind(this));
        handler.setRouter("aitianyu/cn/authorization/online/logout", this._logout.bind(this));
        handler.setRouter("aitianyu/cn/authorization/online/status", this._status.bind(this));
    }

    private async _login(query: IHttpQuery, _messageLists: IHttpResponseError[]): Promise<IOnlineLoginResult> {
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

    private async __verifyUser(user: string, password: string): Promise<IVerifyUserResult> {
        return new Promise<IVerifyUserResult>((resolve) => {
            const sql = "SELECT * from tianyu_user.user where user = '" + user + "';";
            const res: IVerifyUserResult = {
                result: ONLINE_RESULT.SUCCESS,
                id: "",
                email: "",
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
                                res.id = result[0]["id"];
                                res.email = result[0]["email"];
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

    private async _logout(query: IHttpQuery, messageLists: IHttpResponseError[]): Promise<any> {
        //
    }

    private async _status(query: IHttpQuery, messageLists: IHttpResponseError[]): Promise<any> {
        //
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
        };
        this.onlineCache.set(token, onlineCache);

        void new Promise<void>(async (resolve) => {
            if (oldToken) {
                // remove token from database
                await this.__removeTokenFromDatabase(oldToken);
            }

            // add token to database
            await this.__addTokenToDatabase(token, onlineCache);
        });
    }

    private async __removeTokenFromDatabase(token: string): Promise<void> {
        const sql = `DELETE FROM tianyu_user.logon WHERE token = '${token}'`;

        return new Promise<void>((resolve, reject) => {
            this.dbPool.execute(
                "tianyu_user",
                sql,
                (value: any) => {
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
            '${cacheData.valid}'
            )`;

        return new Promise<void>((resolve, reject) => {
            this.dbPool.execute(
                "tianyu_user",
                sql,
                (value: any) => {
                    resolve();
                },
                reject,
            );
        });
    }
}

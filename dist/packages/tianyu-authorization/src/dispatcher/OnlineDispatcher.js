"use strict";
/**
 * @format
 *
 * User logon - user and password verify
 *
 * test user: testuser | 91b4d142823f7d20c5f08df69122de43f35f057a988d9619f6d3138485c9a203
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineDispatcher = void 0;
const server_base_1 = require("@aitianyu.cn/server-base");
const Definitions_1 = require("../common/Definitions");
const OnlineResults_1 = require("../common/OnlineResults");
const types_1 = require("@aitianyu.cn/types");
const TOKEN_OUT_TIME = 2592000000;
const ERROR_CODE = {
    INVALID_OPERATION: 20000,
};
class OnlineDispatcher {
    constructor(databasePool) {
        this.dbPool = databasePool;
        this.onlineCache = new Map();
        this.locationCache = new Map();
        this.cacheInitPromise = this.__initCache();
        this.isCacheValid = false;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/authorization/online/login", this._login.bind(this));
        handler.setRouter("aitianyu/cn/authorization/online/logout", this._logout.bind(this));
        handler.setRouter("aitianyu/cn/authorization/online/status", this._status.bind(this));
    }
    async _login(query, _messageLists) {
        await this.cacheInitPromise;
        if (!this.isCacheValid) {
            await this.__initCache();
        }
        const loginInfo = query.query;
        const result = { result: OnlineResults_1.ONLINE_RESULT.SUCCESS, message: [] };
        const user = loginInfo["user"];
        const password = loginInfo["pw"];
        const location = loginInfo["local"];
        if (!!!user || !!!password || !!!location) {
            result.result = OnlineResults_1.ONLINE_RESULT.LOST_INFO;
            !!!user && result.message.push(OnlineResults_1.ONLINE_RESULT_MESSAGE.LOST_USER);
            !!!password && result.message.push(OnlineResults_1.ONLINE_RESULT_MESSAGE.LOST_PW);
            !!!location && result.message.push(OnlineResults_1.ONLINE_RESULT_MESSAGE.LOST_LOCATION);
            return result;
        }
        return new Promise(async (resolve) => {
            const verifyResult = await this.__verifyUser(user, password);
            result.message.push(...verifyResult.message);
            result.user = user;
            if (verifyResult.result !== OnlineResults_1.ONLINE_RESULT.SUCCESS) {
                result.result = verifyResult.result;
                resolve(result);
                return;
            }
            const usingUser = await this.__getLocationStatus(location);
            if (!!usingUser && usingUser !== verifyResult.id) {
                result.result = OnlineResults_1.ONLINE_RESULT.LOCAL_USING;
            }
            else {
                try {
                    const token = (0, types_1.guid)();
                    await this.__loginOrUpdateToken(verifyResult, location, token);
                    result.token = token;
                    result.email = verifyResult.email;
                    result.id = verifyResult.id;
                }
                catch (e) {
                    result.result = OnlineResults_1.ONLINE_RESULT.SYSTEM_WRONG;
                    result.message.push(e?.message || "could not login due to system error");
                }
            }
            resolve(result);
            return;
        });
    }
    async _logout(query, messageLists) {
        await this.cacheInitPromise;
        if (!this.isCacheValid) {
            await this.__initCache();
        }
        const token = query.query["token"];
        if (!!!token || typeof token !== "string") {
            return Definitions_1.OperationResult.Failed;
        }
        try {
            let offlineOpState = true;
            const onlineStatus = await this.__getStatusByToken(token, messageLists);
            if (onlineStatus.valid) {
                if (onlineStatus.state === OnlineResults_1.ONLINE_STATE.ONLINE) {
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
            return onlineStatus.valid && offlineOpState ? Definitions_1.OperationResult.Success : Definitions_1.OperationResult.Failed;
        }
        catch (e) {
            messageLists.push({
                code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS,
                text: e?.message || "operation failed, try again later.",
            });
            return Definitions_1.OperationResult.Failed;
        }
    }
    async _status(query, messageLists) {
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
        return { state: OnlineResults_1.ONLINE_STATE.ERROR, valid: false, active: 0 };
    }
    async __initCache() {
        if (this.isCacheValid)
            return;
        const sql = `select * from tianyu_user.logon;`;
        await new Promise((resolve) => {
            this.dbPool.execute("tianyu_user", sql, (value) => {
                const invalidList = [];
                try {
                    const cacheList = [];
                    let hasError = false;
                    if (Array.isArray(value)) {
                        for (const item of value) {
                            try {
                                const cache = {
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
                                    }
                                    else {
                                        invalidList.push(cache.token);
                                    }
                                }
                                else if (!!cache.token) {
                                    invalidList.push(cache.token);
                                }
                            }
                            catch {
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
                }
                finally {
                    const oPromise = invalidList.length > 0 ? this.__removeTokensFromDatabase(invalidList) : Promise.resolve();
                    oPromise.finally(resolve);
                }
            }, (_error) => {
                resolve();
            });
        });
    }
    async __verifyUser(user, password) {
        return new Promise((resolve) => {
            const sql = "SELECT " +
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
            const res = {
                result: OnlineResults_1.ONLINE_RESULT.SUCCESS,
                id: "",
                email: "",
                license: 0,
                message: [],
            };
            try {
                this.dbPool.execute("tianyu_user", sql, (result) => {
                    if (!Array.isArray(result) || result.length === 0) {
                        res.result = OnlineResults_1.ONLINE_RESULT.WRONG_USER;
                    }
                    else {
                        const verifyPW = password === (result[0]?.["pw"] || "");
                        if (verifyPW) {
                            if (typeof result[0]["liscense"] === "number" && result[0]["liscense"] !== 0) {
                                res.id = result[0]["id"];
                                res.email = result[0]["email"];
                                res.license = result[0]["liscense"];
                            }
                            else {
                                res.result = OnlineResults_1.ONLINE_RESULT.INACCESSIBLE;
                            }
                        }
                        else {
                            res.result = OnlineResults_1.ONLINE_RESULT.WRONG_PW;
                        }
                    }
                    resolve(res);
                }, (error) => {
                    res.result = OnlineResults_1.ONLINE_RESULT.SYSTEM_WRONG;
                    res.message.push(error);
                    resolve(res);
                });
            }
            catch (e) {
                res.result = OnlineResults_1.ONLINE_RESULT.SYSTEM_WRONG;
                res.message.push(e?.message || "service error");
                resolve(res);
            }
        });
    }
    async __getStatusByToken(token, messageLists) {
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
                state: user?.valid ? OnlineResults_1.ONLINE_STATE.ONLINE : OnlineResults_1.ONLINE_STATE.OFFLINE,
                valid: true,
                active: user?.valid ? user.license : 0,
            };
        }
        catch (e) {
            messageLists.push({
                code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS,
                text: e?.message || "could not get status by token.",
            });
            return { state: OnlineResults_1.ONLINE_STATE.OFFLINE, valid: false, active: 0 };
        }
    }
    async __getStatusByUserAndLocation(user, location, messageLists) {
        try {
            // to refresh the cache
            await this.__getLocationStatus(location);
            const token = this.locationCache.get(location) || "";
            const cachedUser = this.onlineCache.get(token);
            const checkUser = cachedUser?.id === user;
            return {
                state: checkUser ? OnlineResults_1.ONLINE_STATE.ONLINE : OnlineResults_1.ONLINE_STATE.OFFLINE,
                valid: true,
                active: checkUser ? cachedUser?.license || 0 : 0,
            };
        }
        catch (e) {
            messageLists.push({
                code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS,
                text: e?.message || "could not get status by user and location.",
            });
            return { state: OnlineResults_1.ONLINE_STATE.OFFLINE, valid: false, active: 0 };
        }
    }
    async __getLocationStatus(location) {
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
    async __loginOrUpdateToken(verification, location, token) {
        // clean old cache
        let oldToken = this.locationCache.get(location);
        if (oldToken) {
            this.onlineCache.delete(oldToken);
            this.locationCache.delete(location);
        }
        this.locationCache.set(location, token);
        const onlineCache = {
            id: verification.id,
            identify: location,
            time: Date.now(),
            valid: true,
            license: verification.license,
        };
        this.onlineCache.set(token, onlineCache);
        void new Promise(async (resolve) => {
            if (oldToken) {
                // remove token from database
                await this.__removeTokenFromDatabase(oldToken);
            }
            // add token to database
            await this.__addTokenToDatabase(token, onlineCache);
            resolve();
        });
    }
    async __removeTokenFromDatabase(token) {
        const sql = `DELETE FROM tianyu_user.logon WHERE token = '${token}';`;
        return new Promise((resolve, reject) => {
            this.dbPool.execute("tianyu_user", sql, (_value) => {
                resolve();
            }, reject);
        });
    }
    async __removeTokensFromDatabase(tokens) {
        const tokenString = tokens.join("','");
        const sql = `DELETE FROM tianyu_user.logon WHERE token in ('${tokenString}');`;
        return new Promise((resolve, reject) => {
            this.dbPool.execute("tianyu_user", sql, (_value) => {
                resolve();
            }, reject);
        });
    }
    async __addTokenToDatabase(token, cacheData) {
        const sql = `insert into tianyu_user.logon values(
            '${token}',
            '${cacheData.identify}',
            '${cacheData.id}',
            '${cacheData.time}',
            '${cacheData.valid ? 1 : 0}',
            '${cacheData.license}'
            );`;
        return new Promise((resolve, reject) => {
            this.dbPool.execute("tianyu_user", sql, (_value) => {
                resolve();
            }, reject);
        });
    }
}
exports.OnlineDispatcher = OnlineDispatcher;

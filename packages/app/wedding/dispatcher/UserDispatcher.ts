/**@format */

import { DatabasePools, HttpHandler, IHttpDispatchInstance, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { guid, parseAreaString } from "@aitianyu.cn/types";
import { resolve } from "path";
import { IUserNewOrUpdateResponse, IUserValidationResponse, UserCashLevel } from "../model/IUserDispatcher";
import { MessageBundle } from "../utils/i18n";

interface IGetPerson {
    exist: boolean;
    unicode: string;
    name: string;
    count: number;
    money: number;
}

export class UserDispatcher implements IHttpDispatchInstance {
    private databasePool: DatabasePools;

    public constructor(dbPool: DatabasePools) {
        this.databasePool = dbPool;
    }

    createDispatches(handler: HttpHandler): void {
        handler.setRouter("aitianyu/cn/app/wedding/newOrUpdate", this._newOrUpdate.bind(this));
        handler.setRouter("aitianyu/cn/app/wedding/validation", this._validation.bind(this));
    }

    private async _validation(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<IUserValidationResponse> {
        const lang = parseAreaString(query.lang);
        const phone = query.query["phone"] || "";

        if (!phone) {
            messageList.push({ code: -1, text: MessageBundle.getText(lang, "PHONE_NUMBER_NOT_PROVIDED") });
            return {
                status: "invalid",
                level: "NULL",
                unicode: "",
            };
        }

        const dbInfo = await this._getPerson(phone, messageList);
        const level: UserCashLevel = dbInfo.exist ? this._validCash(dbInfo.money) : "NULL";
        return {
            status: level === "NULL" ? "invalid" : "valid ",
            level: level,
            unicode: dbInfo.unicode,
        };
    }

    private async _newOrUpdate(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<IUserNewOrUpdateResponse> {
        const lang = parseAreaString(query.lang);
        const phone = query.query["phone"] || "";
        const name = query.query["name"] || "";
        const count = query.query["count"] || "";

        if (!phone) {
            messageList.push({ code: -1, text: MessageBundle.getText(lang, "PHONE_NUMBER_NOT_PROVIDED") });
            return {
                status: "failure",
                unicode: "",
            };
        }

        const dbInfo = await this._getPerson(phone, messageList);
        if (dbInfo.exist) {
            const updateResult = await this._updateInfo(phone, name, count, dbInfo, messageList);
            return {
                status: updateResult ? "update" : "failure",
                unicode: updateResult ? dbInfo.unicode : "",
            };
        } else {
            const unicode = await this._addNew(phone, name, count, messageList);
            return {
                status: unicode ? "new" : "failure",
                unicode: unicode,
            };
        }
    }

    private async _getPerson(phone: string, messageList: IHttpResponseError[]): Promise<IGetPerson> {
        return new Promise<IGetPerson>((resolve) => {
            // const sql = `SELECT * FROM wedding.master WHERE phone='${phone}';`;
            const sql = `SELECT 
                            master.phone AS 'phone',
                            master.name AS 'name',
                            master.count AS 'count',
                            cash.money AS 'money',
                            cash.number AS 'number'
                            FROM wedding.master JOIN wedding.cash ON master.phone=cash.phone
                            WHERE master.phone='${phone}';`;
            this.databasePool.execute(
                "wedding",
                sql,
                (result) => {
                    const valid = Boolean(Array.isArray(result) && result.length);
                    console.log(result);
                    const count = valid ? Number.parseInt(result[0]["count"]) : 0;
                    const money = valid ? Number.parseInt(result[0]["money"]) : 0;

                    resolve({
                        exist: valid,
                        unicode: valid ? result[0]["number"] : "",
                        name: valid ? result[0]["name"] : "",
                        count: isNaN(count) ? 0 : count,
                        money: isNaN(money) ? 0 : money,
                    });
                },
                (error) => {
                    messageList.push({
                        code: -1,
                        text: typeof error === "string" ? error : (error as any)?.mesage || "get person from phone failed",
                    });
                    resolve({ exist: false, unicode: "", name: "", count: 0, money: 0 });
                },
            );
        });
    }

    private async _updateInfo(
        phone: string,
        name: string,
        count: string,
        preInfo: IGetPerson,
        messageList: IHttpResponseError[],
    ): Promise<boolean> {
        const sql = `UPDATE wedding.master SET name='${name || preInfo.name}', count=${
            count || preInfo.count || 0
        } WHERE phone='${phone}';`;
        return this.databasePool.executeAsync("wedding", sql).then(
            async () => true,
            async (error) => {
                messageList.push({
                    code: -1,
                    text: typeof error === "string" ? error : (error as any)?.mesage || "update info failed",
                });
                return Promise.resolve(false);
            },
        );
    }

    private async _addNew(phone: string, name: string, count: string, messageList: IHttpResponseError[]): Promise<string> {
        const insertMasterSql = `INSERT INTO wedding.master VALUES('${phone}', '${name}', ${count});`;
        return this.databasePool.executeAsync("wedding", insertMasterSql).then(
            async () => {
                const unicode = guid();
                const insertCashSql = `INSERT INTO wedding.cash VALUES('${phone}', 0, '${unicode}');`;
                return this.databasePool.executeAsync("wedding", insertCashSql).then(
                    async () => unicode,
                    async (error) => {
                        messageList.push({
                            code: -1,
                            text: typeof error === "string" ? error : (error as any)?.mesage || "add new unicode code failed",
                        });
                        return Promise.resolve("");
                    },
                );
            },
            async (error) => {
                messageList.push({
                    code: -1,
                    text: typeof error === "string" ? error : (error as any)?.mesage || "add new info failed",
                });
                return Promise.resolve("");
            },
        );
    }

    private _validCash(money: number): UserCashLevel {
        if (money === 0) {
            return "NULL";
        } else if (money >= 100) {
            return "LESS";
        } else if (money >= 1000) {
            return "NORMAL";
        } else {
            return "HIGH";
        }
    }
}

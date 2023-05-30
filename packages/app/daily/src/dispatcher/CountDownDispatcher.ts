/**@format */

import { IHttpDispatchInstance, DatabasePools, HttpHandler, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { getUserByAuthor } from "../common/AuthorHelper";
import { ICountDownTime } from "../common/Types";

export class CountDownDispatcher implements IHttpDispatchInstance {
    private databasePool: DatabasePools;

    public constructor(dbPool: DatabasePools) {
        this.databasePool = dbPool;
    }

    createDispatches(handler: HttpHandler): void {
        handler.setRouter("aitianyu/cn/app/daily/timer/countDown", this._countDown.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/timer/setCount", this._setCount.bind(this));
    }

    private async _countDown(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return "0000-00-00 00:00:00.000";
        }

        const user = await getUserByAuthor(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return "0000-00-00 00:00:00.000";
        }

        return new Promise<string>((resolve) => {
            const sql = `SELECT \`date\` FROM daily.counter WHERE user='${user}';`;
            this.databasePool.execute(
                "daily",
                sql,
                (result) => {
                    let date: string = "";
                    if (Array.isArray(result) && result.length) {
                        date = result[0]["date"];
                    }
                    resolve(date);
                },
                (error) => {
                    messageList.push({ code: -1000, text: error });
                    resolve("0000-00-00 00:00:00.000");
                },
            );
        });
    }

    private async _setCount(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return "failed";
        }

        const date = query.query["date"] || "";
        if (!date) {
            messageList.push({ code: -2, text: "lost date" });
            return "failed";
        }

        const user = await getUserByAuthor(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return "failed";
        }

        return new Promise<string>((resolve) => {
            const sql = `INSERT INTO daily.counter VALUES ('${user}', '${date}');`;
            this.databasePool.execute(
                "daily",
                sql,
                (_result) => {
                    resolve("success");
                },
                (err) => {
                    messageList.push({ code: -1, text: err });
                    resolve("failed");
                },
            );
        });
    }

    private async _getTime(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<ICountDownTime | null> {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return null;
        }

        const user = await getUserByAuthor(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return null;
        }

        return new Promise<ICountDownTime | null>((resolve) => {
            const sql = `SELECT \`date\` FROM daily.counter WHERE user='${user}';`;
            this.databasePool.execute(
                "daily",
                sql,
                (result) => {
                    let time: ICountDownTime = {
                        year: "",
                        month: "",
                        day: "",
                        hour: "",
                        min: "",
                        sec: "",
                        milisec: "",
                        formatted: "",
                    };
                    if (Array.isArray(result) && result.length) {
                        const date = result[0]["date"]?.toString() || "0000-00-00 00:00:00.000";
                        const target = new Date(date);
                        const current = new Date();
                        const timeSpan = target.;
                    }
                    resolve(time);
                },
                (error) => {
                    messageList.push({ code: -1000, text: error });
                    resolve(null);
                },
            );
        });
    }
}

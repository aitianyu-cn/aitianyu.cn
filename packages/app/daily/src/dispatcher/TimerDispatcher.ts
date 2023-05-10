/**@format */

import { DatabasePools, HttpHandler, IHttpDispatchInstance, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { ITimerGetRecord } from "../common/Types";
import { getUserByAuthor } from "../common/AuthorHelper";

export class TimerDispatcher implements IHttpDispatchInstance {
    private databasePool: DatabasePools;

    public constructor(dbPool: DatabasePools) {
        this.databasePool = dbPool;
    }

    createDispatches(handler: HttpHandler): void {
        handler.setRouter("aitianyu/cn/app/daily/timer/record", this._record.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/timer/get", this._get.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/timer/getAll", this._getAll.bind(this));
    }

    private async _record(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return "failed";
        }

        const time = query.query["time"] || "";
        const summary = query.query["summary"] || "";
        const description = query.query["description"] || "";
        if (!time || !summary) {
            messageList.push({ code: -1, text: "lost main fields" });
            return "failed";
        }

        const user = await getUserByAuthor(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return "failed";
        }

        return new Promise<string>((resolve) => {
            const sql = `INSERT INTO daily.timer VALUES ('${user}', '${summary}', '${time}', '${description}');`;
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

    private async _get(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<ITimerGetRecord[]> {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return [];
        }

        const user = await getUserByAuthor(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return [];
        }

        const summary = query.query["summary"] || "";
        if (summary) {
            return this.__getSummary(user, summary);
        } else {
            return this.__getAll(user);
        }
    }

    private async _getAll(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<ITimerGetRecord[]> {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return [];
        }

        const user = await getUserByAuthor(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return [];
        }

        return this.__getAll(user);
    }

    private async __getSummary(user: string, summary: string): Promise<ITimerGetRecord[]> {
        return new Promise<ITimerGetRecord[]>((resolve) => {
            const sql = `SELECT \`summary\`, \`time\`, \`description\` FROM daily.timer WHERE user='${user}' AND summary like '%${summary}%';`;
            this.databasePool.execute(
                "daily",
                sql,
                (result) => {
                    const records: ITimerGetRecord[] = [];
                    if (Array.isArray(result) && result.length) {
                        for (const item of result) {
                            records.push({
                                time: item["time"],
                                summary: item["summary"],
                                description: item["description"],
                                during: Math.floor(Math.abs(Date.now() - new Date(item["time"]).getTime()) / (1000 * 3600 * 24)),
                            });
                        }
                    }
                    resolve(records);
                },
                (error) => {
                    resolve([]);
                },
            );
        });
    }

    private async __getAll(user: string): Promise<ITimerGetRecord[]> {
        return new Promise<ITimerGetRecord[]>((resolve) => {
            const sql = `SELECT \`summary\`, \`time\`, \`description\` FROM daily.timer WHERE user='${user}';`;
            this.databasePool.execute(
                "daily",
                sql,
                (result) => {
                    const records: ITimerGetRecord[] = [];
                    if (Array.isArray(result) && result.length) {
                        for (const item of result) {
                            records.push({
                                time: item["time"],
                                summary: item["summary"],
                                description: item["description"],
                                during: Math.floor(Math.abs(Date.now() - new Date(item["time"]).getTime()) / (1000 * 3600 * 24)),
                            });
                        }
                    }
                    resolve(records);
                },
                (error) => {
                    resolve([]);
                },
            );
        });
    }
}

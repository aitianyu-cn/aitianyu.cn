"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerDispatcher = void 0;
const AuthorHelper_1 = require("../common/AuthorHelper");
class TimerDispatcher {
    constructor(dbPool) {
        this.databasePool = dbPool;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/app/daily/timer/record", this._record.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/timer/get", this._get.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/timer/getAll", this._getAll.bind(this));
    }
    async _record(query, messageList) {
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
        const user = await (0, AuthorHelper_1.getUserByAuthor)(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return "failed";
        }
        return new Promise((resolve) => {
            const sql = `INSERT INTO daily.timer VALUES ('${user}', '${summary}', '${time}', '${description}');`;
            this.databasePool.execute("daily", sql, (_result) => {
                resolve("success");
            }, (err) => {
                messageList.push({ code: -1, text: err });
                resolve("failed");
            });
        });
    }
    async _get(query, messageList) {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return [];
        }
        const user = await (0, AuthorHelper_1.getUserByAuthor)(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return [];
        }
        const summary = query.query["summary"] || "";
        if (summary) {
            return this.__getSummary(user, summary);
        }
        else {
            return this.__getAll(user);
        }
    }
    async _getAll(query, messageList) {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return [];
        }
        const user = await (0, AuthorHelper_1.getUserByAuthor)(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return [];
        }
        return this.__getAll(user);
    }
    async __getSummary(user, summary) {
        return new Promise((resolve) => {
            const sql = `SELECT \`summary\`, \`time\`, \`description\` FROM daily.timer WHERE user='${user}' AND summary like '%${summary}%';`;
            this.databasePool.execute("daily", sql, (result) => {
                const records = [];
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
            }, (error) => {
                resolve([]);
            });
        });
    }
    async __getAll(user) {
        return new Promise((resolve) => {
            const sql = `SELECT \`summary\`, \`time\`, \`description\` FROM daily.timer WHERE user='${user}';`;
            this.databasePool.execute("daily", sql, (result) => {
                const records = [];
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
            }, (error) => {
                resolve([]);
            });
        });
    }
}
exports.TimerDispatcher = TimerDispatcher;

"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountDownDispatcher = void 0;
const AuthorHelper_1 = require("../common/AuthorHelper");
const MillisecondStep = 1;
const SecondStep = 1000;
class CountDownDispatcher {
    constructor(dbPool) {
        this.databasePool = dbPool;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/app/daily/timer/countDown", this._countDown.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/timer/setCount", this._setCount.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/timer/getTime", this._getTime.bind(this));
    }
    async _countDown(query, messageList) {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return "0000-00-00 00:00:00.000";
        }
        const user = await (0, AuthorHelper_1.getUserByAuthor)(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return "0000-00-00 00:00:00.000";
        }
        return new Promise((resolve) => {
            const sql = `SELECT \`date\` FROM daily.counter WHERE user='${user}';`;
            this.databasePool.execute("daily", sql, (result) => {
                let date = "";
                if (Array.isArray(result) && result.length) {
                    date = result[0]["date"];
                }
                resolve(date);
            }, (error) => {
                messageList.push({ code: -1000, text: error });
                resolve("0000-00-00 00:00:00.000");
            });
        });
    }
    async _setCount(query, messageList) {
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
        const user = await (0, AuthorHelper_1.getUserByAuthor)(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return "failed";
        }
        return new Promise((resolve) => {
            const sql = `INSERT INTO daily.counter VALUES ('${user}', '${date}');`;
            this.databasePool.execute("daily", sql, (_result) => {
                resolve("success");
            }, (err) => {
                messageList.push({ code: -1, text: err });
                resolve("failed");
            });
        });
    }
    async _getTime(query, messageList) {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        if (!author || !key) {
            messageList.push({ code: -1, text: "lost authorization" });
            return null;
        }
        const user = await (0, AuthorHelper_1.getUserByAuthor)(this.databasePool, author, key, messageList);
        if (!user) {
            messageList.push({ code: -1, text: "no authorization" });
            return null;
        }
        return new Promise((resolve) => {
            const sql = `SELECT \`date\` FROM daily.counter WHERE user='${user}';`;
            this.databasePool.execute("daily", sql, (result) => {
                let time = {
                    neg: false,
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
                    time.neg = target.getTime() < current.getTime();
                    const timeSpan = (time.neg ? -1 : 1) * target.getTime() - current.getTime();
                    time.milisec = (timeSpan % 1000).toString();
                    time.sec = Math.trunc((timeSpan / 1000) % 60).toString();
                    time.min = Math.trunc((timeSpan / 60000) % 60).toString();
                    time.hour = Math.trunc((timeSpan / 3600000) % 24).toString();
                    time.day = Math.trunc(timeSpan / 3600000 / 24).toString();
                    time.formatted = `${time.day}:${time.hour}:${time.min}:${time.sec}.${time.milisec}`;
                }
                resolve(time);
            }, (error) => {
                messageList.push({ code: -1000, text: error });
                resolve(null);
            });
        });
    }
}
exports.CountDownDispatcher = CountDownDispatcher;

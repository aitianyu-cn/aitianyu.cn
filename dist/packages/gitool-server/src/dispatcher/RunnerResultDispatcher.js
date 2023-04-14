"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerResultDispatcher = void 0;
const Error_1 = require("../common/Error");
class RunnerResultDispatcher {
    constructor(dbPool) {
        this.databasePools = dbPool;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/git/tool/helper/running", this._onRunning.bind(this));
        handler.setRouter("aitianyu/cn/git/tool/helper/get-results", this._getResults.bind(this));
    }
    async _getResults(query, messageList) {
        const serverId = query.query["server"] || "";
        const tokenId = query.query["token"] || "";
        const limit = Number(query.query["limit"]) || 1000;
        const verification = await this.__verifyServer(serverId, tokenId);
        if (!verification) {
            messageList.push({ code: Error_1.Errors.ACCESSIBLE, text: "you do not have accessible for get results" });
            return [];
        }
        return new Promise((resolve) => {
            const sql = `SELECT * FROM \`git-helper\`.running ORDER BY \`server\` ASC LIMIT ${limit}`;
            this.databasePools.execute("git-helper", sql, (results) => {
                const runnings = [];
                if (Array.isArray(results) && results.length > 0) {
                    for (const result of results) {
                        if (!!!result["server"] && !!!result["times"]) {
                            runnings.push({
                                server: result["server"],
                                times: result["times"],
                                result: !!result["result"],
                                message: result["message"] || "",
                            });
                        }
                    }
                }
                resolve(runnings);
            }, (error) => {
                messageList.push({ code: Error_1.Errors.ERROR, text: error });
                resolve([]);
            });
        });
    }
    async _onRunning(query, messageList) {
        try {
            const serverId = query.query["server"] || "";
            const tokenId = query.query["token"] || "";
            const verifyServer = await this.__verifyServer(serverId, tokenId);
            if (!verifyServer) {
                return "failure";
            }
            await this.__writeToDB(serverId, {
                times: query.query["times"],
                result: !!query.query["result"],
                message: query.query["message"] || "",
            });
            return "success";
        }
        catch (e) {
            messageList.push({ code: Error_1.Errors.ERROR, text: e?.message || "error" });
            return "failure";
        }
    }
    async __writeToDB(server, result) {
        if (!!!server || !!!result.times) {
            return;
        }
        return new Promise((resolve) => {
            const sql = `INSERT INTO \`git-helper\`.running VALUES ('${server}', '${result.times}', '${result.result ? 1 : 0}', '${result.message}');`;
            this.databasePools.execute("git-helper", sql, resolve, (_error) => {
                resolve();
            });
        });
    }
    async __verifyServer(server, token) {
        return new Promise((resolve) => {
            if (!!!server || !!!token) {
                resolve(false);
                return;
            }
            const sql = `SELECT * FROM \`git-helper\`.authorize WHERE server='${server}' AND token='${token}' AND valid='1';`;
            this.databasePools.execute("git-helper", sql, (result) => {
                const publicPath = Array.isArray(result) && result.length > 0 ? result[0].public ?? "" : null;
                resolve(!!publicPath);
            }, (_error) => {
                resolve(false);
            });
        });
    }
}
exports.RunnerResultDispatcher = RunnerResultDispatcher;

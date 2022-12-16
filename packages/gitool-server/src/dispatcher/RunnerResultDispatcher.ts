/**@format */

import { DatabasePools, HttpHandler, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { Errors } from "../common/Error";
import { IGetRunningResult, IGitRunningResult } from "../common/Types";

export class RunnerResultDispatcher {
    private databasePools: DatabasePools;

    public constructor(dbPool: DatabasePools) {
        this.databasePools = dbPool;
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/git/tool/helper/running", this._onRunning.bind(this));
        handler.setRouter("aitianyu/cn/git/tool/helper/get-results", this._getResults.bind(this));
    }

    private async _getResults(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<IGetRunningResult[]> {
        const serverId: string = query.query["server"] || "";
        const tokenId: string = query.query["token"] || "";
        const limit: number = Number(query.query["limit"]) || 1000;

        const verification = await this.__verifyServer(serverId, tokenId);
        if (!verification) {
            messageList.push({ code: Errors.ACCESSIBLE, text: "you do not have accessible for get results" });
            return [];
        }

        return new Promise<IGetRunningResult[]>((resolve) => {
            const sql = `SELECT * FROM \`git-helper\`.running ORDER BY \`server\` ASC LIMIT ${limit}`;
            this.databasePools.execute(
                "git-helper",
                sql,
                (results: any) => {
                    const runnings: IGetRunningResult[] = [];
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
                },
                (error: string) => {
                    messageList.push({ code: Errors.ERROR, text: error });
                    resolve([]);
                },
            );
        });
    }

    private async _onRunning(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
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
        } catch (e) {
            messageList.push({ code: Errors.ERROR, text: (e as any)?.message || "error" });
            return "failure";
        }
    }

    private async __writeToDB(server: string, result: IGitRunningResult): Promise<void> {
        if (!!!server || !!!result.times) {
            return;
        }

        return new Promise<void>((resolve) => {
            const sql = `INSERT INTO \`git-helper\`.running VALUES ('${server}', '${result.times}', '${
                result.result ? 1 : 0
            }', '${result.message}');`;

            this.databasePools.execute("git-helper", sql, resolve, (_error: string) => {
                resolve();
            });
        });
    }

    private async __verifyServer(server: string, token: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (!!!server || !!!token) {
                resolve(false);
                return;
            }

            const sql = `SELECT * FROM \`git-helper\`.authorize WHERE server='${server}' AND token='${token}' AND valid='1';`;
            this.databasePools.execute(
                "git-helper",
                sql,
                (result: any) => {
                    const publicPath = Array.isArray(result) && result.length > 0 ? result[0].public ?? "" : null;
                    resolve(!!publicPath);
                },
                (_error: string) => {
                    resolve(false);
                },
            );
        });
    }
}

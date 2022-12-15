/**@format */

import { DatabasePools, HttpHandler, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { MapOfType } from "@aitianyu.cn/types";
import { GitSourcePerUserPeriod, IGitSourceRepo, IGitSourceResponse } from "../common/Types";

type UsersConfigType = MapOfType<{ period: GitSourcePerUserPeriod | null; excludes: string[] }>;

export class GitToolDispatcher {
    private databasePools: DatabasePools;

    public constructor(dbPool: DatabasePools) {
        this.databasePools = dbPool;
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/git/tool/helper/source", this._getGitHelperProcessSource.bind(this));
    }

    private async _getGitHelperProcessSource(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<IGitSourceResponse> {
        return new Promise<IGitSourceResponse>(async (resolve) => {
            const result: IGitSourceResponse = { valid: true, publicPath: "", sources: {} };

            try {
                const serverId = query.query["server"] || "";
                const tokenId = query.query["token"] || "";
                const publicPath = await this.__verifyServer(serverId, tokenId);
                if (typeof publicPath === "string") {
                    result.publicPath = publicPath;
                    const users: string[] = await this.__getAllUsersOfServer(serverId);
                    const userConfigs: UsersConfigType = await this.__getAllUsersConfig(users);
                    for (const user of Object.keys(userConfigs)) {
                        const repos: MapOfType<IGitSourceRepo> = await this.__getReposOfUser(user);
                        result.sources[user] = {
                            period: userConfigs[user].period,
                            excludes: userConfigs[user].excludes,
                            repos: repos,
                        };
                    }
                } else {
                    result.valid = false;
                }
            } finally {
                resolve(result);
            }
        });
    }

    private async __getReposOfUser(user: string): Promise<MapOfType<IGitSourceRepo>> {
        return new Promise<MapOfType<IGitSourceRepo>>((resolve) => {
            const repos: MapOfType<IGitSourceRepo> = {};
            if (!!!user) {
                resolve(repos);
                return;
            }

            const sql = `SELECT * FROM \`git-helper\`.repos WHERE user='${user}';`;
            this.databasePools.execute(
                "git-helper",
                sql,
                (result: any) => {
                    if (Array.isArray(result) && result.length > 0) {
                        for (const item of result) {
                            const repo: string = item["repo"] || "";
                            const ssh: boolean = item["ssh"] === 1;
                            const remote: string = item["remote"] || "";
                            const excludes: string = item["excludes"] || "";

                            if (!!repo && !!remote) {
                                repos[repo] = {
                                    ssh: ssh,
                                    remote: remote,
                                    excludes: excludes.split(","),
                                };
                            }
                        }
                    }

                    resolve(repos);
                },
                (_error: string) => {
                    resolve(repos);
                },
            );
        });
    }

    private async __getAllUsersConfig(users: string[]): Promise<UsersConfigType> {
        return new Promise<UsersConfigType>((resolve) => {
            const configs: UsersConfigType = {};
            if (users.length === 0) {
                resolve(configs);
                return;
            }

            const sql = `SELECT * FROM \`git-helper\`.configure WHERE user in ('${users.join("','")}');`;
            this.databasePools.execute(
                "git-helper",
                sql,
                (result: any) => {
                    if (Array.isArray(result) && result.length > 0) {
                        for (const item of result) {
                            const user: string = item["user"] || "";
                            const period: GitSourcePerUserPeriod = (item["period"] as GitSourcePerUserPeriod) || null;
                            const exclude: string = item["excludes"] || "";
                            if (!!user) {
                                configs[user] = {
                                    period: period,
                                    excludes: exclude.split(","),
                                };
                            }
                        }
                    }

                    resolve(configs);
                },
                (_error: string) => {
                    resolve(configs);
                },
            );
        });
    }

    private async __getAllUsersOfServer(server: string): Promise<string[]> {
        return new Promise<string[]>((resolve) => {
            const users: string[] = [];

            if (!!server) {
                const sql = `SELECT * FROM \`git-helper\`.accessible WHERE server='${server}' AND valid='1';`;
                this.databasePools.execute(
                    "git-helper",
                    sql,
                    (result: any) => {
                        if (Array.isArray(result) && result.length > 0) {
                            for (const item of result) {
                                const user = item["user"];
                                user && users.push(user);
                            }
                        }

                        resolve(users);
                    },
                    (_error: string) => {
                        resolve(users);
                    },
                );
            }
        });
    }

    private async __verifyServer(server: string, token: string): Promise<string | null> {
        return new Promise<string | null>((resolve) => {
            if (!!!server || !!!token) {
                resolve(null);
                return;
            }

            const sql = `SELECT * FROM \`git-helper\`.authorize WHERE server='${server}' AND token='${token}';`;
            this.databasePools.execute(
                "git-helper",
                sql,
                (result: any) => {
                    const publicPath = Array.isArray(result) && result.length > 0 ? result[0].public ?? "" : null;
                    resolve(publicPath);
                },
                (_error: string) => {
                    resolve(null);
                },
            );
        });
    }
}

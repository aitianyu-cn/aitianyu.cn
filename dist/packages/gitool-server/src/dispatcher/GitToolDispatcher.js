"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitToolDispatcher = void 0;
class GitToolDispatcher {
    constructor(dbPool) {
        this.databasePools = dbPool;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/git/tool/helper/source", this._getGitHelperProcessSource.bind(this));
    }
    async _getGitHelperProcessSource(query, messageList) {
        return new Promise(async (resolve) => {
            const result = { valid: true, publicPath: "", sources: {} };
            try {
                const serverId = query.query["server"] || "";
                const tokenId = query.query["token"] || "";
                const publicPath = await this.__verifyServer(serverId, tokenId);
                if (typeof publicPath === "string") {
                    result.publicPath = publicPath;
                    const users = await this.__getAllUsersOfServer(serverId);
                    const userConfigs = await this.__getAllUsersConfig(users);
                    for (const user of Object.keys(userConfigs)) {
                        const repos = await this.__getReposOfUser(user);
                        result.sources[user] = {
                            period: userConfigs[user].period,
                            excludes: userConfigs[user].excludes,
                            repos: repos,
                        };
                    }
                }
                else {
                    result.valid = false;
                }
            }
            finally {
                resolve(result);
            }
        });
    }
    async __getReposOfUser(user) {
        return new Promise((resolve) => {
            const repos = {};
            if (!!!user) {
                resolve(repos);
                return;
            }
            const sql = `SELECT * FROM \`git-helper\`.repos WHERE user='${user}';`;
            this.databasePools.execute("git-helper", sql, (result) => {
                if (Array.isArray(result) && result.length > 0) {
                    for (const item of result) {
                        const repo = item["repo"] || "";
                        const ssh = item["ssh"] === 1;
                        const remote = item["remote"] || "";
                        const excludes = item["excludes"] || "";
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
            }, (_error) => {
                resolve(repos);
            });
        });
    }
    async __getAllUsersConfig(users) {
        return new Promise((resolve) => {
            const configs = {};
            if (users.length === 0) {
                resolve(configs);
                return;
            }
            const sql = `SELECT * FROM \`git-helper\`.configure WHERE user in ('${users.join("','")}');`;
            this.databasePools.execute("git-helper", sql, (result) => {
                if (Array.isArray(result) && result.length > 0) {
                    for (const item of result) {
                        const user = item["user"] || "";
                        const period = item["period"] || null;
                        const exclude = item["excludes"] || "";
                        if (!!user) {
                            configs[user] = {
                                period: period,
                                excludes: exclude.split(","),
                            };
                        }
                    }
                }
                resolve(configs);
            }, (_error) => {
                resolve(configs);
            });
        });
    }
    async __getAllUsersOfServer(server) {
        return new Promise((resolve) => {
            const users = [];
            if (!!server) {
                const sql = `SELECT * FROM \`git-helper\`.accessible WHERE server='${server}' AND valid='1';`;
                this.databasePools.execute("git-helper", sql, (result) => {
                    if (Array.isArray(result) && result.length > 0) {
                        for (const item of result) {
                            const user = item["user"];
                            user && users.push(user);
                        }
                    }
                    resolve(users);
                }, (_error) => {
                    resolve(users);
                });
            }
        });
    }
    async __verifyServer(server, token) {
        return new Promise((resolve) => {
            if (!!!server || !!!token) {
                resolve(null);
                return;
            }
            const sql = `SELECT * FROM \`git-helper\`.authorize WHERE server='${server}' AND token='${token}';`;
            this.databasePools.execute("git-helper", sql, (result) => {
                const publicPath = Array.isArray(result) && result.length > 0 ? result[0].public ?? "" : null;
                resolve(publicPath);
            }, (_error) => {
                resolve(null);
            });
        });
    }
}
exports.GitToolDispatcher = GitToolDispatcher;

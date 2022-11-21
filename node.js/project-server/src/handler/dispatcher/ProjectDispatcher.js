/**@format */

const DatabasePools = require("../../service/DatabasePools");
const I18nReader = require("../../i18n/I18nReader");
const HttpHandler = require("../HttpHandler");
const path = require("path");

class ProjectDispatcher {
    /**
     *
     * @param {DatabasePools} dbPool
     * @param {I18nReader} i18n
     */
    constructor(dbPool, i18n) {
        this.databasePool = dbPool;
        this.i18nReader = i18n;

        this.projectDBMap = {};
    }

    /**
     *
     * @param {HttpHandler} handler
     */
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/project/all", this._allProjectsDispatcher.bind(this));
        handler.setRouter("aitianyu/cn/project/download/all", this._projectDownloadsDispatcher.bind(this));
        handler.setRouter("aitianyu/cn/project/document/all", this._projectBrowserDispatcher.bind(this));
        handler.setRouter("aitianyu/cn/project/document/macrodef", this._projectMacrodefDispatcher.bind(this));
    }

    /**
     *
     * @param {{lang: string, query: any}} query
     * @param {string[]} messageList
     *
     * @return {Promise<any[]>}
     */
    async _allProjectsDispatcher(query, messageList) {
        return new Promise((resolve) => {
            this.__getAllProjects(messageList).then((projects) => {
                try {
                    const i18n = this.i18nReader.get(query.lang, "project");
                    const formattedProjects = [];
                    for (const project of projects) {
                        const formattedItem = {
                            key: project.key,
                            project: project.project,
                            name: encodeURI(i18n[project.name] || project.name),
                            desc: encodeURI(i18n[project.desc] || project.desc),
                            github: project.github,
                        };

                        formattedProjects.push(formattedItem);
                    }

                    resolve(formattedProjects);
                } catch (e) {
                    messageList.push(e.message);
                    resolve(null);
                }
            });
        });
    }

    /**
     *
     * @param {{lang: string, query: any}} query
     * @param {string[]} messageList
     *
     * @return {Promise<any>}
     */
    async _projectDownloadsDispatcher(query, messageList) {
        return new Promise((resolve) => {
            this.__getAllProjects(messageList).then((projects) => {
                const downloadItems = [];
                const i18n = this.i18nReader.get(query.lang, "project");

                let oPromise = Promise.resolve();
                for (const project of projects) {
                    const sql =
                        "SELECT `system`, `name`, `address`, `url` FROM aitianyu_base.project_downloads where `key`='" +
                        project.key +
                        "';";

                    oPromise = oPromise.then(() => {
                        return new Promise((resolve) => {
                            this.databasePool.execute(
                                "aitianyu_base",
                                sql,
                                (results) => {
                                    const downloadItem = {
                                        key: project.key,
                                        project: project.project,
                                        name: encodeURI(i18n[project.name] || project.name),
                                        desc: encodeURI(i18n[project.desc] || project.desc),
                                        github: project.github,
                                    };

                                    const binaries = {};
                                    if (Array.isArray(results)) {
                                        for (const bins of results) {
                                            try {
                                                const system = bins.system;
                                                const name = bins.name;
                                                const address = bins.address;
                                                const url = bins.url;

                                                if (!!!binaries[system]) binaries[system] = {};
                                                binaries[system][name] = { address: address, url: url };
                                            } catch {}
                                        }
                                    }

                                    downloadItem["binary"] = binaries;
                                    downloadItems.push(downloadItem);

                                    resolve();
                                },
                                (error) => {
                                    messageList.push(error);
                                    resolve();
                                },
                            );
                        });
                    });
                }

                oPromise.finally(() => {
                    resolve(downloadItems);
                });
            });
        });
    }

    /**
     *
     * @param {{lang: string, query: any}} query
     * @param {string[]} messageList
     *
     * @return {Promise<any>}
     */
    async _projectBrowserDispatcher(query, messageList) {
        return new Promise((resolve) => {
            this.__getAllProjects(messageList).then((projects) => {
                try {
                    const projectBrowers = [];
                    const i18n = this.i18nReader.get(query.lang, "project");
                    let oPromise = Promise.resolve();

                    for (const project of projects) {
                        const sql = "SELECT `item` FROM aitianyu_base.project_options where `key`='" + project.key + "';";
                        oPromise = oPromise.then(() => {
                            return new Promise((res) => {
                                this.databasePool.execute(
                                    "aitianyu_base",
                                    sql,
                                    (results) => {
                                        const projectItem = {
                                            key: project.key,
                                            project: project.project,
                                            name: encodeURI(i18n[project.name] || project.name),
                                            desc: encodeURI(i18n[project.desc] || project.desc),
                                            options: [],
                                        };

                                        if (Array.isArray(results)) {
                                            for (const item of results) {
                                                if (item?.item) projectItem.options.push(item.item);
                                            }
                                        }

                                        projectBrowers.push(projectItem);
                                        res();
                                    },
                                    (error) => {
                                        messageList.push(error);
                                        res();
                                    },
                                );
                            });
                        });
                    }

                    oPromise.finally(() => {
                        resolve(projectBrowers);
                    });
                } catch (e) {
                    messageList.push(e.message);
                    resolve(null);
                }
            });
        });
    }

    /**
     *
     * @param {string[]} messageList
     *
     * @return {Promise<any[]>}
     */
    async __getAllProjects(messageList) {
        return new Promise((resolve) => {
            this.databasePool.execute(
                "aitianyu_base",
                "SELECT * FROM aitianyu_base.projects;",
                (results) => {
                    const projects = [];
                    if (Array.isArray(results)) {
                        for (const item of results) {
                            try {
                                if (item.enable !== 1) {
                                    continue;
                                }
                                const project = {
                                    key: item.key,
                                    project: item.project,
                                    name: item.name,
                                    desc: item.desc,
                                    github: item.github,
                                    database: item.db,
                                };
                                if (!!item.db && !!!this.projectDBMap[item.key]) {
                                    this.projectDBMap[item.key] = item.db;
                                }

                                projects.push(project);
                            } catch {}
                        }
                    }
                    resolve(projects);
                },
                (error) => {
                    messageList.push(error);
                    resolve(null);
                },
            );
        });
    }

    /**
     *
     * @param {{lang: string, query: any}} query
     * @param {string[]} messageList
     *
     * @return {Promise<any>}
     */
    async _projectMacrodefDispatcher(query, messageList) {
        return new Promise((resolve) => {
            if (!!!query.query?.["project"]) {
                messageList.push("error: no project name provided");
                resolve(null);
                return;
            }

            const project = query.query["project"];
            if (!!!this.projectDBMap[project]) {
                messageList.push(`error: macro-def is not supported for ${project}`);
                resolve(null);
                return;
            }

            const dbName = this.projectDBMap[project];
            try {
                const sql = "SELECT * FROM " + dbName + ".macrodef;";
                const i18nReader = this.i18nReader.get(query.lang, "project");

                this.databasePool.execute(
                    dbName,
                    sql,
                    (macrodefs) => {
                        const macrodefinitions = [];
                        for (const def of macrodefs) {
                            try {
                                const definition = {
                                    macro: def.macro,
                                    value: def.value,
                                    file: def.file,
                                    i18n: encodeURI(i18nReader[def.macro] || def.macro),
                                };
                                macrodefinitions.push(definition);
                            } catch {}
                        }

                        resolve(macrodefinitions);
                    },
                    (error) => {
                        messageList.push(error);
                        resolve(null);
                    },
                );
            } catch (e) {
                messageList.push(e.message);
                resolve(null);
            }
        });
    }
}

module.exports = ProjectDispatcher;

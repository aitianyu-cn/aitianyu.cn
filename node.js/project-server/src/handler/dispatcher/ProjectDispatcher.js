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
        handler.setRouter("aitianyu/cn/project/document/macro", this._projectMacrodefDispatcher.bind(this));
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
                const baseI18n = this.i18nReader.get(query.lang, "base");

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

                                                if (!!!binaries[system]) {
                                                    const systemNameKey = system.toUpperCase();
                                                    binaries[system] = {
                                                        name: encodeURI(baseI18n[systemNameKey] || systemNameKey),
                                                    };
                                                }
                                                binaries[system][name] = {
                                                    address: address,
                                                    url: url,
                                                    name: name,
                                                };
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
                    const baseI18n = this.i18nReader.get(query.lang, "base");
                    let oPromise = Promise.resolve();

                    for (const project of projects) {
                        const sql = "SELECT `item`, `path` FROM aitianyu_base.project_options where `key`='" + project.key + "';";
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
                                            options: {},
                                        };

                                        if (Array.isArray(results)) {
                                            for (const item of results) {
                                                if (item?.item) {
                                                    const itemKey = item.item.toUpperCase();
                                                    projectItem.options[item.item] = {
                                                        name: encodeURI(baseI18n[itemKey] || item.item),
                                                        target: item.path,
                                                    };
                                                }
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
                                if (!!item.db && (!!!this.projectDBMap[item.key] || this.projectDBMap[item.key] !== item.db)) {
                                    const oldDb = this.projectDBMap[item.key] || "";
                                    this.projectDBMap[item.key] = item.db;

                                    this.databasePool.delete(oldDb);
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
            const hasProject = !!this.projectDBMap[project];
            const oPromise = !hasProject ? this.__getAllProjects(messageList) : Promise.resolve();

            oPromise.finally(() => {
                if (!!!this.projectDBMap[project]) {
                    messageList.push(`error: macro-def is not supported for ${project}`);
                    resolve(null);
                    return;
                }

                const dbName = this.projectDBMap[project];
                try {
                    const sql = "SELECT * FROM " + dbName + ".macrodef;";
                    const i18nReader = this.i18nReader.get(query.lang, "project");
                    const baseI18n = this.i18nReader.get(query.lang, "base");

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

                            resolve({
                                data: macrodefinitions,
                                title: encodeURI(baseI18n["MACRO_DEFINE_TITLE"] || "Macro-Def List"),
                            });
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
        });
    }
    /**
     *
     * @param {{lang: string, query: any}} query
     * @param {string[]} messageList
     *
     * @return {Promise<any>}
     */
    async _projectAPIBrowserDispatcher(query, messageList) {
        /**
         * 定义query
         *  {
         *      project: project name,
         *      namespace?: namespace name
         *      member?: member name
         *      item?: member item
         *  }
         */

        return new Promise((resolve) => {
            const language = query.lang;
            const project = query.query?.["project"] || "";
            const space = query.query?.["namespace"] || "";
            const member = query.query?.["member"] || "";
            // const memberItem = query.query?.["item"] || "";

            if (!!!project) {
                messageList.push("error: no project name provided");
                resolve(null);
                return;
            }

            if (!!!space && !!!member && !!!memberItem) {
                // basic - get namespace
                this.__projectAPIBrowser_Basic(project, language).then((results) => {
                    resolve(results);
                });
                return;
            }

            if (!!space && !!!member && !!!memberItem) {
                // namespace - get members inner namespace
                this.__projectAPIBrowser_Namespace(project, space, language).then((results) => {
                    resolve(results);
                });
                return;
            }

            if (!!space && !!member && !!!memberItem) {
                // member - get all items inner member
                this.__projectAPIBrowser_Member(project, space, member, language).then((results) => {
                    resolve(results);
                });
                return;
            }

            // if (!!space && !!member && !!memberItem) {
            //     // member item - get item details of member item
            //     return;
            // }

            messageList.push("error: no matched any parameter, invalid operation");
            resolve(null);
            return;
        });
    }

    /**
     *
     * @param {string} projectName
     * @param {string} language
     *
     * @return {any}
     */
    async __projectAPIBrowser_Basic(projectName, language) {}

    /**
     *
     * @param {string} projectName
     * @param {string} package
     * @param {string} language
     *
     * @return {any}
     */
    async __projectAPIBrowser_Namespace(projectName, package, language) {}

    /**
     *
     * @param {string} projectName
     * @param {string} package
     * @param {string} member
     * @param {string} language
     *
     * @return {any}
     */
    async __projectAPIBrowser_Member(projectName, package, member, language) {}
}

module.exports = ProjectDispatcher;

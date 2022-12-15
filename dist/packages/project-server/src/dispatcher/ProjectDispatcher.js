"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDispatcher = void 0;
const server_base_1 = require("@aitianyu.cn/server-base");
const Errors_1 = require("../common/Errors");
const _download_excludes = ["node-modules"];
function ___processProjectPackMemberName(member) {
    let translatedName = member;
    if (/\.*\_[0-9]+/.test(translatedName)) {
        let index = translatedName.length - 1;
        for (; index >= 0;) {
            if ("0" <= translatedName[index] && "9" >= translatedName[index]) {
                --index;
            }
            else {
                break;
            }
        }
        translatedName = translatedName.substring(0, index);
    }
    return translatedName;
}
function ___processProjectMemberItem(source) {
    const result = { key: source.name, name: "", i18n: source.i18n, def: source.define, type: "" };
    let translatedName = result.key || "";
    let translatedType = source.prototype;
    if (translatedName.toLowerCase().startsWith("construct")) {
        translatedType = "construct";
    }
    else if (result.def.toLowerCase().includes("operator")) {
        translatedType = "operator";
        const translatedNameLower = translatedName.toLowerCase();
        switch (translatedNameLower) {
            case "operator_ass":
                translatedName = "operator =";
                break;
            case "operator_eq":
                translatedName = "operator ==";
                break;
            case "operator_ne":
                translatedName = "operator !=";
                break;
            case "operator_lt":
                translatedName = "operator <";
                break;
            case "operator_le":
                translatedName = "operator <=";
                break;
            case "operator_gt":
                translatedName = "operator >";
                break;
            case "operator_ge":
                translatedName = "operator >=";
                break;
            case "operator_add":
                translatedName = "operator +";
                break;
            case "operator_add_ass":
                translatedName = "operator +=";
                break;
            case "operator_sub":
                translatedName = "operator -";
                break;
            case "operator_sub_ass":
                translatedName = "operator -=";
                break;
            case "operator_mul":
                translatedName = "operator *";
                break;
            case "operator_mul_ass":
                translatedName = "operator *=";
                break;
            case "operator_div":
                translatedName = "operator /";
                break;
            case "operator_div_ass":
                translatedName = "operator /=";
                break;
            case "operator_mod":
                translatedName = "operator %";
                break;
            case "operator_mod_ass":
                translatedName = "operator %=";
                break;
            case "operator_aand":
                translatedName = "operator &";
                break;
            case "operator_aand_ass":
                translatedName = "operator &=";
                break;
            case "operator_aor":
                translatedName = "operator |";
                break;
            case "operator_aor_ass":
                translatedName = "operator |=";
                break;
            case "operator_axor":
                translatedName = "operator ^";
                break;
            case "operator_axor_ass":
                translatedName = "operator ^=";
                break;
            case "operator_lmove":
                translatedName = "operator <<";
                break;
            case "operator_lmove_ass":
                translatedName = "operator <<=";
                break;
            case "operator_rmove":
                translatedName = "operator >>";
                break;
            case "operator_rmove_ass":
                translatedName = "operator >>=";
                break;
            case "operator_anot":
                translatedName = "operator ~";
                break;
            case "operator_lnot":
                translatedName = "operator !";
                break;
            case "operator_sd":
                translatedName = "operator --";
                break;
            case "operator_si":
                translatedName = "operator ++";
                break;
            case "operator_land":
                translatedName = "operator &&";
                break;
            case "operator_land_ass":
                translatedName = "operator &&=";
                break;
            case "operator_lor":
                translatedName = "operator |=";
                break;
            case "operator_lor_ass":
                translatedName = "operator ||=";
                break;
            default:
                if (!translatedNameLower.includes("operator")) {
                    translatedName = `(${translatedName})`;
                }
                break;
        }
    }
    result.name = translatedName;
    result.type = translatedType;
    return result;
}
class ProjectDispatcher {
    constructor(dbPool, i18n) {
        this.databasePool = dbPool;
        this.i18nReader = i18n;
        this.projectDBMap = {};
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/project/all", this._allProjectsDispatcher.bind(this));
        handler.setRouter("aitianyu/cn/project/download/all", this._projectDownloadsDispatcher.bind(this));
        handler.setRouter("aitianyu/cn/project/document/all", this._projectBrowserDispatcher.bind(this));
        handler.setRouter("aitianyu/cn/project/document/macro", this._projectMacrodefDispatcher.bind(this));
        handler.setRouter("aitianyu/cn/project/document/api", this._projectAPIBrowserDispatcher.bind(this));
    }
    async _allProjectsDispatcher(query, messageList) {
        return new Promise((resolve) => {
            this.__getAllProjects(messageList).then((projects) => {
                try {
                    const formattedProjects = [];
                    for (const project of projects) {
                        const i18n = this.i18nReader.get(query.lang, `project/${project.key}`);
                        const formattedItem = {
                            key: project.key,
                            project: project.project,
                            name: encodeURI(i18n[project.name] || project.name),
                            desc: encodeURI(i18n[project.desc] || project.desc),
                            github: project.github,
                            type: project.type || null,
                        };
                        formattedProjects.push(formattedItem);
                    }
                    resolve(formattedProjects);
                }
                catch (e) {
                    messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                    resolve(null);
                }
            });
        });
    }
    async _projectDownloadsDispatcher(query, messageList) {
        return new Promise((resolve) => {
            this.__getAllProjects(messageList).then((projects) => {
                const downloadItems = [];
                const baseI18n = this.i18nReader.get(query.lang, "base");
                let oPromise = Promise.resolve();
                for (const project of projects) {
                    const type = project.type || "";
                    if (_download_excludes.includes(type))
                        continue;
                    const i18n = this.i18nReader.get(query.lang, `project/${project.key}`);
                    const sql = "SELECT `system`, `name`, `address`, `url` FROM aitianyu_base.project_downloads where `key`='" +
                        project.key +
                        "';";
                    oPromise = oPromise.then(() => {
                        return new Promise((resolve) => {
                            this.databasePool.execute("aitianyu_base", sql, (results) => {
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
                                                    source: [],
                                                };
                                            }
                                            binaries[system].source.push({
                                                address: address,
                                                url: url,
                                                name: name,
                                            });
                                        }
                                        catch { }
                                    }
                                }
                                downloadItem["binary"] = binaries;
                                downloadItems.push(downloadItem);
                                resolve();
                            }, (error) => {
                                messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                                resolve();
                            });
                        });
                    });
                }
                oPromise.finally(() => {
                    resolve(downloadItems);
                });
            });
        });
    }
    async _projectBrowserDispatcher(query, messageList) {
        return new Promise((resolve) => {
            this.__getAllProjects(messageList).then((projects) => {
                try {
                    const projectBrowers = [];
                    const baseI18n = this.i18nReader.get(query.lang, "base");
                    let oPromise = Promise.resolve();
                    for (const project of projects) {
                        const i18n = this.i18nReader.get(query.lang, `project/${project.key}`);
                        const sql = "SELECT `item`, `path` FROM aitianyu_base.project_options where `key`='" + project.key + "';";
                        oPromise = oPromise.then(() => {
                            return new Promise((res) => {
                                this.databasePool.execute("aitianyu_base", sql, (results) => {
                                    const projectItem = {
                                        key: project.key,
                                        project: project.project,
                                        name: encodeURI(i18n[project.name] || project.name),
                                        desc: encodeURI(i18n[project.desc] || project.desc),
                                        type: project.type || null,
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
                                }, (error) => {
                                    messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                                    res();
                                });
                            });
                        });
                    }
                    oPromise.finally(() => {
                        resolve(projectBrowers);
                    });
                }
                catch (e) {
                    messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                    resolve(null);
                }
            });
        });
    }
    async __getAllProjects(messageList) {
        return new Promise((resolve) => {
            try {
                this.databasePool.execute("aitianyu_base", "SELECT * FROM aitianyu_base.projects;", (results) => {
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
                                    type: item.type,
                                };
                                if (!!item.db &&
                                    (!!!this.projectDBMap[item.key] || this.projectDBMap[item.key] !== item.db)) {
                                    const oldDb = this.projectDBMap[item.key] || "";
                                    this.projectDBMap[item.key] = item.db;
                                    this.databasePool.delete(oldDb);
                                }
                                projects.push(project);
                            }
                            catch { }
                        }
                    }
                    resolve(projects);
                }, (error) => {
                    messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                    resolve([]);
                });
            }
            catch (e) {
                messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                resolve([]);
            }
        });
    }
    async _projectMacrodefDispatcher(query, messageList) {
        return new Promise((resolve) => {
            if (!!!query.query?.["project"]) {
                messageList.push({ code: Errors_1.PROJECT_ERROR_CODE.NO_PROJECT_NAME, text: "error: no project name provided" });
                resolve(null);
                return;
            }
            const project = query.query["project"];
            const showAll = !!query.query["showAll"];
            const requirePage = showAll ? 1 : Number.parseInt(query.query["page"]) || 1;
            const pageSize = Number(query.query["size"]) || 30;
            const hasProject = !!this.projectDBMap[project];
            const oPromise = !hasProject ? this.__getAllProjects(messageList) : Promise.resolve();
            oPromise.finally(() => {
                if (!!!this.projectDBMap[project]) {
                    messageList.push({
                        code: Errors_1.PROJECT_ERROR_CODE.NOT_SUPPORT_MACRO_DEF,
                        text: `error: macro-def is not supported for ${project}`,
                    });
                    resolve(null);
                    return;
                }
                const dbName = this.projectDBMap[project];
                const getTotalPromise = new Promise((done) => {
                    const sql = "SELECT count(*) as total FROM " + dbName + ".macrodef;";
                    this.databasePool.execute(dbName, sql, (totalRec) => {
                        let total = 0;
                        for (const rec of totalRec) {
                            try {
                                total = rec["total"] || 0;
                            }
                            catch { }
                        }
                        done(total);
                    }, (error) => {
                        messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                        done(0);
                    });
                });
                getTotalPromise.then((totalRows) => {
                    const i18nReader = this.i18nReader.get(query.lang, `project/${project}`);
                    const baseI18n = this.i18nReader.get(query.lang, "base");
                    const startRow = showAll ? 0 : (requirePage - 1) * pageSize;
                    const totalPages = showAll ? 1 : Math.round(totalRows / pageSize);
                    if (showAll || (totalRows !== 0 && requirePage <= totalPages)) {
                        try {
                            const sql = "SELECT * FROM " +
                                dbName +
                                ".macrodef" +
                                (showAll ? ";" : " limit " + startRow + "," + pageSize + ";");
                            this.databasePool.execute(dbName, sql, (macrodefs) => {
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
                                    }
                                    catch { }
                                }
                                resolve({
                                    info: { totalPages: totalPages, currentPage: requirePage, totalRow: totalRows },
                                    data: macrodefinitions,
                                    title: encodeURI(baseI18n["MACRO_DEFINE_TITLE"] || "Macro-Def List"),
                                });
                            }, (error) => {
                                messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                                resolve(null);
                            });
                        }
                        catch (e) {
                            messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                            resolve(null);
                        }
                    }
                    else {
                        resolve({
                            info: { totalPages: totalPages, currentPage: requirePage, totalRow: totalRows },
                            data: [],
                            title: encodeURI(baseI18n["MACRO_DEFINE_TITLE"] || "Macro-Def List"),
                        });
                    }
                });
            });
        });
    }
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
                messageList.push({ code: Errors_1.PROJECT_ERROR_CODE.NO_PROJECT_NAME, text: "error: no project name provided" });
                resolve(null);
                return;
            }
            const hasProject = !!this.projectDBMap[project];
            const oPromise = !hasProject ? this.__getAllProjects(messageList) : Promise.resolve();
            oPromise.finally(() => {
                if (!!!this.projectDBMap[project]) {
                    messageList.push({
                        code: Errors_1.PROJECT_ERROR_CODE.NOT_SUPPORT_API,
                        text: `error: project api is not supported for ${project}`,
                    });
                    resolve(null);
                    return;
                }
                if (!!project && !!!space && !!!member) {
                    // basic - get namespace
                    this.__projectAPIBrowser_Basic(project, language, messageList).then((results) => {
                        resolve(results);
                    });
                    return;
                }
                if (!!project && !!space && !!!member) {
                    // namespace - get members inner namespace
                    this.__projectAPIBrowser_Namespace(project, space, language, messageList).then((results) => {
                        resolve(results);
                    });
                    return;
                }
                if (!!project && !!space && !!member) {
                    // member - get all items inner member
                    this.__projectAPIBrowser_Member(project, space, member, language, messageList).then((results) => {
                        resolve(results);
                    });
                    return;
                }
                messageList.push({
                    code: Errors_1.PROJECT_ERROR_CODE.INVALID_OPERATION,
                    text: "error: no matched any parameter, invalid operation",
                });
                resolve(null);
                return;
            });
        });
    }
    async __projectAPIBrowser_Basic(projectName, language, messageList) {
        return new Promise((resolve) => {
            const dbName = this.projectDBMap[projectName];
            try {
                const sql = "SELECT * FROM " + dbName + ".namespace;";
                const i18nReader = this.i18nReader.get(language, `project/${projectName}`);
                const i18nBasic = this.i18nReader.get(language, "base");
                this.databasePool.execute(dbName, sql, (results) => {
                    const apis = [];
                    if (Array.isArray(results)) {
                        for (const item of results) {
                            const api = {
                                name: item.name,
                                generic: encodeURI(i18nReader[item.key] || item.key || ""),
                                i18n: encodeURI(i18nReader[(item.key || "").toUpperCase()] || ""),
                            };
                            apis.push(api);
                        }
                    }
                    resolve({ api: apis, des: { title: encodeURI(i18nBasic["API_TITLE"]) || "" } });
                }, (error) => {
                    messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                    resolve(null);
                });
            }
            catch (e) {
                messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                resolve(null);
            }
        });
    }
    async __projectAPIBrowser_Namespace(projectName, pack, language, messageList) {
        return new Promise((resolve) => {
            const dbName = this.projectDBMap[projectName];
            const decodePach = decodeURI(pack);
            try {
                const sql = "SELECT `name` FROM " + dbName + ".types where namespace = '" + decodePach + "';";
                const i18n = this.i18nReader.get(language, `project/${projectName}`);
                this.databasePool.execute(dbName, sql, (results) => {
                    const items = [];
                    if (Array.isArray(results)) {
                        for (const item of results) {
                            const name = item.name;
                            const translatedName = ___processProjectPackMemberName(name);
                            if (translatedName && !items.includes(translatedName)) {
                                items.push(translatedName);
                            }
                        }
                    }
                    resolve(items);
                }, (error) => {
                    messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                    resolve(null);
                });
            }
            catch (e) {
                messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                resolve(null);
            }
        });
    }
    async __projectAPIBrowser_Member(projectName, pack, member, language, messageList) {
        return new Promise((resolve) => {
            const dbName = this.projectDBMap[projectName];
            const decodePach = decodeURI(pack);
            const decodeMember = decodeURI(member);
            try {
                this.___projectAPIBrowser_GetMemberDefinition(dbName, decodePach, decodeMember, messageList).then((result) => {
                    const memberDefinition = result.def;
                    const memberType = result.type;
                    if (!!!memberType || !Array.isArray(memberDefinition) || memberDefinition.length === 0) {
                        resolve([]);
                        return;
                    }
                    try {
                        const definition = {
                            memberDefs: [],
                            memberItems: {},
                            name: "",
                            type: "",
                            typeI18n: "",
                            namespace: pack,
                            project: projectName,
                        };
                        const i18n = this.i18nReader.get(language, `project/${projectName}`);
                        const i18nBasic = this.i18nReader.get(language, "base");
                        definition.name = member;
                        definition.type = memberType;
                        definition.typeI18n = encodeURI(i18nBasic[memberType.toUpperCase()] || memberType);
                        for (const def of memberDefinition) {
                            def.i18n = encodeURI(i18n[def.i18n] || def.i18n);
                            definition.memberDefs.push(def);
                        }
                        if (memberDefinition.length === 1 && memberType !== "function") {
                            this.___projectAPIBrowser_FillMemberItems(projectName, dbName, decodePach, decodeMember, language, messageList)
                                .then((memberItems) => {
                                definition.memberItems = memberItems;
                            })
                                .finally(() => {
                                resolve(definition);
                            });
                        }
                        else {
                            resolve(definition);
                        }
                    }
                    catch (e) {
                        messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                        resolve(null);
                    }
                });
            }
            catch (e) {
                messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                resolve(null);
            }
        });
    }
    async ___projectAPIBrowser_GetMemberDefinition(dbName, pack, member, messageList) {
        const sql = "SELECT `name`, `i18n`, `prototype`, `file`, `define` FROM " +
            dbName +
            ".types where namespace = '" +
            pack +
            "' and name like '" +
            member +
            "%';";
        try {
            return new Promise((resolve) => {
                let memberPrototype = "";
                this.databasePool.execute(dbName, sql, (results) => {
                    const items = [];
                    if (Array.isArray(results)) {
                        for (const item of results) {
                            memberPrototype = (!!!memberPrototype && item.prototype.toLowerCase()) || memberPrototype;
                            const def = {
                                name: item.name,
                                i18n: item.i18n,
                                file: item.file,
                                def: item.define,
                            };
                            items.push(def);
                            if (memberPrototype.toLowerCase() !== "function")
                                break;
                        }
                    }
                    resolve({ def: items, type: memberPrototype });
                }, (error) => {
                    messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                    resolve({ def: [], type: "" });
                });
            });
        }
        catch (e) {
            messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
            return { def: [], type: "" };
        }
    }
    async ___projectAPIBrowser_FillMemberItems(projectName, dbName, pack, member, language, messageList) {
        const sql = "SELECT `name`, `i18n`, `prototype`, `define` FROM " +
            dbName +
            ".container where namespace = '" +
            pack +
            "' and belong = '" +
            member +
            "';";
        const i18nBasic = this.i18nReader.get(language, "base");
        const items = {
            constructor: { title: encodeURI(i18nBasic["ITEM_CONSTRUCT"]) || "constructor", items: [] },
            property: { title: encodeURI(i18nBasic["ITEM_PROPERTY"]) || "property", items: [] },
            enum: { title: encodeURI(i18nBasic["ITEM_ENUM_VALUE"]) || "enum", items: [] },
            operator: { title: encodeURI(i18nBasic["ITEM_OPERATOR"]) || "operator", items: [] },
            method: { title: encodeURI(i18nBasic["ITEM_METHOD"]) || "method", items: [] },
            other: { title: encodeURI(i18nBasic["ITEM_OTHER"]) || "other", items: [] },
        };
        try {
            return new Promise((resolve) => {
                this.databasePool.execute(dbName, sql, (results) => {
                    const i18n = this.i18nReader.get(language, `project/${projectName}`);
                    if (Array.isArray(results)) {
                        for (const item of results) {
                            const itemConverted = ___processProjectMemberItem(item);
                            itemConverted.i18n = encodeURI(i18n[itemConverted.i18n] || itemConverted.i18n);
                            itemConverted.typeI18n =
                                encodeURI(i18nBasic[itemConverted.type.toUpperCase()]) || itemConverted.type;
                            switch (itemConverted.type) {
                                case "construct":
                                    items.constructor.items.push(itemConverted);
                                    break;
                                case "method":
                                    items.method.items.push(itemConverted);
                                    break;
                                case "operator":
                                    items.operator.items.push(itemConverted);
                                    break;
                                case "enum":
                                    items.enum.items.push(itemConverted);
                                    break;
                                case "property":
                                    items.property.items.push(itemConverted);
                                    break;
                                default:
                                    items.other.items.push(itemConverted);
                                    break;
                            }
                        }
                    }
                    resolve(items);
                }, (error) => {
                    messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                    resolve(items);
                });
            });
        }
        catch (e) {
            messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
            return items;
        }
    }
}
exports.ProjectDispatcher = ProjectDispatcher;

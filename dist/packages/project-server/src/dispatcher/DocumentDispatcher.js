"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentDispatcher = void 0;
const server_base_1 = require("@aitianyu.cn/server-base");
const Errors_1 = require("../common/Errors");
class DocumentDispatcher {
    constructor(basePath, i18n) {
        this.i18nReader = i18n;
        this.basePath = basePath;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/project/document/help", this._projectHelpDocsDispatcher.bind(this));
        handler.setRouter("aitianyu/cn/project/document/arch", this._projectArchitectureDispatcher.bind(this));
    }
    async _projectArchitectureDispatcher(query, messageList) {
        return new Promise((resolve) => {
            const project = query.query["project"];
            if (!!!project) {
                messageList.push({ code: Errors_1.PROJECT_ERROR_CODE.NO_PROJECT_NAME, text: "error: no project name provided" });
                resolve(null);
                return;
            }
            try {
                let mainfest = null;
                try {
                    mainfest = require(`${this.basePath}/arch/${project}/mainfest.json`);
                }
                catch { }
                if (!!!mainfest) {
                    messageList.push({
                        code: Errors_1.PROJECT_ERROR_CODE.NO_MATCHED_PARAMS,
                        text: `Project: ${project} is not accessible or exists of architecture`,
                    });
                    resolve(null);
                    return;
                }
                const i18n = this.i18nReader.get(query.lang, `project/${project}`);
                const archData = { files: {}, arch: [] };
                for (const key of Object.keys(mainfest.files || {})) {
                    const itemVal = mainfest.files[key];
                    archData.files[key] = { file: itemVal.file, i18n: encodeURI(i18n[itemVal.i18n] || itemVal.i18n) };
                }
                for (const archItem of mainfest.arch) {
                    try {
                        const archFile = require(`${this.basePath}/arch/${project}/${archItem}.json`);
                        const architect = { total: archFile.total, items: {} };
                        for (const item of Object.keys(archFile.items || {})) {
                            const itemVal = archFile.items[item];
                            itemVal.i18n = encodeURI(i18n[itemVal.i18n] || itemVal.i18n);
                            architect.items[item] = itemVal;
                        }
                        archData.arch.push(architect);
                    }
                    catch (e) {
                        messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                    }
                }
                resolve(archData);
            }
            catch (e) {
                messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                resolve(null);
            }
        });
    }
    async _projectHelpDocsDispatcher(query, messageList) {
        return new Promise((resolve) => {
            const project = query.query["project"];
            if (!!!project) {
                messageList.push({ code: Errors_1.PROJECT_ERROR_CODE.NO_PROJECT_NAME, text: "error: no project name provided" });
                resolve(null);
                return;
            }
            try {
                let mainfest = null;
                try {
                    mainfest = require(`${this.basePath}/help/${project}/mainfest.json`);
                }
                catch { }
                if (!!!mainfest) {
                    messageList.push({
                        code: Errors_1.PROJECT_ERROR_CODE.NO_MATCHED_PARAMS,
                        text: `Project: ${project} is not accessible or exists of help document`,
                    });
                    resolve(null);
                    return;
                }
                const i18n = this.i18nReader.get(query.lang, `project/${project}`);
                const helpDocs = { files: {}, default: mainfest.default };
                for (const key of Object.keys(mainfest.files || {})) {
                    const itemVal = mainfest.files[key];
                    helpDocs.files[key] = { file: itemVal.file, i18n: encodeURI(i18n[itemVal.i18n] || itemVal.i18n) };
                }
                resolve(helpDocs);
            }
            catch (e) {
                messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                resolve(null);
            }
        });
    }
}
exports.DocumentDispatcher = DocumentDispatcher;

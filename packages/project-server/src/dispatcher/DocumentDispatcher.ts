/**@format */

import { ERROR_CODE, HttpHandler, I18nReader, IHttpResponseError } from "@aitianyu.cn/server-base";
import { PROJECT_ERROR_CODE } from "../common/Errors";
import { IHttpQuery } from "@aitianyu.cn/server-base";

export class DocumentDispatcher {
    private i18nReader: I18nReader;
    private basePath: string;

    public constructor(basePath: string, i18n: I18nReader) {
        this.i18nReader = i18n;
        this.basePath = basePath;
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/project/document/help", this._projectHelpDocsDispatcher.bind(this));
        handler.setRouter("aitianyu/cn/project/document/arch", this._projectArchitectureDispatcher.bind(this));
    }

    private async _projectArchitectureDispatcher(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<any> {
        return new Promise((resolve) => {
            const project = query.query["project"];
            if (!!!project) {
                messageList.push({ code: PROJECT_ERROR_CODE.NO_PROJECT_NAME, text: "error: no project name provided" });
                resolve(null);
                return;
            }

            try {
                let mainfest = null;
                try {
                    mainfest = require(`${this.basePath}/arch/${project}/mainfest.json`);
                } catch {}

                if (!!!mainfest) {
                    messageList.push({
                        code: PROJECT_ERROR_CODE.NO_MATCHED_PARAMS,
                        text: `Project: ${project} is not accessible or exists of architecture`,
                    });
                    resolve(null);
                    return;
                }

                const i18n = this.i18nReader.get(query.lang, `project/${project}`);
                const archData: { files: any; arch: any } = { files: {}, arch: [] };
                for (const key of Object.keys(mainfest.files || {})) {
                    const itemVal = mainfest.files[key];
                    archData.files[key] = { file: itemVal.file, i18n: encodeURI(i18n[itemVal.i18n] || itemVal.i18n) };
                }

                for (const archItem of mainfest.arch) {
                    try {
                        const archFile = require(`${this.basePath}/arch/${project}/${archItem}.json`);
                        const architect: { total: any; items: any } = { total: archFile.total, items: {} };
                        for (const item of Object.keys(archFile.items || {})) {
                            const itemVal = archFile.items[item];
                            itemVal.i18n = encodeURI(i18n[itemVal.i18n] || itemVal.i18n);
                            architect.items[item] = itemVal;
                        }
                        archData.arch.push(architect);
                    } catch (e) {
                        messageList.push({ code: ERROR_CODE.SYSTEM_EXCEPTIONS, text: (e as any)?.message || "" });
                    }
                }

                resolve(archData);
            } catch (e) {
                messageList.push({ code: ERROR_CODE.SYSTEM_EXCEPTIONS, text: (e as any)?.message || "" });
                resolve(null);
            }
        });
    }

    private async _projectHelpDocsDispatcher(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<any> {
        return new Promise((resolve) => {
            const project = query.query["project"];
            if (!!!project) {
                messageList.push({ code: PROJECT_ERROR_CODE.NO_PROJECT_NAME, text: "error: no project name provided" });
                resolve(null);
                return;
            }

            try {
                let mainfest = null;
                try {
                    mainfest = require(`${this.basePath}/help/${project}/mainfest.json`);
                } catch {}

                if (!!!mainfest) {
                    messageList.push({
                        code: PROJECT_ERROR_CODE.NO_MATCHED_PARAMS,
                        text: `Project: ${project} is not accessible or exists of help document`,
                    });
                    resolve(null);
                    return;
                }

                const i18n = this.i18nReader.get(query.lang, `project/${project}`);
                const helpDocs: { files: any; default: string } = { files: {}, default: mainfest.default };
                for (const key of Object.keys(mainfest.files || {})) {
                    const itemVal = mainfest.files[key];
                    helpDocs.files[key] = { file: itemVal.file, i18n: encodeURI(i18n[itemVal.i18n] || itemVal.i18n) };
                }

                resolve(helpDocs);
            } catch (e) {
                messageList.push({ code: ERROR_CODE.SYSTEM_EXCEPTIONS, text: (e as any)?.message || "" });
                resolve(null);
            }
        });
    }
}

/**@format */

import { CacheController } from "tianyu-shell/common/controller/Cache.controller";
import { AITIANYU_CN_PROJECT_SERVER } from "tianyu-server/Global";
import { IAllProjectItem, IProjectDocument, IProjectDocumentOption, IProjectDownload } from "tianyu-server/model/Project.model";
import { Language } from "ts-core/Language";
import { parseProjectDownload } from "tianyu-server/utilities/ProjectDocumentHelper";
import { MapOfString } from "ts-core/Types";

export async function loadAllProjects(): Promise<IAllProjectItem[]> {
    return new Promise<IAllProjectItem[]>((resolve) => {
        const url = `${AITIANYU_CN_PROJECT_SERVER}/aitianyu/cn/project/all`;
        const localLanguage = Language.toString();
        const cachedData = CacheController.get(`${url}/${localLanguage}`);
        if (cachedData) {
            resolve(cachedData);
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send();

        xhr.onloadend = () => {
            const results: IAllProjectItem[] = [];
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                const resObj = JSON.parse(response);

                const language = resObj["lang"] || Language.toString();
                const projects = resObj["response"];
                if (Array.isArray(projects)) {
                    for (const item of projects) {
                        const projectSource = item as IAllProjectItem;
                        if (projectSource) {
                            const project: IAllProjectItem = {
                                desc: decodeURI(projectSource.desc),
                                github: projectSource.github,
                                key: projectSource.key,
                                name: decodeURI(projectSource.name),
                                project: projectSource.project,
                            };
                            results.push(project);
                        }
                    }
                }

                if (!!results.length) {
                    CacheController.cache(`${url}/${language}`, results);
                }
            }
            resolve(results);
        };
    });
}

export async function loadProjectAllDownloads(): Promise<IProjectDownload[]> {
    return new Promise<IProjectDownload[]>((resolve) => {
        const url = `${AITIANYU_CN_PROJECT_SERVER}/aitianyu/cn/project/download/all`;
        const localLanguage = Language.toString();
        const cachedData = CacheController.get(`${url}/${localLanguage}`);
        if (cachedData) {
            resolve(cachedData);
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send();

        xhr.onloadend = () => {
            const results: IProjectDownload[] = [];
            if (xhr.readyState === 4 && xhr.status === 200) {
                const responseText = xhr.responseText;
                const resObj = JSON.parse(responseText);

                const language = resObj["lang"] || Language.toString();
                const response = resObj["response"];
                if (Array.isArray(response)) {
                    for (const downloadSource of response) {
                        const downloadItem = parseProjectDownload(downloadSource);
                        if (downloadItem) results.push(downloadItem);
                    }
                }

                if (!!results.length) {
                    CacheController.cache(`${url}/${language}`, results);
                }
            }
            resolve(results);
        };
    });
}

export function getProjectAllDocumentFromCache(): IProjectDocument[] | null {
    const url = `${AITIANYU_CN_PROJECT_SERVER}/aitianyu/cn/project/document/all`;
    const localLanguage = Language.toString();
    const cachedData = CacheController.get(`${url}/${localLanguage}`);

    return cachedData;
}

export async function loadProjectAllDocument(): Promise<IProjectDocument[]> {
    return new Promise<IProjectDocument[]>((resolve) => {
        const url = `${AITIANYU_CN_PROJECT_SERVER}/aitianyu/cn/project/document/all`;
        const localLanguage = Language.toString();
        const cachedData = CacheController.get(`${url}/${localLanguage}`);
        if (cachedData) {
            resolve(cachedData);
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send();

        xhr.onloadend = () => {
            const results: IProjectDocument[] = [];
            if (xhr.readyState === 4 && xhr.status === 200) {
                const responseText = xhr.responseText;
                const resObj = JSON.parse(responseText);

                const language = resObj["lang"] || Language.toString();
                const response = resObj["response"];
                if (Array.isArray(response)) {
                    for (const documentSource of response) {
                        const documentItem: IProjectDocument = {
                            desc: decodeURI(documentSource.desc || ""),
                            key: documentSource.key || "",
                            name: decodeURI(documentSource.name || ""),
                            project: documentSource.project || "",
                            options: [],
                        };

                        const documentSourceOption = documentSource.options;
                        for (const optionItem of Object.keys(documentSourceOption || {})) {
                            const optionItemValue = documentSourceOption[optionItem];
                            const option: IProjectDocumentOption = {
                                name: decodeURI(optionItemValue.name || ""),
                                target: optionItemValue.target || "",
                            };
                            if (!!option.name && !!option.target) documentItem.options.push(option);
                        }

                        if (!!documentItem.key) results.push(documentItem);
                    }
                }

                if (!!results.length) {
                    CacheController.cache(`${url}/${language}`, results);
                }
            }

            resolve(results);
        };
    });
}

export async function loadProjectDocument(type: string, query: MapOfString): Promise<string> {
    return new Promise<string>((resolve) => {});
}

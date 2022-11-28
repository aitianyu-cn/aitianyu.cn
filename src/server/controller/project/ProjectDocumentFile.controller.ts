/**@format */

import { AITIANYU_CN_PROJECT_SERVER } from "tianyu-server/Global";
import { CacheController } from "tianyu-shell/common/controller/Cache.controller";
import { Language } from "ts-core/Language";

export async function loadProjectDocumentMarkdown(option: string, project: string, file: string): Promise<string> {
    return new Promise<string>((resolve) => {
        const url = `${AITIANYU_CN_PROJECT_SERVER}/aitianyu/cn/project/document/resource`;
        const localLanguage = Language.toString();
        const cacheUrl = `${url}/${option}/${project}/${file}/${localLanguage}`;
        const cachedData = CacheController.get(cacheUrl);
        if (typeof cachedData === "string") {
            resolve(cachedData);
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify({ option: option, project: project, file: file, lang: localLanguage }));
        xhr.onloadend = () => {
            let result: string = "";
            if (xhr.readyState === 4 && xhr.status === 200) {
                const responseText = xhr.responseText;
                const resObj = JSON.parse(responseText);

                const response = resObj["response"];
                if (typeof response === "string") {
                    result = decodeURI(response);

                    if (!!result) CacheController.cache(cacheUrl, result);
                }
            }

            resolve(result);
        };
    });
}

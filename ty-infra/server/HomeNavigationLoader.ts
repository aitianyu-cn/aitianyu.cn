/**@format */

import { ITianyuShell, Language } from "@aitianyu.cn/tianyu-shell/core";
import { IHomeNavigation } from "./model/HomePage";
import { AITIANYU_CN_GENERIC_SERVER } from "./remote-servers";

const REMOTE_SERVER = require("./remote-servers");

declare const tianyuShell: ITianyuShell;

export async function loadHomeNavigations(): Promise<IHomeNavigation[]> {
    const result: IHomeNavigation[] = [];

    const url = `${REMOTE_SERVER.AITIANYU_CN_GENERIC_SERVER}/aitianyu/cn/generic/home/navigation`;
    const localLanguage = Language.toString();
    const cachedData = tianyuShell.runtime.cache.storage.getValue(`${url}/${localLanguage}`);
    if (cachedData) {
        return cachedData;
    }

    try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${AITIANYU_CN_GENERIC_SERVER}/aitianyu/cn/generic/home/navigation`);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send();

        await new Promise<void>((resolve) => {
            xhr.onloadend = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = xhr.responseText;
                    const navigations = JSON.parse(response);
                    if (navigations?.response) {
                        const navigationItems = navigations.response as IHomeNavigation[];
                        if (navigationItems) {
                            result.push(...navigationItems);
                        }
                    }

                    const language = navigations["lang"] || Language.toString();

                    if (!!result.length) {
                        tianyuShell.runtime.cache.storage.setValue(`${url}/${language}`, result);
                    }
                }

                resolve();
            };
        });
    } catch {}

    return result;
}

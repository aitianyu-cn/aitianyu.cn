/**@format */

import { CacheController } from "tianyu-app/home/DependencyLoader";
import { AITIANYU_CN_GENERIC_SERVER } from "tianyu-server/Global";
import { IHomeNavigation } from "tianyu-server/model/HomePageNavigation.model";
import { Language } from "ts-core/Language";

export async function loadNavigations(): Promise<IHomeNavigation[]> {
    const result: IHomeNavigation[] = [];

    const url = `${AITIANYU_CN_GENERIC_SERVER}/aitianyu/cn/generic/home/navigation`;
    const localLanguage = Language.toString();
    const cachedData = CacheController.get(`${url}/${localLanguage}`);
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
                        CacheController.cache(`${url}/${language}`, result);
                    }
                }

                resolve();
            };
        });
    } catch {}

    return result;
}

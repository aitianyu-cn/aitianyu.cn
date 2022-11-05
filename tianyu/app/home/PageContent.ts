/**@format */

import { FetchFileLoader } from "ts-core/FileLoader";
import { CallbackAction } from "ts-core/Types";

export async function pageRender(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
        // window.setTimeout(function () {
        //     resolve();
        // }, 100);
        const loader = new FetchFileLoader("/remote-connection/resources/i18n/international_zh_CN.json");
        loader.openAsync().then((value: any) => {
            console.log(value);
            if (value) {
                resolve();
            } else {
                reject();
            }
        }, reject);
    });

    return promise;
}

/**@format */

import { FetchFileLoader } from "@aitianyu.cn/client-base";
import { Language, Utils } from "@aitianyu.cn/tianyu-shell/core";

export async function loadLanguages(url: string, ignoreFail?: boolean): Promise<void> {
    const fetchFile = new FetchFileLoader(url);

    return new Promise<void>((resolve, reject) => {
        fetchFile.openAsync().then((response: any) => {
            const value = response.response;
            if (!value && !ignoreFail) {
                reject();
                return;
            }

            try {
                if (Utils.Processor.getPluginSetting().globalize) {
                    Array.isArray(value.support) && Language.addLanguages("support", value.support);
                    Array.isArray(value.pending) && Language.addLanguages("pending", value.pending);
                }

                resolve();
            } catch (e) {
                reject(e);
            }
        });
    });
}

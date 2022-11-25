/**@format */

import { FetchFileLoader } from "ts-core/FileLoader";

export async function loadLanguages(url: string, ignoreFail?: boolean): Promise<void> {
    const fetchFile = new FetchFileLoader(url);

    return new Promise<void>((resolve, reject) => {
        fetchFile.openAsync().then((response: any) => {
            const value = response.response;
            if (!!!value && !!!ignoreFail) {
                reject();
                return;
            }

            try {
                if (!!!tianyuShell.core.language) {
                    resolve();
                    return;
                }

                if (Array.isArray(value.support)) {
                    for (const lang of value.support) {
                        if (typeof lang === "string" && !tianyuShell.core.language.supportLanguage.includes(lang)) {
                            tianyuShell.core.language.supportLanguage.push(lang);
                        }
                    }
                }

                if (Array.isArray(value.pending)) {
                    for (const lang of value.pending) {
                        if (typeof lang === "string" && !tianyuShell.core.language.pendingLanguage.includes(lang)) {
                            tianyuShell.core.language.pendingLanguage.push(lang);
                        }
                    }
                }

                resolve();
            } catch (e) {
                reject();
            }
        });
    });
}

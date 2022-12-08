/**@format */

import { DatabasePools, ERROR_CODE, HttpHandler, IHttpQuery, IHttpResponseError } from "aitianyu-server-base";

export class LanguageDispatcher {
    private databasePool: DatabasePools;

    public constructor(dbPool: DatabasePools) {
        this.databasePool = dbPool;
    }

    public createDispatches(handler: HttpHandler): void {
        handler.setRouter("aitianyu/cn/generic/language/language-alls", this._languageAllDispatcher.bind(this));
    }

    private async _languageAllDispatcher(
        _query: IHttpQuery,
        messageList: IHttpResponseError[],
    ): Promise<{ langs: string[]; pending: string[]; support: string[] }> {
        const languageAll: { langs: string[]; pending: string[]; support: string[] } = { langs: [], pending: [], support: [] };
        return new Promise((resolve) => {
            try {
                this.databasePool.execute(
                    "aitianyu_base",
                    "SELECT `lang`, `enable` FROM aitianyu_base.language;",
                    (results) => {
                        if (Array.isArray(results)) {
                            for (const item of results) {
                                try {
                                    const languageName = item.lang;
                                    if (item.enable) {
                                        if (!languageAll.langs.includes(languageName)) languageAll.langs.push(languageName);
                                        if (!languageAll.support.includes(languageName)) languageAll.support.push(languageName);
                                    } else {
                                        if (!languageAll.pending.includes(languageName)) languageAll.pending.push(languageName);
                                    }
                                } catch {}
                            }
                        }

                        resolve(languageAll);
                    },
                    (error) => {
                        messageList.push({ code: ERROR_CODE.DATABASE_EXCEPTION, text: error });
                        languageAll.langs.push("zh_CN");
                        languageAll.support.push("zh_CN");
                        resolve(languageAll);
                    },
                );
            } catch (e) {
                messageList.push({ code: ERROR_CODE.SYSTEM_EXCEPTIONS, text: (e as any)?.message || "" });
                languageAll.langs.push("zh_CN");
                languageAll.support.push("zh_CN");
                resolve(languageAll);
            }
        });
    }
}

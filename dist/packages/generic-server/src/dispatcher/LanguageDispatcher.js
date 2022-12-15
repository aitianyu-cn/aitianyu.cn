"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageDispatcher = void 0;
const server_base_1 = require("@aitianyu.cn/server-base");
class LanguageDispatcher {
    constructor(dbPool) {
        this.databasePool = dbPool;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/generic/language/language-alls", this._languageAllDispatcher.bind(this));
    }
    async _languageAllDispatcher(_query, messageList) {
        const languageAll = { langs: [], pending: [], support: [] };
        return new Promise((resolve) => {
            try {
                this.databasePool.execute("aitianyu_base", "SELECT `lang`, `enable` FROM aitianyu_base.language;", (results) => {
                    if (Array.isArray(results)) {
                        for (const item of results) {
                            try {
                                const languageName = item.lang;
                                if (item.enable) {
                                    if (!languageAll.langs.includes(languageName))
                                        languageAll.langs.push(languageName);
                                    if (!languageAll.support.includes(languageName))
                                        languageAll.support.push(languageName);
                                }
                                else {
                                    if (!languageAll.pending.includes(languageName))
                                        languageAll.pending.push(languageName);
                                }
                            }
                            catch { }
                        }
                    }
                    resolve(languageAll);
                }, (error) => {
                    messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                    languageAll.langs.push("zh_CN");
                    languageAll.support.push("zh_CN");
                    resolve(languageAll);
                });
            }
            catch (e) {
                messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                languageAll.langs.push("zh_CN");
                languageAll.support.push("zh_CN");
                resolve(languageAll);
            }
        });
    }
}
exports.LanguageDispatcher = LanguageDispatcher;

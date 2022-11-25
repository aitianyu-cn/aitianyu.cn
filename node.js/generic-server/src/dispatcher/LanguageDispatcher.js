/**@format */

const DatabasePools = require("../../../common/service/DatabasePools");
const I18nReader = require("../../../common/i18n/I18nReader");
const HttpHandler = require("../../../common/handler/HttpHandler");
const { ERROR_CODE } = require("../../../common/common/Errors");

class LanguageDispatcher {
    /**
     *
     * @param {DatabasePools} dbPool
     */
    constructor(dbPool) {
        /**@type {DatabasePools} */
        this.databasePool = dbPool;
    }

    /**
     *
     * @param {HttpHandler} handler
     */
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/generic/language/language-alls", this._languageAllDispatcher.bind(this));
    }

    /**
     *
     * @param {{lang: string, query: any}} query
     * @param {string[]} messageList
     *
     * @return {Promise<{langs: string[], pending: string[], support: string[]}>}
     */
    async _languageAllDispatcher(_query, messageList) {
        /**@type {{langs: string[], pending: string[], support: string[]}} */
        const languageAll = { langs: [], pending: [], support: [] };
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
                messageList.push({ code: ERROR_CODE.SYSTEM_EXCEPTIONS, text: error });
                languageAll.langs.push("zh_CN");
                languageAll.support.push("zh_CN");
                resolve(languageAll);
            }
        });
    }
}

module.exports = LanguageDispatcher;

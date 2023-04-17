"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageDispatcher = void 0;
const server_base_1 = require("@aitianyu.cn/server-base");
class HomePageDispatcher {
    constructor(dbPool, reader) {
        this.databasePool = dbPool;
        this.i18nReader = reader;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/generic/home/navigation", this._homeNavigationDispatcher.bind(this));
    }
    async _homeNavigationDispatcher(query, messageList) {
        const navigations = [];
        const sql = "SELECT `page`, `direct`, `status`, `params`, `desc` FROM aitianyu_base.navigation;";
        const sqlPromise = new Promise((resolve) => {
            try {
                this.databasePool.execute("aitianyu_base", sql, (results) => {
                    if (Array.isArray(results)) {
                        const i18n = this.i18nReader.get(query.lang, "page");
                        for (const item of results) {
                            try {
                                if (!!!item["status"]) {
                                    continue;
                                }
                                const navigationItem = {
                                    page: item["page"],
                                    desc: item["desc"],
                                    text: item["page"],
                                    direct: item["direct"],
                                    paramType: "get",
                                    params: [],
                                };
                                if (!!!navigationItem.page || !!!navigationItem.direct) {
                                    continue;
                                }
                                navigationItem.desc = i18n[navigationItem.desc] || navigationItem.desc;
                                navigationItem.text = i18n[navigationItem.text] || navigationItem.text;
                                if (item["params"]) {
                                    const parameters = JSON.parse(item["params"]);
                                    navigationItem.paramType = parameters["type"];
                                    for (const parItem of parameters["param"]) {
                                        const text = parItem["text"];
                                        const id = parItem["id"];
                                        if (!!text && !!id) {
                                            navigationItem.params.push({ text: i18n[text] || text, id: id });
                                        }
                                    }
                                }
                                navigations.push(navigationItem);
                            }
                            catch { }
                        }
                    }
                    resolve();
                }, (error) => {
                    messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                    resolve();
                });
            }
            catch (e) {
                messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                resolve();
            }
        });
        await sqlPromise;
        return navigations;
    }
}
exports.HomePageDispatcher = HomePageDispatcher;

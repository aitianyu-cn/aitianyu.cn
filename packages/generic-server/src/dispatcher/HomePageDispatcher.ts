/**@format */

import { DatabasePools, ERROR_CODE, HttpHandler, I18nReader, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { IHomeNavigation } from "../model/HomePage";

export class HomePageDispatcher {
    private i18nReader: I18nReader;
    private databasePool: DatabasePools;

    public constructor(dbPool: DatabasePools, reader: I18nReader) {
        this.databasePool = dbPool;
        this.i18nReader = reader;
    }

    public createDispatches(handler: HttpHandler): void {
        handler.setRouter("aitianyu/cn/generic/home/navigation", this._homeNavigationDispatcher.bind(this));
    }

    private async _homeNavigationDispatcher(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<IHomeNavigation[]> {
        const navigations: IHomeNavigation[] = [];

        const sql = "SELECT `page`, `direct`, `status`, `params`, `desc` FROM aitianyu_base.navigation;";
        const sqlPromise = new Promise<void>((resolve) => {
            try {
                this.databasePool.execute(
                    "aitianyu_base",
                    sql,
                    (results: any[]) => {
                        if (Array.isArray(results)) {
                            const i18n = this.i18nReader.get(query.lang, "page");
                            for (const item of results) {
                                try {
                                    if (!!!item["status"]) {
                                        continue;
                                    }

                                    const navigationItem: IHomeNavigation = {
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
                                } catch {}
                            }
                        }

                        resolve();
                    },
                    (error) => {
                        messageList.push({ code: ERROR_CODE.DATABASE_EXCEPTION, text: error });
                        resolve();
                    },
                );
            } catch (e) {
                messageList.push({ code: ERROR_CODE.SYSTEM_EXCEPTIONS, text: (e as any)?.message || "" });
                resolve();
            }
        });

        await sqlPromise;

        return navigations;
    }
}

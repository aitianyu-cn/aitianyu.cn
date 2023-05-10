/**@format */

import { DatabasePools, HttpHandler, IHttpDispatchInstance, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { getUserByAuthor } from "../common/AuthorHelper";

export class UtilsDispatcher implements IHttpDispatchInstance {
    private databasePool: DatabasePools;

    public constructor(dbPool: DatabasePools) {
        this.databasePool = dbPool;
    }

    createDispatches(handler: HttpHandler): void {
        handler.setRouter("aitianyu/cn/app/daily/infar/generator/author", this._generateAuthor.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/infar/generator/subAuthor", this._generateSubAuthor.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/infar/getUser", this._getUser.bind(this));
    }

    private async _generateAuthor(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        return "failed";
    }

    private async _generateSubAuthor(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        return "failed";
    }

    private async _getUser(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";

        return getUserByAuthor(this.databasePool, author, key, messageList);
    }
}

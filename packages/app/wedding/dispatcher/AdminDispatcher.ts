/**@format */

import { DatabasePools, HttpHandler, IHttpDispatchInstance } from "@aitianyu.cn/server-base";

export class AdminDispatcher implements IHttpDispatchInstance {
    private databasePool: DatabasePools;

    public constructor(dbPool: DatabasePools) {
        this.databasePool = dbPool;
    }

    createDispatches(handler: HttpHandler): void {
        // handler.setRouter("aitianyu/cn/app/wedding/admin/updateCash", this._updateCash.bind(this));
        // handler.setRouter("aitianyu/cn/app/wedding/admin/list", this._list.bind(this));
    }

    // private async _updateCash(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<IUserValidationResponse>;
}

/**@format */

import { HttpHandler, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";

export class GetterDispatcher {
    public constructor() {
        //
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/app/image/selector/getter/selected", this._getSelected.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/getter/list", this._getList.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/getter/images", this._getImages.bind(this));
    }

    private async _getImages(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<any> {
        //
    }

    private async _getList(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<any> {
        //
    }

    private async _getSelected(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<any> {
        //
    }
}

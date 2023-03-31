/**@format */

import { HttpHandler, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";

export class SelectionDispatcher {
    public constructor() {
        //
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/app/image/selector/select", this._selectImages.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/unselect", this._unSelectImages.bind(this));
    }

    private async _selectImages(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<any> {
        //
    }

    private async _unSelectImages(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<any> {
        //
    }
}

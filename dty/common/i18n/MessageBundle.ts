/**@format */

import { getAreaString } from "dty-common/AreaHelper";
import { IMessageBundle } from "dty-common/core/IMessageBundle";
import { Environment } from "dty-common/Environment";
import { Configure } from "dty-common/model/Configure";

export class MessageBundle implements IMessageBundle {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _MessageJson: any;

    public constructor(url: string) {
        const configure: Configure = Configure.generateConfigure();
        const areaString: string =
            configure.getEnvironment() !== Environment.RELEASE ? "msg" : getAreaString(configure.getArea());
        const formattedUrl = `${url}/international_${areaString}.json`;
        this._MessageJson = require(formattedUrl);
    }

    public getText(key: string): string | null {
        return (this._MessageJson && this._MessageJson[key]) || null;
    }
}

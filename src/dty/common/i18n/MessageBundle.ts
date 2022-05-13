/**@format */

import { getAreaString } from "../AreaHelper";
import { IMessageBundle } from "../model/IMessageBundle";
import { Environment } from "../Environment";
import { Configure } from "../core/Configure";

export class MessageBundle implements IMessageBundle {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _MessageJson: any;

    public constructor(msgObj: unknown) {
        this._MessageJson = msgObj;
    }

    public getText(key: string): string | null {
        return (this._MessageJson && this._MessageJson[key]) || null;
    }
}

export function getI18nFileName(): string {
    const configure: Configure = Configure.generateConfigure();
    const areaString: string = configure.getEnvironment() !== Environment.RELEASE ? "msg" : getAreaString(configure.getArea());
    return areaString;
}

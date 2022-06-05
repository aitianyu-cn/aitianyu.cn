/**@format */

import { AreaCode } from "../core/AreaCode";
import { Configure } from "../core/Configure";
import { IMessageBundle } from "../core/IMessageBundle";

export interface IMsgBundle extends IMessageBundle {
    getI18n(key: string): string;
}

export function getMsgBundle(): IMsgBundle {
    if (!MsgBundle.MsgBundleObject) {
        MsgBundle.MsgBundleObject = new MsgBundle();
    }

    return MsgBundle.MsgBundleObject;
}

class MsgBundle implements IMsgBundle {
    public static MsgBundleObject: MsgBundle | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _MessageJson: any;

    public constructor() {
        this.initMsgJson();

        const configure = Configure.generateConfigure();
        configure.listenArea("MessageBundle_Area_Listener", this.onAreaChanged.bind(this));
    }

    private initMsgJson(): void {
        this._MessageJson = readI18nResource();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private onAreaChanged(_area: AreaCode): void {
        this.initMsgJson();
    }

    public getText(key: string): string | null {
        return this._MessageJson?.[key] ?? null;
    }
    public getI18n(key: string): string {
        return this.getText(key) || key;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function readI18nResource(): any {
    const configure = Configure.generateConfigure();
    const area = configure.getArea();

    switch (area) {
        case AreaCode.en_US:
            return require("./res/international_en_US.json");
        case AreaCode.zh_CN:
        default:
            return require("./res/international_zh_CN.json");
    }
}

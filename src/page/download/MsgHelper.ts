/**@format */

import { MessageBundle } from "../../dty/common/i18n/MessageBundle";
import { Configure } from "../../dty/common/core/Configure";
import { AreaCode } from "../../dty/common/AreaCode";
import { IMessageBundle } from "../../dty/common/model/IMessageBundle";

export class MsgHelper implements IMessageBundle {
    private static generatedHelper: MsgHelper | null = null;

    private msgBundle: MessageBundle;

    public constructor() {
        this.msgBundle = new MessageBundle(MsgHelper.getI18nObject());
    }
    public getText(key: string): string | null {
        return this.msgBundle.getText(key);
    }

    public getI18nText(text: string): string {
        return this.getText(text) || text;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static getI18nObject(): any {
        const oConfig = Configure.generateConfigure();
        switch (oConfig.getArea()) {
            case AreaCode.en_US:
                return require("./res/i18n/international_en_US.json");
            case AreaCode.zh_CN:
            default:
                return require("./res/i18n/international_zh_CN.json");
        }
    }

    public static generateHelper(): MsgHelper {
        if (!this.generatedHelper) {
            this.generatedHelper = new MsgHelper();
        }

        return this.generatedHelper;
    }
}

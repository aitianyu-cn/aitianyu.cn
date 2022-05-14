/* eslint-disable @typescript-eslint/no-explicit-any */
/**@format */

import { AreaCode } from "../common/AreaCode";
import { MessageBundle } from "../common/i18n/MessageBundle";
import { getMsgTargetObject } from "./MessageList";

export class MessageBundleCenter {
    private static _MsgCollection: {
        [target: string]: {
            area: AreaCode,
            msg: MessageBundle
        }
    } = {};

    public static getMsgBundle(target: string, area: AreaCode): MessageBundle {
        if (!MessageBundleCenter._MsgCollection[target] || MessageBundleCenter._MsgCollection[target].area !== area) {
            const msgObject = getMsgTargetObject(target, area);
            MessageBundleCenter._MsgCollection[target] = {
                area: area,
                msg:new MessageBundle(msgObject)
            };
        }

        return MessageBundleCenter._MsgCollection[target].msg;
    }
}
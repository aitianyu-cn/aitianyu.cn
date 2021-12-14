/**@format */

import { Storage } from "../aitianyu.app/Runtime";
import { MessageType } from "./tianyuCore/EnvirDefs";

function log(msgType: MessageType, msg: string): void {
    switch (msgType) {
        case MessageType.ERROR:
            console.error("ERROR: %s", msg);
            break;
        case MessageType.WARNING:
            if (Storage.isDebugMode() || Storage.isDevelopMode()) {
                console.warn("WARNING: %s", msg);
            }
            break;
        case MessageType.NOTIFY:
            if (!Storage.isReleaseMode()) {
                console.info("NOTIFY: %s", msg);
            }
            break;
        case MessageType.LOG:
        default:
            if (!Storage.isReleaseMode()) {
                console.log("LOG: %s", msg);
            }
            break;
    }
}

export const TianyuConsole = {
    Log: log,
};

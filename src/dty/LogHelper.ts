/**@format */

import { FeatureToggle } from "./core/FeatureToggle";
import { LogState } from "./core/LogState";

export function ConsoleLog(msg: string, state: LogState = LogState.Log): void {
    if (!FeatureToggle.isActive("AITIANYU_CN_WEB_DEBUG_LOG")) {
        return;
    }

    switch (state) {
        case LogState.Log:
            console.log(msg);
            break;
        case LogState.Error:
            console.error(msg);
            break;
        case LogState.Warn:
            console.warn(msg);
            break;
        default:
            console.info(msg);
            break;
    }
}

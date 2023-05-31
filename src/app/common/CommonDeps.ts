/**@format */

import { loadFeatureToggle as basicLoadFeatureToggle } from "tianyu-server/controller/FeatureToggle.controller";
import { AITIANYU_CN_BASIC_PROJECT, AITIANYU_CN_HOME_PROJECT } from "tianyu-server/Global";

export { FeatureToggle } from "ts-core/FeatureToggle";
export { Router } from "ts-core/Router";
export { TIANYU_SHELL_UI_MAJOR_ID } from "ts-core/UI";

export async function loadFeatureToggle(): Promise<void> {
    return basicLoadFeatureToggle([AITIANYU_CN_BASIC_PROJECT, AITIANYU_CN_HOME_PROJECT]);
}

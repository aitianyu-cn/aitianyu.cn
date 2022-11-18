/**@format */

import { loadFeatureToggle as basicLoadFeatureToggle } from "tianyu-server/controller/FeatureToggle.controller";
import { AITIANYU_CN_BASIC_PROJECT, AITIANYU_CN_HOME_PROJECT } from "tianyu-server/Global";

export { loadCustomizedFeatureToggles } from "tianyu-server/controller/FeatureToggle.controller";
export { loadLanguages } from "tianyu-shell/common/controller/Language.controller";
export { loadUserLogonState, isUserLogon } from "tianyu-server/controller/Account.controller";
export {
    REACT_NAVIGATION_DEVELOP_TOGGLE,
    REACT_NAVIGATION_PERFORMANCE_TOGGLE,
} from "tianyu-shell/ui/react/modules/navigation/ReactNavigation";
export { TianyuShellNotInitialException } from "ts-core/ExceptionBase";
export { FeatureToggle } from "ts-core/FeatureToggle";
export { Router } from "ts-core/Router";
export { TIANYU_SHELL_UI_MAJOR_ID } from "ts-core/UI";
export { getNavigationSource, getNavigationRouter, getNavigationFallbackRouter, fontSizeMap } from "./HomeNavigation";
export { CacheController } from "tianyu-shell/common/controller/Cache.controller";

export async function loadFeatureToggle(): Promise<void> {
    return basicLoadFeatureToggle([AITIANYU_CN_BASIC_PROJECT, AITIANYU_CN_HOME_PROJECT]);
}

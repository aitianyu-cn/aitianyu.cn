/**@format */

import React from "react";
import ReactDOM from "react-dom/client";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import { require_msgbundle } from "ts-core/I18n";

const messageBundle = require_msgbundle("image", "app");

function onInitFailed(): void {
    //
}

async function onImagePageIniting(): Promise<void> {
    const DEPENDENCY = await import("./common/CommonDeps");
    await DEPENDENCY.loadLanguages("/remote-generic/aitianyu/cn/generic/language/language-alls", true);
    await DEPENDENCY.loadFeatureToggle();

    DEPENDENCY.Router.init();
    const ReactHorizontalNavigation = (await import("tianyu-shell/ui/react/modules/navigation/ReactHorizontalNavigation"))
        .ReactHorizontalNavigation;
    const ReactNavigationContent = (await import("tianyu-shell/ui/react/modules/content/ReactNavigationContent"))
        .ReactNavigationContent;

    const NAVIGATION = await import("./common/Navigation");
    const NavigationSource = await NAVIGATION.getNavigationSource(messageBundle);
    const NavigationRouter = await NAVIGATION.getNavigationRouter();
    const NavigationFallback = await NAVIGATION.getNavigationFallbackRouter();

    const rootNode = document.getElementById(DEPENDENCY.TIANYU_SHELL_UI_MAJOR_ID);
    if (!!!rootNode) {
        throw new DEPENDENCY.TianyuShellNotInitialException("tianyu shell major page is not ready");
    }

    const root = ReactDOM.createRoot(rootNode);
    const navigationProps: IReactProperty = {
        title: messageBundle.getText("IMAGE_PAGE_NAVIGATION_TITLE"),
        defaultItem: "/home",
    };

    root.render(
        <div>
            {/* <div className="h_rhn_c">
            
        </div> */}
            <ReactHorizontalNavigation
                props={navigationProps}
                source={NavigationSource}
                fontMap={NAVIGATION.fontSizeMap}></ReactHorizontalNavigation>
            <ReactNavigationContent default="/home" router={NavigationRouter} fallback={NavigationFallback} style={{}} />
        </div>,
    );

    document.title = messageBundle.getText("IMAGE_PAGE_GLOBAL_TITLE");
}

WaitingDialog.withDialog(onImagePageIniting, messageBundle.getText("IMAGE_DEFAULT_INITIAL_LOADING_WAIT_TEXT"));

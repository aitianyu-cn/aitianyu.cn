/**@format */

import React from "react";
import ReactDOM from "react-dom/client";
import { Background, Major } from "@aitianyu.cn/tianyu-shell/core";
import { guid } from "@aitianyu.cn/types";
import { fontSizeMap, getNavigationFallbackRouter, getNavigationRouter, getNavigationSource } from "./Navigation";
import { IReactProperty } from "ty-infra/ui/model/React";
import { ReactNavigationContent } from "ty-infra/ui/react/content/ReactNavigationContent";
import { ReactHorizontalNavigation } from "ty-infra/ui/react/navigation/ReactHorizontalNavigation";
import * as MessageBundle from "ty-home/i18n/MessageBundle";

export async function render() {
    const navigationSource = await getNavigationSource();
    const navigationRouter = await getNavigationRouter();
    const navigationFallback = await getNavigationFallbackRouter();

    const rootElement = document.createElement("div");
    rootElement.id = guid();

    Major.append(rootElement);

    const reactRoot = ReactDOM.createRoot(rootElement);
    const navigationProps: IReactProperty = {
        title: MessageBundle.getText("HOME_PAGE_NAVIGATION_TITLE"),
        defaultItem: "/home",
    };

    reactRoot.render(
        <div>
            {/* <div className="h_rhn_c">
            
        </div> */}
            <ReactNavigationContent default="/home" router={navigationRouter} fallback={navigationFallback} style={{}} />
            <ReactHorizontalNavigation
                props={navigationProps}
                source={navigationSource}
                fontMap={fontSizeMap}></ReactHorizontalNavigation>
        </div>,
    );

    document.title = MessageBundle.getText("HOME_PAGE_GLOBAL_TITLE");

    Background.setColor("var(--ts_ui_bgc)");
}

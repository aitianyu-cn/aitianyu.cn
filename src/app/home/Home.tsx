/**@format */

import React from "react";
import ReactDOM from "react-dom/client";
import { loadFeatureToggle } from "tianyu-shell/common/controller/FeatureToggle.controller";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import {
    REACT_NAVIGATION_DEVELOP_TOGGLE,
    REACT_NAVIGATION_PERFORMANCE_TOGGLE,
} from "tianyu-shell/ui/react/modules/navigation/ReactNavigation";
import { TianyuShellNotInitialException } from "ts-core/ExceptionBase";
import { FeatureToggle } from "ts-core/FeatureToggle";
import { Router } from "ts-core/Router";
import { TIANYU_SHELL_UI_MAJOR_ID } from "ts-core/UI";
import { getNavigationSource, fontSizeMap } from "./HomeNavigation";

import "./css/home.css";

WaitingDialog.withDialog(async () => {
    return new Promise<void>((resolve) => {
        loadFeatureToggle("/remote-connection/global/feature/getFeatures", true)
            .then(() => {
                FeatureToggle.addFeature(REACT_NAVIGATION_DEVELOP_TOGGLE);
                FeatureToggle.enable(REACT_NAVIGATION_DEVELOP_TOGGLE);
                FeatureToggle.addFeature(REACT_NAVIGATION_PERFORMANCE_TOGGLE);
                FeatureToggle.enable(REACT_NAVIGATION_PERFORMANCE_TOGGLE);

                Router.init();

                import("tianyu-shell/ui/react/modules/navigation/ReactHorizontalNavigation").then(
                    ({ ReactHorizontalNavigation }) => {
                        return getNavigationSource().then((value: IReactNavigationSource) => {
                            const rootNode = document.getElementById(TIANYU_SHELL_UI_MAJOR_ID);
                            if (!!!rootNode) {
                                throw new TianyuShellNotInitialException("tianyu shell major page is not ready");
                            }

                            const root = ReactDOM.createRoot(rootNode);
                            const navigationProps: IReactProperty = {
                                title: "TEST",
                                defaultItem: "/home",
                            };

                            root.render(
                                <div>
                                    <ReactHorizontalNavigation props={navigationProps} source={value} fontMap={fontSizeMap} />
                                </div>,
                            );
                        });
                    },
                );
            })
            .finally(resolve);
    });
});

/**@format */

import React from "react";
import ReactDOM from "react-dom/client";
import { loadFeatureToggle } from "tianyu-shell/common/controller/FeatureToggle.controller";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import { ReactHorizontalNavigation } from "tianyu-shell/ui/react/modules/navigation/ReactHorizontalNavigation";
import {
    REACT_NAVIGATION_DEVELOP_TOGGLE,
    REACT_NAVIGATION_PERFORMANCE_TOGGLE,
} from "tianyu-shell/ui/react/modules/navigation/ReactNavigation";
import { TianyuShellNotInitialException } from "ts-core/ExceptionBase";
import { FeatureToggle } from "ts-core/FeatureToggle";
import { Router } from "ts-core/Router";
import { PerfCaptureCallbackType } from "ts-core/Types";
import { TIANYU_SHELL_UI_MAJOR_ID } from "ts-core/UI";

import "./css/home.css";
import { navigationSource, fontSizeMap } from "./HomeNavigation";

WaitingDialog.withDialog(async () => {
    return new Promise<void>((resolve) => {
        loadFeatureToggle("/remote-connection/global/feature/getFeatures", true).then(() => {
            FeatureToggle.addFeature(REACT_NAVIGATION_DEVELOP_TOGGLE);
            FeatureToggle.enable(REACT_NAVIGATION_DEVELOP_TOGGLE);
            FeatureToggle.addFeature(REACT_NAVIGATION_PERFORMANCE_TOGGLE);
            FeatureToggle.enable(REACT_NAVIGATION_PERFORMANCE_TOGGLE);

            Router.init();

            const rootNode = document.getElementById(TIANYU_SHELL_UI_MAJOR_ID);
            if (!!!rootNode) {
                throw new TianyuShellNotInitialException("tianyu shell major page is not ready");
            }

            const root = ReactDOM.createRoot(rootNode);
            // const naviagtion = new ReactHorizontalNavigation({
            //     title: "TEST",
            //     defaultItem: "/home",
            // });
            // naviagtion.setSource(navigationSource);
            const navigationProps: IReactProperty = {
                title: "TEST",
                defaultItem: "/home",
            };

            root.render(
                <div>
                    {/* <ReactHorizontalNavigation title="TEST" /> */}
                    <ReactHorizontalNavigation props={navigationProps} source={navigationSource} fontMap={fontSizeMap} />
                </div>,
            );

            resolve();
        }, resolve);
    });
});

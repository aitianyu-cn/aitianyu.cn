/**@format */

import React from "react";
import ReactDOM from "react-dom/client";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import { require_msgbundle } from "ts-core/I18n";
import { CallbackAction } from "ts-core/Types";

import "./css/home.css";

function onFeatureToggleFailed(fnResolve: CallbackAction): void {
    // to render a error when get feature toggle failed
    fnResolve();
}

function onDependencyLoadFailed(fnResolve: CallbackAction): void {
    // to render the failed page when the dependency load failed
    fnResolve();
}

async function onHomePageIniting(): Promise<void> {
    return new Promise<void>((resolve) => {
        import("./DependencyLoader").then((Dependency) => {
            Dependency.loadFeatureToggle("/remote-connection/global/feature/getFeatures", true).then(
                () => {
                    Dependency.FeatureToggle.addFeature(Dependency.REACT_NAVIGATION_DEVELOP_TOGGLE);
                    Dependency.FeatureToggle.enable(Dependency.REACT_NAVIGATION_DEVELOP_TOGGLE);
                    Dependency.FeatureToggle.addFeature(Dependency.REACT_NAVIGATION_PERFORMANCE_TOGGLE);
                    Dependency.FeatureToggle.enable(Dependency.REACT_NAVIGATION_PERFORMANCE_TOGGLE);

                    Dependency.Router.init();

                    import("tianyu-shell/ui/react/modules/navigation/ReactHorizontalNavigation").then(
                        ({ ReactHorizontalNavigation }) => {
                            return Dependency.getNavigationSource(messageBundle).then(
                                (value: IReactNavigationSource) => {
                                    const rootNode = document.getElementById(Dependency.TIANYU_SHELL_UI_MAJOR_ID);
                                    if (!!!rootNode) {
                                        throw new Dependency.TianyuShellNotInitialException(
                                            "tianyu shell major page is not ready",
                                        );
                                    }

                                    const root = ReactDOM.createRoot(rootNode);
                                    const navigationProps: IReactProperty = {
                                        title: messageBundle.getText("HOME_PAGE_NAVIGATION_TITLE"),
                                        defaultItem: "/home",
                                    };

                                    root.render(
                                        <ReactHorizontalNavigation
                                            props={navigationProps}
                                            source={value}
                                            fontMap={Dependency.fontSizeMap}></ReactHorizontalNavigation>,
                                    );
                                    resolve();
                                },
                                () => {
                                    onDependencyLoadFailed(resolve);
                                },
                            );
                        },
                        () => {
                            onDependencyLoadFailed(resolve);
                        },
                    );
                },
                () => {
                    onFeatureToggleFailed(resolve);
                },
            );
        });
    });
}

const messageBundle = require_msgbundle("home", "app");
WaitingDialog.withDialog(onHomePageIniting, messageBundle.getText("HOME_PAGE_INITIAL_LOADING_WAIT_TEXT"));

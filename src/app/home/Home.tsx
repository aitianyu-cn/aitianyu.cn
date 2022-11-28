/**@format */

import React from "react";
import ReactDOM from "react-dom/client";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import { IReactContentRouter } from "tianyu-shell/ui/react/modules/content/Interface";
import { require_msgbundle } from "ts-core/I18n";
import { CallbackAction, MapOfType } from "ts-core/Types";

import "./css/home.css";

function onFeatureToggleFailed(fnResolve: CallbackAction): void {
    // to render a error when get feature toggle failed
    fnResolve();
}

function onDependencyLoadFailed(fnResolve: CallbackAction): void {
    // to render the failed page when the dependency load failed
    fnResolve();
}

async function render(Dependency: typeof import("tianyu-app/home/DependencyLoader"), resolve: CallbackAction) {
    Dependency.Router.init();
    Promise.all([
        import("tianyu-shell/ui/react/modules/navigation/ReactHorizontalNavigation"),
        import("tianyu-shell/ui/react/modules/content/ReactNavigationContent"),
    ]).then(
        ([{ ReactHorizontalNavigation }, { ReactNavigationContent }]) => {
            const aRenderSourceWait = [];
            aRenderSourceWait.push(Dependency.getNavigationSource(messageBundle));
            aRenderSourceWait.push(Dependency.getNavigationRouter());
            aRenderSourceWait.push(Dependency.getNavigationFallbackRouter());
            return Promise.all(aRenderSourceWait).then(
                (values: (IReactNavigationSource | IReactContentRouter | MapOfType<IReactContentRouter>)[]) => {
                    const rootNode = document.getElementById(Dependency.TIANYU_SHELL_UI_MAJOR_ID);
                    if (!!!rootNode) {
                        throw new Dependency.TianyuShellNotInitialException("tianyu shell major page is not ready");
                    }

                    const root = ReactDOM.createRoot(rootNode);
                    const navigationProps: IReactProperty = {
                        title: messageBundle.getText("HOME_PAGE_NAVIGATION_TITLE"),
                        defaultItem: "/home",
                    };

                    let navigationSource: IReactNavigationSource = values[0] as IReactNavigationSource;
                    let navigationRouter: MapOfType<IReactContentRouter> = values[1] as MapOfType<IReactContentRouter>;
                    let navigationFallbackRouter: IReactContentRouter = values[2] as IReactContentRouter;

                    root.render(
                        <div>
                            {/* <div className="h_rhn_c">
                            
                        </div> */}
                            <ReactHorizontalNavigation
                                props={navigationProps}
                                source={navigationSource}
                                fontMap={Dependency.fontSizeMap}></ReactHorizontalNavigation>
                            <ReactNavigationContent
                                default="/home"
                                router={navigationRouter}
                                fallback={navigationFallbackRouter}
                                style={{}}
                            />
                        </div>,
                    );

                    document.title = messageBundle.getText("HOME_PAGE_GLOBAL_TITLE");
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
}

async function onHomePageIniting(): Promise<void> {
    return new Promise<void>((resolve) => {
        import("./DependencyLoader").then(
            (Dependency) => {
                Promise.all([
                    Dependency.loadLanguages("/remote-generic/aitianyu/cn/generic/language/language-alls", true),
                    Dependency.loadFeatureToggle(),
                ]).then(
                    () => {
                        const userOnloadSupportToggle = Dependency.FeatureToggle.isActive("TIANYU_CN_BETA_USER_ON_LOAD_SUPPORT");
                        // Dependency.FeatureToggle.enable("AITIANYU_CN_WEB_DOCUMENT_SUPPORT");
                        (userOnloadSupportToggle ? Dependency.loadUserLogonState() : Promise.resolve()).finally(() => {
                            const aPromisesBeforeRender: Promise<void>[] = [];

                            if (Dependency.isUserLogon()) {
                                aPromisesBeforeRender.push(Dependency.loadCustomizedFeatureToggles());
                            } else {
                                aPromisesBeforeRender.push(Promise.resolve());
                            }

                            Promise.all(aPromisesBeforeRender).finally(() => {
                                render(Dependency, resolve);
                            });
                        });
                    },
                    () => {
                        onFeatureToggleFailed(resolve);
                    },
                );
            },
            () => {
                onDependencyLoadFailed(resolve);
            },
        );
    });
}

const messageBundle = require_msgbundle("home", "app");
WaitingDialog.withDialog(onHomePageIniting, messageBundle.getText("HOME_PAGE_INITIAL_LOADING_WAIT_TEXT"));

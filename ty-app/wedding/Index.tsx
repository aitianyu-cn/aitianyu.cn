/**@format */

import { loading } from "ty-infra/core/Loading";

import "./css/wedding_home.css";

loading().then(async (Dependency) => {
    import(/*webpackChunkName: "aitianyu-cn/global/initialization" */ "ty-infra/ui/native/widget/Waiting")
        .then(async ({ WaitingDialog }) => {
            // const MessageBundle = await import("ty-app/wedding/i18n/MessageBundle");
            await import(/*webpackChunkName: "aitianyu-cn/application/wedding/i18n" */ "ty-app/wedding/i18n/MessageBundle").then(
                async (MessageBundle) => {
                    try {
                        const waitingImg = (await import("ty-app/wedding/res/wedding_waiting.svg")).default;

                        document.title = MessageBundle.getText("WEDDING_PAGE_TITLE");

                        WaitingDialog.withDialog(
                            async () => {
                                const { loader } = await import(
                                    /*webpackChunkName: "aitianyu-cn/application/wedding/dependency" */ "./DependencyLoader"
                                );
                                await loader();
                                return new Promise<void>((resolve) => {
                                    //
                                });
                            },
                            "", //MessageBundle.getText("WEDDING_WAITING_DIALOG_TEXT"),
                            {
                                data: waitingImg,
                                type: "svg",
                            },
                            {
                                styles: ["wait_dialog_ai", "wedding_waiting_dialog"],
                                onePlat: true,
                            },
                        );
                    } catch (error1) {
                        Dependency.Log.error(`${error1}`);
                    }
                },
            );
        })
        .catch((error) => {
            Dependency.Log.error(`loading data failed ${error}`);
        });
});

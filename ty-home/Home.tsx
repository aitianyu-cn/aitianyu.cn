/**@format */

import { loading } from "ty-infra/core/Loading";

async function homepage() {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 15000);
    });
}

loading().then(({ Log }) => {
    import(/*webpackChunkName: "aitianyu-cn/global/initialization" */ "ty-infra/ui/native/widget/Waiting")
        .then(({ WaitingDialog }) => {
            WaitingDialog.withDialog(homepage);
        })
        .catch(() => {
            Log.error("loading data failed");
        });
});

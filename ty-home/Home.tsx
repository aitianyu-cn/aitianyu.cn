/**@format */

import { loading } from "../ty-common/shell/infra/Loading";

async function homepage() {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 15000);
    });
}

loading().then(({ Log }) => {
    import(/*webpackChunkName: "aitianyu-cn/global/initialization" */ "../ty-common/shell/ui/native/widget/Waiting")
        .then(({ WaitingDialog }) => {
            WaitingDialog.withDialog(homepage);
        })
        .catch(() => {
            Log.error("loading data failed");
        });
});

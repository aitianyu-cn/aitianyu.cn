/**@format */

import { loading } from "ty-infra/core/Loading";
import { loader } from "./home/Dependencies";

async function homepageRender() {
    await loader();
    const { render } = await import(/*webpackChunkName: "aitianyu-cn/global/homepage" */ "./home/Render");
    await render();
}

loading().then(({ Log }) => {
    import(/*webpackChunkName: "aitianyu-cn/global/initialization" */ "ty-infra/ui/native/widget/Waiting")
        .then(({ WaitingDialog }) => {
            WaitingDialog.withDialog(async () => {
                try {
                    await homepageRender();
                } catch (e) {
                    Log.error((e as any)?.message || "Home page initial failed");
                }
            });
        })
        .catch(() => {
            Log.error("loading data failed");
        });
});

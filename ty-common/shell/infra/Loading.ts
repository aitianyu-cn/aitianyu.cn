/**@format */

import { loadI18n } from "@aitianyu.cn/tianyu-shell/infra";
import { ITianyuShellInitial, initialTianyuShellAsync } from "@aitianyu.cn/tianyu-shell";
import { TianyuShellConfigure } from "./TianyuShellConfigure";

export async function loading(configure: ITianyuShellInitial = TianyuShellConfigure) {
    await loadI18n();
    await initialTianyuShellAsync(configure);

    const core = await import("@aitianyu.cn/tianyu-shell/core");
    await core.waitLoading();

    await import(/*webpackChunkName: "aitianyu-cn/global/message-loader" */ "./message/MessageLoader")
        .then(async (MessageLoader) => {
            await MessageLoader.loadMessage();
        })
        .catch(async () => Promise.resolve());

    return core;
}

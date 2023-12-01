/**@format */

import * as TianyuShell from "@aitianyu.cn/tianyu-shell";
import { loadI18n } from "@aitianyu.cn/tianyu-shell/infra";

loadI18n().finally(() => {
    TianyuShell.initialTianyuShell({
        core: {
            runtime: {
                console: true,
            },
            environment: "development",
            version: "1.1.1.1",
            plugin: {
                globalize: true,
            },
        },
        runtime: {
            globalCache: true,
            globalStorage: true,

            support: {
                router: false,
            },
        },
        ui: {
            core: {
                support: true,
            },
            theme: {},
        },
    });

    Promise.all([import("@aitianyu.cn/tianyu-shell/core")]).then(([core]) => {
        //
        try {
            core.Language.parse("123");
        } catch (e) {
            core.Log.error((e as unknown as any as Error).toString());
        }
    });
});

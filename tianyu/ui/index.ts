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
        // try {
        //     core.Language.parse("123");
        // } catch (e) {
        //     core.Log.error((e as unknown as any as Error).toString());
        // }
        core.Message.post(
            core.TianyuShellUIMessageType.ERROR,
            "1000",
            "This is a test message for testing Message Tips. Using Error type message to test all functions in Message Tips.",
            "Test message",
            [
                "first: details first string - place holder",
                "second: details second string - place holder",
                "third: details third string - place holder",
            ],
            true,
            {
                key: "TEST_KEY_1",
                message: "test more message",
                link: () => {
                    alert("test more message");
                },
            },
            {
                key: "TEST_KEY_2",
                message: "test trouble shot message",
                link: () => {
                    alert("test trouble shot message");
                },
            },
        );

        core.Message.post(
            core.TianyuShellUIMessageType.WARNING,
            "1000",
            "This is a test message for testing Message Tips. Using Error type message to test all functions in Message Tips.",
            "Test message",
            [
                "first: details first string - place holder",
                "second: details second string - place holder",
                "third: details third string - place holder",
            ],
            true,
            {
                key: "TEST_KEY_1",
                message: "test more message",
                link: () => {
                    alert("test more message");
                },
            },
            {
                key: "TEST_KEY_2",
                message: "test trouble shot message",
                link: () => {
                    alert("test trouble shot message");
                },
            },
        );

        core.Message.post(
            core.TianyuShellUIMessageType.FATAL,
            "1000",
            "This is a test message for testing Message Tips. Using Error type message to test all functions in Message Tips.",
            "Test message",
            [
                "first: details first string - place holder",
                "second: details second string - place holder",
                "third: details third string - place holder",
            ],
            true,
            {
                key: "TEST_KEY_1",
                message: "test more message",
                link: () => {
                    alert("test more message");
                },
            },
            {
                key: "TEST_KEY_2",
                message: "test trouble shot message",
                link: () => {
                    alert("test trouble shot message");
                },
            },
        );

        core.Message.post(
            core.TianyuShellUIMessageType.INFO,
            "1000",
            "This is a test message for testing Message Tips. Using Error type message to test all functions in Message Tips.",
            "Test message",
            [
                "first: details first string - place holder",
                "second: details second string - place holder",
                "third: details third string - place holder",
            ],
            true,
            {
                key: "TEST_KEY_1",
                message: "test more message",
                link: () => {
                    alert("test more message");
                },
            },
            {
                key: "TEST_KEY_2",
                message: "test trouble shot message",
                link: () => {
                    alert("test trouble shot message");
                },
            },
        );

        core.Message.post(
            core.TianyuShellUIMessageType.SUCCESS,
            "1000",
            "This is a test message for testing Message Tips. Using Error type message to test all functions in Message Tips.",
            "Test message",
            [
                "first: details first string - place holder",
                "second: details second string - place holder",
                "third: details third string - place holder",
            ],
            true,
            {
                key: "TEST_KEY_1",
                message: "test more message",
                link: () => {
                    alert("test more message");
                },
            },
            {
                key: "TEST_KEY_2",
                message: "test trouble shot message",
                link: () => {
                    alert("test trouble shot message");
                },
            },
        );

        core.Message.post(
            core.TianyuShellUIMessageType.RELOAD,
            "1000",
            "This is a test message for testing Message Tips. Using Error type message to test all functions in Message Tips.",
            "Test message",
            [
                "first: details first string - place holder",
                "second: details second string - place holder",
                "third: details third string - place holder",
            ],
            true,
            {
                key: "TEST_KEY_1",
                message: "test more message",
                link: () => {
                    alert("test more message");
                },
            },
            {
                key: "TEST_KEY_2",
                message: "test trouble shot message",
                link: () => {
                    alert("test trouble shot message");
                },
            },
        );
    });
});

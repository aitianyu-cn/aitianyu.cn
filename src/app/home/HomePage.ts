/**@format */

import { RenderHelper } from "tianyu-shell/native/RenderHelper";
import { ErrorWidget } from "tianyu-shell/native/widget/ErrorWidget";
import { IWaitingDialogOption, WaitingDialog } from "tianyu-shell/native/widget/WaitingDialog";
import { TIANYU_SHELL_UI_MAJOR_ID } from "ts-core/UI";
import { pageRender } from "./PageContent";
import { initRouter } from "./RouterHelper";

function onErrorPage() {
    // 渲染错误页面
    const error = new ErrorWidget("", () => {
        RenderHelper.renderEmpty(TIANYU_SHELL_UI_MAJOR_ID);
        load();
    });

    RenderHelper.renderDOM(TIANYU_SHELL_UI_MAJOR_ID, error);
}

// 初始化路由信息
initRouter();

let fnResolve = () => {};

const waitingTimeout: IWaitingDialogOption = {
    overtime: 3000,
    onOvertime: () => {
        // 结束等待
        fnResolve();
        onErrorPage();
    },
};

function load(): void {
    // 启动等待动画弹窗
    // 等待加载主页页面
    WaitingDialog.withDialog(async () => {
        return new Promise<void>((resolve, reject) => {
            fnResolve = resolve;
            pageRender().then(resolve, () => {
                onErrorPage();
                reject();
            });
        });
    }, waitingTimeout);
}

load();

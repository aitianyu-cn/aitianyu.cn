/**@format */

declare const window: any;

import { CallbackAction, CallbackActionT } from "ts-core/Types";

function _switchTheme(targetTheme: string): void {}

function _getTheme(): string {
    return "";
}

function _listenThemeChange(listener: string, callback: CallbackActionT<string>): void {}

function _unlistenThememChange(listener: string): void {}

function _proxyThemeChange(callback: CallbackActionT<CallbackAction>, keepOrigin?: boolean): void {}

export const ThemeCore = {
    switch: _switchTheme,
    get: _getTheme,
    listen: _listenThemeChange,
    unlisten: _unlistenThememChange,
    proxy: _proxyThemeChange,
};

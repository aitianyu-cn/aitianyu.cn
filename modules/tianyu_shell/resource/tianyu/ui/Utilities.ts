/**@format */

import { EmptyArgumentException } from "ts-core/ExceptionBase";

import "./common/core_ui.css";

const SetDefaultThemeOnLoaded = "tianyushell_core_ui_theme_set_default_trigger";
const TianyuShellUIThemeDefaultID = "tianyu_shell_ui_default_theme";
const TianyuShellUIThemeCustomID = "tianyu_shell_ui_cusom_theme";

const TianyuShellUIThemeCustomCookieT = "TIANYUSHELL_UI_CUSTOM_THEME_T";
const TianyuShellUIThemeCustomCookieC = "TIANYUSHELL_UI_CUSTOM_THEME_C";

const _customThemeList: string[] = [];

function _change_theme_internal(theme: string, color: TianyuShellUIThemeColor, setCookie: boolean): void {
    const themeUrl = `/static/theme/${theme}_${color}.css`;

    const element = document.getElementById(TianyuShellUIThemeCustomID);
    const linkElem = element as HTMLLinkElement;
    if (linkElem) {
        linkElem.href = themeUrl;
        return;
    }

    if (element) {
        document.removeChild(element);
    }
    const customTheme = document.createElement("link");
    customTheme.href = themeUrl;
    customTheme.rel = "stylesheet";
    customTheme.type = "text/css";
    customTheme.id = TianyuShellUIThemeCustomID;

    document.head.appendChild(customTheme);

    if (tianyuShell.core.ui) {
        tianyuShell.core.ui.theme.custom.valid = true;
        tianyuShell.core.ui.theme.custom.theme = theme;
        tianyuShell.core.ui.theme.custom.color = color;

        if (setCookie) {
            const date = new Date(Date.now());
            const expires = new Date(date.setDate(date.getDate() + 30));
            tianyuShell.core.cookie.set(TianyuShellUIThemeCustomCookieT, theme, undefined, undefined, expires);
            tianyuShell.core.cookie.set(TianyuShellUIThemeCustomCookieC, color, undefined, undefined, expires);
        }
    }
}

function _change_theme(theme: string, color: TianyuShellUIThemeColor, save?: boolean): void {
    _change_theme_internal(theme, color, !!save);
}

function _reset_theme(): void {
    const element = document.getElementById(TianyuShellUIThemeCustomID);
    if (element) {
        document.head.removeChild(element);
        if (tianyuShell.core.ui) {
            tianyuShell.core.ui.theme.custom.valid = false;

            tianyuShell.core.cookie.remove(TianyuShellUIThemeCustomCookieT);
            tianyuShell.core.cookie.remove(TianyuShellUIThemeCustomCookieC);
        }
    }
}

function _get_custom_theme(): string[] {
    return _customThemeList.concat();
}

function _load_custom_theme(url: string, id: string): void {
    if (!!!id) {
        throw new EmptyArgumentException("id: string");
    }

    const customTheme = document.createElement("link");
    customTheme.href = url;
    customTheme.rel = "stylesheet";
    customTheme.type = "text/css";
    customTheme.id = id;

    document.head.appendChild(customTheme);

    if (!_customThemeList.includes(id)) {
        _customThemeList.push(id);
    }
}

function _contains_custom_theme(id: string): boolean {
    return _customThemeList.includes(id);
}

function _remove_custom_theme(id: string): void {
    const element = document.getElementById(id);
    if (element) {
        document.head.removeChild(element);
    }
}

function _init_customer_theme_from_cookie(): void {
    const theme = tianyuShell.core.cookie.get(TianyuShellUIThemeCustomCookieT);
    const color = tianyuShell.core.cookie.get(TianyuShellUIThemeCustomCookieC).toLowerCase();

    const themeColor: TianyuShellUIThemeColor | null = color === "light" ? "light" : color === "dark" ? "dark" : null;

    if (!!theme && !!themeColor) {
        _change_theme_internal(theme, themeColor, false);
    }
}

export const theme: ITianyuShellCoreUITheme = {
    default: {
        valid: false,
        theme: "",
        color: "light",
    },
    custom: {
        valid: false,
        theme: "",
        color: "light",
    },
    change: _change_theme,
    reset: _reset_theme,

    user: {
        get: _get_custom_theme,
        load: _load_custom_theme,
        contains: _contains_custom_theme,
        remove: _remove_custom_theme,
    },
};

/**
 * 用于创建Tianyu Shell UI的核心功能
 *
 * 功能描述
 *      初始化UI主题相关的接口，并完成主题库的装载
 *          - 主题接口：修改主题、获取主题、监听主题变化、注册主题修改代理
 *          - 自定义主题：通过注册主题修改代理并在主题hook中完成附加逻辑（如果需要）完成
 *
 * @returns {void}
 */
export function initUIBase(): void {
    if (!!tianyuShell.core.ui) {
        return;
    }

    tianyuShell.core.ui = {
        theme: theme,
    };

    const configuration = require("ts-static/configuration.json");
    const themeDefaultConfig = configuration?.ui?.theme?.default;
    if (themeDefaultConfig && themeDefaultConfig.theme) {
        const theme: string = configuration?.ui?.theme?.default?.theme;
        const color: TianyuShellUIThemeColor = configuration?.ui?.theme?.default?.color === 1 ? "light" : "dark";

        // to set default theme
        const defaultTheme = document.createElement("link");
        defaultTheme.href = `/static/theme/${theme}_${color}.css`;
        defaultTheme.rel = "stylesheet";
        defaultTheme.type = "text/css";
        defaultTheme.id = TianyuShellUIThemeDefaultID;

        document.head.appendChild(defaultTheme);

        if (tianyuShell.core.ui) {
            tianyuShell.core.ui.theme.default.valid = true;
            tianyuShell.core.ui.theme.default.theme = theme;
            tianyuShell.core.ui.theme.default.color = color;
        }

        // here to upload the set custom theme
        // to ensure the default theme is loaded first
        _init_customer_theme_from_cookie();
    }
}

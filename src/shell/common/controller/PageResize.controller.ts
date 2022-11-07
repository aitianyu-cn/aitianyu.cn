/**@format */

import { CallbackAction, MapOfType } from "ts-core/Types";

const _pageResize: MapOfType<CallbackAction> = {};

function _on_resize_listen(listener: string, callback: CallbackAction): boolean {
    // for each listen, to check the state of listener
    _add_listener_for_resize();

    if (!!!listener) return false;

    _pageResize[listener] = callback;
    return true;
}

const _on_resize: ITianyuShellCoreEvent = {
    listen: (listener: string, callback: CallbackAction) => {
        _on_resize_listen(listener, callback);
    },
    removeListen: (listener: string) => {
        if (!!!listener) return;

        if (_pageResize[listener]) {
            delete _pageResize[listener];
        }
    },
    contains: (listener: string) => {
        return !!_pageResize[listener];
    },
};

let _eventInvokeShake: number = -1;
function _on_resize_event_trigger(ev: UIEvent): void {
    if (_eventInvokeShake !== -1) {
        return;
    }

    _eventInvokeShake = window.setTimeout(() => {
        for (const listener of Object.keys(_pageResize)) {
            const callback = _pageResize[listener];
            callback();
        }

        _eventInvokeShake = -1;
    }, 100);
}

function _add_listener_for_resize(): void {
    const tianyuShellEvent = tianyuShell.core.event as any;
    if (!!tianyuShellEvent.onResize) {
        return;
    }

    tianyuShellEvent.onResize = _on_resize;
    document.body.onresize = _on_resize_event_trigger;
}

export class PageResizeController {
    public static listen(register: string, callback: CallbackAction): boolean {
        return _on_resize_listen(register, callback);
    }

    public static removeListen(register: string): void {
        _on_resize.removeListen(register);
    }

    public static contains(register: string): boolean {
        return _on_resize.contains(register);
    }
}

/**@format */

import { guid } from "ts-core/Guid";
import { CallbackAction, IMessageOptions, MapOfType } from "ts-core/Types";

interface IMessage {
    id: string;
    node: HTMLElement;
    during: number;
    timeout: number;

    onClose?: CallbackAction;
    onOpen?: CallbackAction;

    fnClose: CallbackAction;
}

const MESSAGE_DEFAULT_DUING = 5000;

const _FN_MESSAGE_DEFAULT_CLOSE_ = () => {
    const obj = this as unknown as IMessage;
    if (!!obj) {
        _close(obj.id);
    }
};

const _FN_MESSAGE_TIMER_ = () => {
    const obj = this as unknown as IMessage;
    if (!!obj) {
        obj.timeout = -1;
        _close(obj.id);
    }
};

const msgLayoutId: string = `tianyu_ui_msg_${guid().substring(1, 8)}`;

const _messageList: MapOfType<IMessage> = {};

function _show_on_layout(msgObj: IMessage): boolean {
    const layout = document.getElementById(msgLayoutId);
    if (!!!layout) {
        return false;
    }

    try {
        layout.appendChild(msgObj.node);

        if (msgObj.during !== -1) {
            msgObj.timeout = window.setTimeout(_FN_MESSAGE_TIMER_.bind(msgObj), msgObj.during);
        }

        msgObj.onOpen?.();

        _messageList[msgObj.id] = msgObj;
    } catch {
        if (msgObj.timeout !== -1) {
            window.clearTimeout(msgObj.timeout);
        }
        if (!!_messageList[msgObj.id]) {
            delete _messageList[msgObj.id];
        }

        const element = document.getElementById(msgObj.id);
        element?.remove();

        return false;
    }

    return true;
}

function _show(node: HTMLElement, option?: IMessageOptions): string {
    const msgId: string = option?.id || `msg_tip_${guid().replace("-", "_")}`;
    const msgObj: IMessage = {
        id: msgId,
        node: node,
        during: option?.during || -1,
        timeout: -1,
        onClose: option?.onClose,
        onOpen: option?.onOpen,
        fnClose: _FN_MESSAGE_DEFAULT_CLOSE_,
    };
    msgObj.fnClose = msgObj.fnClose.bind(msgObj);

    _show_on_layout(msgObj);

    return (_show_on_layout(msgObj) && msgId) || "";
}

function _close(msgId: string): void {
    const msgObj = _messageList[msgId];
    if (!!!msgObj) {
        return;
    }

    // remove from ui
    const element = document.getElementById(msgObj.id);
    element?.remove();

    // call onclose
    msgObj.onClose?.();

    // clear timer if needs
    if (msgObj.timeout !== -1) {
        window.clearTimeout(msgObj.timeout);
    }

    // remove from list
    delete _messageList[msgId];
}

function _totalMsgs(): number {
    return Object.keys(_messageList).length;
}

const Message = {
    show: _show,
    close: _close,
    count: _totalMsgs,
};

function initiation(): void {
    if (tianyuShell.core.ui) {
        tianyuShell.core.ui.message = Message;
    }

    const div = document.createElement("div");
    div.classList.add("ts_ui_msg");
    div.id = msgLayoutId;

    document.body.appendChild(div);
}

initiation();

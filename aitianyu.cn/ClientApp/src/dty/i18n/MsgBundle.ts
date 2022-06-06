/**@format */

import { formatedLocationArea } from "../core/AreaHelper";
import { IMessageBundle } from "../core/IMessageBundle";
import { FetchFileLoader } from "../FileLoader";

export interface IMsgBundle extends IMessageBundle {
    getI18n(key: string): string;
}

export function getMsgBundle(): IMsgBundle {
    if (!MsgBundle.MsgBundleObject) {
        MsgBundle.MsgBundleObject = new MsgBundle();
    }

    return MsgBundle.MsgBundleObject;
}

export async function loadMsgSource(name: string): Promise<void> {
    const msgBundle = getMsgBundle() as MsgBundle;
    if (msgBundle.isSourceLoaded(name)) {
        return;
    }

    const fileLoader = new FetchFileLoader(`/i18n/${name}_${localStorage["language"] || formatedLocationArea()}.json`);
    const file = await fileLoader.openAsync();

    try {
        const json = JSON.parse(file);
        msgBundle.addMessageJson(name, json);
    } catch {
        //
    }
}

class MsgBundle implements IMsgBundle {
    public static MsgBundleObject: MsgBundle | null = null;

    private _MessageSources: string[];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _MessageJson: any;

    public constructor() {
        // this.initMsgJson();
        this._MessageSources = [];
    }

    public getText(key: string): string | null {
        return this._MessageJson?.[key] ?? null;
    }
    public getI18n(key: string): string {
        return this.getText(key) || key;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public addMessageJson(source: string, json: any): void {
        if (this._MessageSources.includes(source)) {
            return;
        }

        this._MessageSources.push(source);
        this._MessageJson = {
            ...this._MessageJson,
            ...json,
        };
    }

    public isSourceLoaded(source: string): boolean {
        return this._MessageSources.includes(source);
    }
}

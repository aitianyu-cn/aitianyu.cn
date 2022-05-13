/**@format */

import { IMessageBundle } from "../model/IMessageBundle";
import { IKeyValuePair } from "./Types";

export class MemoryMessageBundle implements IMessageBundle {
    private KeyValuePair: IKeyValuePair;

    public constructor() {
        this.KeyValuePair = {};
    }

    public count(): number {
        return Object.keys(this.KeyValuePair).length;
    }
    public contains(key: string): boolean {
        return !!this.KeyValuePair[key];
    }
    public clear(): void {
        this.KeyValuePair = {};
    }
    public removeText(key: string): void {
        if (this.KeyValuePair[key]) {
            delete this.KeyValuePair[key];
        }
    }

    public getText(key: string): string | null {
        return this.KeyValuePair[key] || null;
    }
    public setText(key: string, text: string): void {
        this.KeyValuePair[key] = text;
    }
}

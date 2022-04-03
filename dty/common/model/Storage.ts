/**@format */

import { EventAdapter, IEventListener } from "dty-common/core/Events";
import { IStorageBase, IStorageValue } from "dty-common/core/IStorage";
import { generateStorageValue } from "./StorageValue";

class StorageItem {
    private _Value: IStorageValue;
    private _Adapter: EventAdapter<IStorageValue>;

    public constructor(value: string | number | boolean | object) {
        this._Value = generateStorageValue(value);
        this._Adapter = new EventAdapter<IStorageValue>();
    }

    public setValue(value: string | number | boolean | object): void {
        this._Value.setValue(value);
        this._Adapter.fireEvents(this._Value);
    }

    public getString(): string {
        return this._Value.getString();
    }
    public getNumber(): number {
        return this._Value.getNumber();
    }
    public getFloat(): number {
        return this._Value.getFloat();
    }
    public getBoolean(): boolean {
        return this._Value.getBoolean();
    }
    public getObject(): object {
        return this._Value.getObject();
    }

    public addListener(listener: string, listenerInstance: IEventListener<IStorageValue>): void {
        this._Adapter.addListener(listener, listenerInstance);
    }
    public removeListener(listener: string): void {
        this._Adapter.removeListener(listener);
    }
    public containsListener(listener: string): boolean {
        return this._Adapter.containsListener(listener);
    }
    public clearListener(): void {
        this._Adapter.clear();
    }
    public fireEvent(listener: string, sender?: object): void {
        this._Adapter.fireEvent(listener, this._Value, sender);
    }
    public fireEvents(sender?: object): void {
        this._Adapter.fireEvents(this._Value, sender);
    }
}

interface IStorageKeyValuePair {
    [storageKey: string]: StorageItem;
}

export class StorageBase implements IStorageBase {
    private StorageKeyValuePair: IStorageKeyValuePair;

    public constructor() {
        this.StorageKeyValuePair = {};
    }

    public setValue(storageKey: string, storageValue: string | number | boolean | object): void {
        if (this.containsKey(storageKey)) {
            this.StorageKeyValuePair[storageKey].setValue(storageValue);
            return;
        }

        this.StorageKeyValuePair[storageKey] = new StorageItem(storageValue);
    }

    public setString(storageKey: string, storageValue: string): void {
        this.setValue(storageKey, storageValue);
    }
    public setNumber(storageKey: string, storageValue: number): void {
        this.setValue(storageKey, storageValue);
    }
    public setBoolean(storageKey: string, storageValue: boolean): void {
        this.setValue(storageKey, storageValue);
    }
    public setObject(storageKey: string, storageValue: object): void {
        this.setValue(storageKey, storageValue);
    }

    public getString(storageKey: string): string {
        return this.StorageKeyValuePair[storageKey]?.getString() || "";
    }
    public getNumber(storageKey: string): number {
        return this.StorageKeyValuePair[storageKey]?.getNumber() || 0;
    }
    public getFloat(storageKey: string): number {
        return this.StorageKeyValuePair[storageKey]?.getFloat() || 0.0;
    }
    public getBoolean(storageKey: string): boolean {
        return this.StorageKeyValuePair[storageKey]?.getBoolean() || false;
    }
    public getObject(storageKey: string): object {
        return this.StorageKeyValuePair[storageKey]?.getObject() || Object.create(null);
    }

    public clear(storageKey?: string): void {
        if (storageKey) {
            const storageItem: StorageItem | undefined = this.StorageKeyValuePair[storageKey];
            if (storageItem) {
                storageItem.clearListener();
                delete this.StorageKeyValuePair[storageKey];
            }
        } else {
            for (const key of Object.keys(this.StorageKeyValuePair)) {
                const storageItem: StorageItem = this.StorageKeyValuePair[key];
                storageItem.clearListener();
            }
            this.StorageKeyValuePair = {};
        }
    }
    public containsKey(storageKey: string): boolean {
        return !!this.StorageKeyValuePair[storageKey];
    }
    public count(): number {
        return Object.keys(this.StorageKeyValuePair).length;
    }

    public refresh(storageKey: string, storageListener?: string, sender?: object): void {
        if (this.containsKey(storageKey)) {
            const storageItem: StorageItem = this.StorageKeyValuePair[storageKey];
            if (storageListener) {
                storageItem.fireEvent(storageListener, sender);
            } else {
                storageItem.fireEvents(sender);
            }
        }
    }

    public addListener(storageKey: string, listener: string, listenerInstance: IEventListener<IStorageValue>): void {
        if (!this.containsKey(storageKey)) {
            this.StorageKeyValuePair[storageKey] = new StorageItem("");
        }

        const storageItem: StorageItem = this.StorageKeyValuePair[storageKey];
        storageItem.addListener(listener, listenerInstance);
    }
    public remoteListener(storageKey: string, listener: string): void {
        if (this.containsKey(storageKey)) {
            const storageItem: StorageItem = this.StorageKeyValuePair[storageKey];
            storageItem.removeListener(listener);
        }
    }
    public containsListener(storageKey: string, listener: string): boolean {
        return this.StorageKeyValuePair[storageKey]?.containsListener(listener);
    }
}

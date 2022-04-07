/**@format */

import { IEventListener } from "./Events";

export enum StorageValueType {
    String,
    Number,
    Float,
    Boolean,
    Object,
    Unknown,
}

export interface IStorageValue {
    setString(value: string): void;
    setNumber(value: number): void;
    setBoolean(value: boolean): void;
    setObject(value: object): void;

    getType(): StorageValueType;
    getString(): string;
    getNumber(): number;
    getFloat(): number;
    getBoolean(): boolean;
    getObject(): object | null;
}

export interface IStorageBase {
    setValue(storageKey: string, storageValue: string | number | boolean | object): void;

    setString(storageKey: string, storageValue: string): void;
    setNumber(storageKey: string, storageValue: number): void;
    setBoolean(storageKey: string, storageValue: boolean): void;
    setObject(storageKey: string, storageValue: object): void;

    getString(storageKey: string): string;
    getNumber(storageKey: string): number;
    getFloat(storageKey: string): number;
    getBoolean(storageKey: string): boolean;
    getObject(storageKey: string): object | null;

    clear(storageKey?: string): void;
    containsKey(storageKey: string): boolean;
    count(): number;

    refresh(storageKey: string, storageListener?: string, sender?: object): void;

    addListener(storageKey: string, listener: string, listenerInstance: IEventListener<IStorageValue>): void;
    remoteListener(storageKey: string, listener: string): void;
    containsListener(storageKey: string, listener: string): boolean;
}

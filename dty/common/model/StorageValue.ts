/**@format */

import { IStorageValue, StorageValueType } from "dty-common/model/IStorage";
import { OperationNotSupportError } from "dty-common/error/OperationNotSupportError";

class StorageString implements IStorageValue {
    private _Value: string;

    public constructor(value?: string) {
        this._Value = value || "";
    }

    public setString(value: string): void {
        this._Value = value;
    }
    public setNumber(value: number): void {
        this._Value = value.toString();
    }
    public setBoolean(value: boolean): void {
        this._Value = value ? "true" : "false";
    }
    public setObject(value: object): void {
        this._Value = value.toString?.() || "object";
    }
    public getType(): StorageValueType {
        return StorageValueType.String;
    }
    public getString(): string {
        return this._Value;
    }
    public getNumber(): number {
        return Number.parseInt(this._Value);
    }
    public getFloat(): number {
        return Number.parseFloat(this._Value);
    }
    public getBoolean(): boolean {
        return !!this._Value && "true" === this._Value.toLowerCase();
    }
    public getObject(): object | null {
        return null;
    }
}

class StorageNumber implements IStorageValue {
    private _Value: number;

    public constructor(value?: number) {
        this._Value = value || 0;
    }

    public setString(value: string): void {
        const numberValue: number = Number.parseFloat(value);
        if (!Number.isNaN(numberValue)) {
            this._Value = numberValue;
        }
    }
    public setNumber(value: number): void {
        this._Value = value;
    }
    public setBoolean(value: boolean): void {
        this._Value = value ? 1 : 0;
    }
    public setObject(value: object): void {
        const formattedString = `setObject(value: object): void is not supported for StorageValue-Number (value = ${
            value.toString?.() || "object"
        })`;
        throw new OperationNotSupportError(formattedString);
    }
    public getType(): StorageValueType {
        return Number.isInteger(this._Value) ? StorageValueType.Number : StorageValueType.Float;
    }
    public getString(): string {
        return this._Value.toString();
    }
    public getNumber(): number {
        return this._Value;
    }
    public getFloat(): number {
        return this._Value;
    }
    public getBoolean(): boolean {
        return 0 !== this._Value;
    }
    public getObject(): object | null {
        return null;
    }
}

class StorageBoolean implements IStorageValue {
    private _Value: boolean;

    public constructor(value?: boolean) {
        this._Value = !!value && value;
    }

    public setString(value: string): void {
        this._Value = !!value && "false" !== value.toLowerCase();
    }
    public setNumber(value: number): void {
        this._Value = 0 !== value;
    }
    public setBoolean(value: boolean): void {
        this._Value = value;
    }
    public setObject(value: object): void {
        const formattedString = `setObject(value: object): void is not supported for StorageValue-Boolean (value = ${
            value.toString?.() || "object"
        })`;
        throw new OperationNotSupportError(formattedString);
    }
    public getType(): StorageValueType {
        return StorageValueType.Boolean;
    }
    public getString(): string {
        return this._Value ? "true" : "false";
    }
    public getNumber(): number {
        return this._Value ? 1 : 0;
    }
    public getFloat(): number {
        return this._Value ? 1.0 : 0.0;
    }
    public getBoolean(): boolean {
        return this._Value;
    }
    public getObject(): object | null {
        return null;
    }
}

class StorageObject implements IStorageValue {
    private _Value: object | null;

    public constructor(value?: object) {
        this._Value = value || null;
    }

    public setString(value: string): void {
        const formattedString = `setObject(value: string): void is not supported for StorageValue-Object (value = ${value})`;
        throw new OperationNotSupportError(formattedString);
    }
    public setNumber(value: number): void {
        const formattedString = `setObject(value: number): void is not supported for StorageValue-Object (value = ${value})`;
        throw new OperationNotSupportError(formattedString);
    }
    public setBoolean(value: boolean): void {
        const formattedString = `setObject(value: boolean): void is not supported for StorageValue-Object (value = ${value})`;
        throw new OperationNotSupportError(formattedString);
    }
    public setObject(value: object): void {
        this._Value = value;
    }
    public getType(): StorageValueType {
        return StorageValueType.Object;
    }
    public getString(): string {
        return this._Value ? this._Value.toString?.() || "object" : "null";
    }
    public getNumber(): number {
        return this._Value ? 1 : 0;
    }
    public getFloat(): number {
        return this._Value ? 1.0 : 0.0;
    }
    public getBoolean(): boolean {
        return !!this._Value;
    }
    public getObject(): object | null {
        return this._Value;
    }
}

export class StorageValueHelper {
    public static generateString(value?: string): IStorageValue {
        return new StorageString(value);
    }
    public static generateNumber(value?: number): IStorageValue {
        return new StorageNumber(value);
    }
    public static generateBoolean(value?: boolean): IStorageValue {
        return new StorageBoolean(value);
    }
    public static generateObject(value?: object): IStorageValue {
        return new StorageObject(value);
    }
}

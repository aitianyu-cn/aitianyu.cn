/**@format */

import { IStorageValue, StorageValueType } from "dty-common/core/IStorage";

class StorageValue implements IStorageValue {
    private _Value: string | number | boolean | object;

    public constructor(value?: string | number | boolean | object | StorageValueType) {
        const valueType: StorageValueType = <StorageValueType>value;
        if (valueType) {
            switch (valueType) {
                case StorageValueType.Boolean:
                    this._Value = false;
                    break;
                case StorageValueType.Float:
                    this._Value = 0.0;
                    break;
                case StorageValueType.Number:
                    this._Value = 0;
                    break;
                case StorageValueType.Object:
                    this._Value = Object.create(null);
                    break;
                default:
                    this._Value = "";
                    break;
            }
        } else {
            this._Value = value || "";
        }
    }

    public getType(): StorageValueType {
        if (typeof this._Value === "string") {
            return StorageValueType.String;
        }
        if (typeof this._Value === "number") {
            Number.isInteger(this._Value) ? StorageValueType.Number : StorageValueType.Float;
        }
        if (typeof this._Value === "boolean") {
            return StorageValueType.Boolean;
        }
        if (typeof this._Value === "object") {
            return StorageValueType.Object;
        }

        return StorageValueType.Unknown;
    }

    public setValue(value: string | number | boolean | object): void {
        if (value instanceof String) {
            this.setString(value as string);
        }
    }
    public setString(value: string): void {
        this._Value = value;
    }
    public setNumber(value: number): void {
        this._Value = value;
    }
    public setBoolean(value: boolean): void {
        this._Value = value;
    }
    public setObject(value: object): void {
        this._Value = value.toString?.() || "[object: object]";
    }
    public getString(): string {
        return this._Value.toString();
    }
    public getNumber(): number {
        return Number.parseInt(this._Value.toString());
    }
    public getFloat(): number {
        return Number.parseFloat(this._Value.toString());
    }
    public getBoolean(): boolean {
        const _ValueToBoolean: boolean = this._Value as boolean;
        const _ValueToString: string = this._Value as string;
        const _ValueToNumber: number = this._Value as number;
        const _ValueToObject: object = this._Value as object;

        return (
            !!this._Value &&
            (_ValueToBoolean ||
                (!!_ValueToNumber && 0 !== _ValueToNumber) ||
                (!!_ValueToString && "true" === _ValueToString.toLowerCase()) ||
                !!_ValueToObject)
        );
    }
    public getObject(): object {
        return this._Value as object;
    }
}

export function generateStorageValue(value?: string | number | boolean | object): IStorageValue {
    return new StorageValue(value);
}

export function generateEmptyStorageValue(valueType: StorageValueType): IStorageValue {
    return new StorageValue(valueType);
}

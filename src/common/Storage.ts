import { fnIStorageValueChange, IStorage, IStorageInstance } from "./IStorage";
import { AreaCode } from "./tianyuCore/AreaCode";
import { IKey, IValue } from "./tianyuCore/IKeyValueCommon";

export class Storage implements IStorage {
    private _eArea: AreaCode;

    constructor() {
        this._eArea = AreaCode.zh_CN;
    }
    clearAll(): void;
    clearAll(oInstance: IStorageInstance): void;
    clearAll(oInstance?: any): void {
        throw new Error("Method not implemented.");
    }
    clearValues(): void;
    clearValues(oInstance: IStorageInstance): void;
    clearValues(oInstance?: any): void {
        throw new Error("Method not implemented.");
    }
    clearRegisters(): void;
    clearRegisters(oInstance: IStorageInstance): void;
    clearRegisters(oInstance?: any): void {
        throw new Error("Method not implemented.");
    }

    getArea(): AreaCode {
        return this._eArea;
    }
    setArea(areaCode: AreaCode): void {
        this._eArea = areaCode;
    }
    registerValueChange(key: IKey, fnAction: fnIStorageValueChange, oInstance: IStorageInstance): boolean {
        throw new Error("Method not implemented.");
    }
    unRegisterValueChange(key: IKey, oInstance: IStorageInstance): boolean {
        throw new Error("Method not implemented.");
    }
    setValue(key: IKey, changedValue: IValue, oInstance: IStorageInstance, isPrivate: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    getValue(key: IKey, oInstance: IStorageInstance, allowPublic: boolean): IValue {
        throw new Error("Method not implemented.");
    }
    delValue(key: IKey, oInstance: IStorageInstance, isPrivate: boolean, isAll: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    contains(key: IKey, oInstance: IStorageInstance, allowPublic: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    
}
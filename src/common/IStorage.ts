import { IKey, IValue } from "./tianyuCore/IKeyValueCommon";
import { Guid } from "./tianyuCore/Guid";
import { AreaCode } from "./tianyuCore/AreaCode";

export interface IStorageInstance {
    getId(): Guid
}
export type fnIStorageValueChange = (changedValue: IValue)=> boolean;

export interface IStorage {
    getArea(): AreaCode;
    setArea(areaCode: AreaCode): void;

    clearAll(): void;
    clearAll(oInstance: IStorageInstance): void;
    clearValues(): void;
    clearValues(oInstance: IStorageInstance): void;
    clearRegisters(): void;
    clearRegisters(oInstance: IStorageInstance): void;

    registerValueChange(key: IKey, fnAction: fnIStorageValueChange, oInstance: IStorageInstance): boolean;
    unRegisterValueChange(key: IKey, oInstance: IStorageInstance): boolean;

    setValue(key: IKey, changedValue: IValue, oInstance: IStorageInstance, isPrivate: boolean): boolean;
    getValue(key: IKey, oInstance: IStorageInstance, allowPublic: boolean): IValue;
    delValue(key: IKey, oInstance: IStorageInstance, isPrivate: boolean, isAll: boolean): boolean;

    contains(key: IKey, oInstance: IStorageInstance, allowPublic: boolean): boolean;
}

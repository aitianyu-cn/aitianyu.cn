import { Guid } from "./Guid";
import { IComparable, IEquals } from "./IComparable";

export enum ValueType {
    UnKnown,
    Boolean,
    Number,
    Array,
    Object,
}
export interface IKeyValueCommon extends IComparable, IEquals {
    getId(): Guid;
    getObjectHash(): Guid;
}
export interface IKey extends IKeyValueCommon {
    getObjectString(): string;
}
export interface IValue extends IKeyValueCommon {
    getValueType(): ValueType;
    getValue(): object;
}
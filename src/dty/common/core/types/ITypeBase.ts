/**@format */

export enum TianyuTypes {
    String,
    Integer,
    Float,
    Object,
    Enum,
}

export interface ITypeBase {
    getType(): TianyuTypes;
    toString(): ITypeBase;
}

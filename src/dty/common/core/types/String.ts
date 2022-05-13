/**@format */

import { ITypeBase, TianyuTypes } from "./ITypeBase";

export class String implements ITypeBase {
    private _Value: string;

    public constructor(value?: string) {
        this._Value = value ?? "";
    }

    public getType(): TianyuTypes {
        return TianyuTypes.String;
    }
    public toString(): ITypeBase {
        return this;
    }
}

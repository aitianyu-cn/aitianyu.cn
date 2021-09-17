import { IComparable, IEquals } from "./IComparable";

export class Guid implements IComparable, IEquals {
    private _aGuids: number[];

    public constructor(aInit: number[]) {
        if (!!!aInit) {
            throw new Error();
        }

        this._aGuids = [];
        let emptyLength = Guid.guidBytesLength - aInit.length;
        emptyLength = 0 > emptyLength ? 0 : emptyLength;

        let i = 0;
        for (; i < emptyLength; ++i) {
            this._aGuids.push(0);
        }

        for (let j = 0; j < aInit.length; ++j) {
            this._aGuids[j + i] = aInit[j];
        }
    }

    public toString(): string {
        return this._aGuids.join("-");
    }

    public compareTo(obj: object): number {
        if (!!!obj || !(obj instanceof(Guid))) {
            return 1;
        }
        
        let sub = 0;
        for (let i = 0; i < Guid.guidBytesLength && 0 === sub; ++i) {
            sub = this._aGuids[i] - (obj as Guid)._aGuids[i];
        }

        return sub;
    }
    public equals(obj: object): boolean {
        const isObjectEqual = !!obj && (obj instanceof(Guid));
        let isEquals = true;

        for (let i = 0; isObjectEqual && i < Guid.guidBytesLength && isEquals; ++i) {
            isEquals = isEquals && (this._aGuids[i] === (obj as Guid)._aGuids[i]);
        }

        return isObjectEqual && isEquals;
    }

    public static guidBytesLength: number = 16;
}
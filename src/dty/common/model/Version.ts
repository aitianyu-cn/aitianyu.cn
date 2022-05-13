/**@format */

export class Version {
    private _MajorVersion: number;
    private _MinnorVersion: number;
    private _SubMinnorVersion: number;

    public constructor(versionString?: string) {
        this._MajorVersion = 0;
        this._MinnorVersion = 0;
        this._SubMinnorVersion = 1;

        if (versionString) {
            this.initVersion(versionString);
        }
    }

    public getMajor() {
        return this._MajorVersion;
    }

    public getMinnor() {
        return this._MinnorVersion;
    }

    public getSubMinnor() {
        return this._SubMinnorVersion;
    }

    public toString(): string {
        return `${this._MajorVersion}.${this._MinnorVersion}.${this._SubMinnorVersion}`;
    }

    private initVersion(version: string) {
        const versionReg = /[0-9]+.[0-9]+.[0-9]+/;
        if (!versionReg.test(version)) {
            return;
        }

        const aVersionItems: string[] = version.split(".");
        const aVersionItemsLength: number = aVersionItems.length;
        if (3 > aVersionItemsLength) {
            return;
        }

        const subMinnor: number = Number.parseInt(aVersionItems[aVersionItemsLength - 1]);
        const minnor: number = Number.parseInt(aVersionItems[aVersionItemsLength - 2]);
        const major: number = Number.parseInt(aVersionItems[aVersionItemsLength - 3]);

        this._SubMinnorVersion = Number.isInteger(subMinnor) ? subMinnor : 1;
        this._MinnorVersion = Number.isInteger(minnor) ? minnor : 0;
        this._MajorVersion = Number.isInteger(major) ? major : 0;
    }
}

/**@format */

export class MemoryMessageQueue {
    private _LimitSize: number;
    private _Queue: string[];

    public constructor(limitSize?: number) {
        this._LimitSize = limitSize && 0 < limitSize ? limitSize : -1;
        this._Queue = [];
    }

    public count(): number {
        return this._Queue.length;
    }
    public clear(): void {
        this._Queue = [];
    }

    public pushText(text: string): void {
        this._Queue.push(text);

        if (-1 !== this._LimitSize && this._Queue.length > this._LimitSize) {
            this._Queue.shift();
        }
    }

    public getText(): string | null {
        return this._Queue.shift() || null;
    }

    public copyTexts(): string[] {
        return this._Queue.concat();
    }
}

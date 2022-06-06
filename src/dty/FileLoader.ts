/**@format */

export abstract class FileLoaderBase {
    protected url: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected response: any;

    public constructor(url: string) {
        this.url = url;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getResponse(): any {
        return this.response;
    }

    public abstract open(): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract openAsync(): Promise<any>;
}

export class XMLHttpFileLoader extends FileLoaderBase {
    private send: Document | XMLHttpRequestBodyInit | null;
    private onload: (() => void) | null;
    private onerror: (() => void) | null;

    public constructor(url: string) {
        super(url);
        this.send = null;
        this.onload = null;
        this.onerror = null;
    }

    public setSend(send: Document | XMLHttpRequestBodyInit): void {
        this.send = send;
    }
    public setOnload(callback: () => void): void {
        this.onload = callback;
    }
    public setOnerror(callback: () => void): void {
        this.onerror = callback;
    }

    public override open(): void {
        try {
            const request = new XMLHttpRequest();
            const hasPreSplit = this.url.startsWith("/");
            request.open("get", `/resources${hasPreSplit ? "" : "/"}${this.url}`);
            request.send(this.send);
            request.onload = () => {
                if (request.status === 200) {
                    this.response = request.response;
                    if (this.onload) {
                        this.onload();
                    }
                } else if (this.onerror) {
                    this.onerror();
                }
            };
        } catch {
            if (this.onerror) {
                this.onerror();
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public override openAsync(): Promise<any> {
        throw Error("not implementation");
    }
}

export class FetchFileLoader extends FileLoaderBase {
    public constructor(url: string) {
        super(url);
    }

    public override open(): void {
        this.openAsync();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public override async openAsync(): Promise<any> {
        try {
            const hasPreSplit = this.url.startsWith("/");
            const response = await fetch(`/resources${hasPreSplit ? "" : "/"}${this.url}`);
            this.response = await response.text();

            return this.response;
        } catch {
            return null;
        }
    }
}

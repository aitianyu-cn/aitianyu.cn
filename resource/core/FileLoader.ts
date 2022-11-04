/**@format */

export abstract class FileLoaderBase<ResponseType> {
    protected url: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected response: ResponseType | null;

    public constructor(url: string) {
        this.url = url;
        this.response = null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getResponse(): ResponseType | null {
        return this.response;
    }

    public abstract open(): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract openAsync(): Promise<ResponseType>;
}

export class XMLHttpFileLoader<ResponseType> extends FileLoaderBase<ResponseType> {
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
            request.open("get", this.url);
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
        return new Promise<any>((resolve, reject) => {
            try {
                const request = new XMLHttpRequest();
                request.open("get", this.url);
                request.send(this.send);
                request.onload = () => {
                    if (request.status === 200) {
                        this.response = request.response;
                        if (this.onload) {
                            this.onload();
                        }
                        resolve(this.response);
                    } else {
                        if (this.onerror) {
                            this.onerror();
                        }
                        reject();
                    }
                };
            } catch {
                if (this.onerror) {
                    this.onerror();
                }
                reject();
            }
        });
    }
}

export class FetchFileLoader extends FileLoaderBase<any> {
    public constructor(url: string) {
        super(url);
    }

    public override open(): void {
        this.openAsync();
    }

    public override async openAsync(): Promise<any> {
        try {
            const hasPreSplit = this.url.startsWith("/");
            const response = await fetch(this.url);
            const responseText = await response.text();
            this.response = JSON.parse(responseText || "{}");

            return this.response;
        } catch {
            return null;
        }
    }
}

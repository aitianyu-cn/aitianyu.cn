/**@format */

import { DatabasePools, IHttpResponseError } from "@aitianyu.cn/server-base";

export class Author {
    private authorString: string;
    private authorName: string;
    private authorToken: string;

    private initialized: boolean;

    public constructor(authorString: string) {
        this.authorString = authorString;
        this.authorName = "";
        this.authorToken = "";

        this.initialized = false;

        this._init();
    }

    public author(): string {
        return this.authorName;
    }

    public token(): string {
        return this.authorToken;
    }

    public valid(): boolean {
        return this.initialized;
    }

    private _init(): void {
        //
    }

    public static generateAuthor(name: string, key: string): string {
        return "";
    }

    public static generateSubAuthor(mainAuthor: string, name: string, key: string): string {
        return "";
    }
}

export async function getUserByAuthor(
    databasePool: DatabasePools,
    author: string,
    key: string,
    messageList: IHttpResponseError[],
): Promise<string> {
    return new Promise<string>((resolve) => {
        try {
            databasePool.execute(
                "daily",
                "SELECT `user` FROM daily.user WHERE `author` = '" + author + "' AND `key` = '" + key + "';",
                (result) => {
                    if (!Array.isArray(result) || !result.length) {
                        resolve("");
                        return;
                    }

                    resolve(`${result[0]["user"]}`);
                },
                (error) => {
                    messageList.push({ code: -1, text: error });
                    resolve("");
                },
            );
        } catch (e) {
            messageList.push({ code: -1, text: (e as any)?.message || "" });
            resolve("");
        }
    });
}

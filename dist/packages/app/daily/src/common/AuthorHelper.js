"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByAuthor = exports.Author = void 0;
class Author {
    constructor(authorString) {
        this.authorString = authorString;
        this.authorName = "";
        this.authorToken = "";
        this.initialized = false;
        this._init();
    }
    author() {
        return this.authorName;
    }
    token() {
        return this.authorToken;
    }
    valid() {
        return this.initialized;
    }
    _init() {
        //
    }
    static generateAuthor(name, key) {
        return "";
    }
    static generateSubAuthor(mainAuthor, name, key) {
        return "";
    }
}
exports.Author = Author;
async function getUserByAuthor(databasePool, author, key, messageList) {
    return new Promise((resolve) => {
        try {
            databasePool.execute("daily", "SELECT `user` FROM daily.user WHERE `author` = '" + author + "' AND `key` = '" + key + "';", (result) => {
                if (!Array.isArray(result) || !result.length) {
                    resolve("");
                    return;
                }
                resolve(`${result[0]["user"]}`);
            }, (error) => {
                messageList.push({ code: -1, text: error });
                resolve("");
            });
        }
        catch (e) {
            messageList.push({ code: -1, text: e?.message || "" });
            resolve("");
        }
    });
}
exports.getUserByAuthor = getUserByAuthor;

"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsDispatcher = void 0;
const AuthorHelper_1 = require("../common/AuthorHelper");
class UtilsDispatcher {
    constructor(dbPool) {
        this.databasePool = dbPool;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/app/daily/infar/generator/author", this._generateAuthor.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/infar/generator/subAuthor", this._generateSubAuthor.bind(this));
        handler.setRouter("aitianyu/cn/app/daily/infar/getUser", this._getUser.bind(this));
    }
    async _generateAuthor(query, messageList) {
        return "failed";
    }
    async _generateSubAuthor(query, messageList) {
        return "failed";
    }
    async _getUser(query, messageList) {
        const author = query.query["author"] || "";
        const key = query.query["key"] || "";
        return (0, AuthorHelper_1.getUserByAuthor)(this.databasePool, author, key, messageList);
    }
}
exports.UtilsDispatcher = UtilsDispatcher;

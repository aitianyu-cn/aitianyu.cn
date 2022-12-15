"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
const server_base_1 = require("@aitianyu.cn/server-base");
const GitToolDispatcher_1 = require("./src/dispatcher/GitToolDispatcher");
const dbConfig = require("./src/config/mysql.config.json");
const databasePool = new server_base_1.DatabasePools(dbConfig);
const handler = new server_base_1.HttpHandler();
const gitToolDispatcher = new GitToolDispatcher_1.GitToolDispatcher(databasePool);
gitToolDispatcher.createDispatches(handler);
const server = (0, server_base_1.createServer)((req, res) => {
    handler.getter(req, res);
}, (req, res) => {
    handler.poster(req, res);
}, (error) => {
    console.error(error);
});
server.listen(9100, "0.0.0.0");

"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
const server_base_1 = require("@aitianyu.cn/server-base");
const RegisterDispatcher_1 = require("./src/dispatcher/RegisterDispatcher");
const OnlineDispatcher_1 = require("./src/dispatcher/OnlineDispatcher");
const dbConfig = require("./src/config/mysql.config.json");
const databasePool = new server_base_1.DatabasePools(dbConfig);
const handler = new server_base_1.HttpHandler();
const loginDispatcher = new RegisterDispatcher_1.RegisterDispatcher(databasePool);
loginDispatcher.createDispatches(handler);
const onlineDispatcher = new OnlineDispatcher_1.OnlineDispatcher(databasePool);
onlineDispatcher.createDispatches(handler);
const server = (0, server_base_1.createServer)((req, res) => {
    handler.getter(req, res);
}, (req, res) => {
    handler.poster(req, res);
}, (error) => {
    console.error(error);
});
server.listen(9010, "0.0.0.0");

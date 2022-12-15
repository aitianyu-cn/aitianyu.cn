"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
const server_base_1 = require("@aitianyu.cn/server-base");
const FeatureDispatcher_1 = require("./src/dispatcher/FeatureDispatcher");
const LanguageDispatcher_1 = require("./src/dispatcher/LanguageDispatcher");
const dbConfig = require("./src/config/mysql.config.json");
const databasePool = new server_base_1.DatabasePools(dbConfig);
const handler = new server_base_1.HttpHandler();
const featureDispatcher = new FeatureDispatcher_1.FeatureDispatcher(databasePool);
featureDispatcher.createDispatches(handler);
const languageDispatcher = new LanguageDispatcher_1.LanguageDispatcher(databasePool);
languageDispatcher.createDispatches(handler);
const server = (0, server_base_1.createServer)((req, res) => {
    handler.getter(req, res);
}, (req, res) => {
    handler.poster(req, res);
}, (error) => {
    console.error(error);
});
server.listen(9000, "0.0.0.0");

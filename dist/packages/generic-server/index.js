"use strict";
/**@format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_base_1 = require("@aitianyu.cn/server-base");
const FeatureDispatcher_1 = require("./src/dispatcher/FeatureDispatcher");
const LanguageDispatcher_1 = require("./src/dispatcher/LanguageDispatcher");
const path_1 = __importDefault(require("path"));
const HomePageDispatcher_1 = require("./src/dispatcher/HomePageDispatcher");
const dbConfig = require("./src/config/mysql.config.json");
const basePath = path_1.default.resolve(__dirname, "resources");
const i18nReader = new server_base_1.I18nReader(basePath);
const databasePool = new server_base_1.DatabasePools(dbConfig);
const handler = new server_base_1.HttpHandler();
const featureDispatcher = new FeatureDispatcher_1.FeatureDispatcher(databasePool);
featureDispatcher.createDispatches(handler);
const languageDispatcher = new LanguageDispatcher_1.LanguageDispatcher(databasePool);
languageDispatcher.createDispatches(handler);
const homePageDispatcher = new HomePageDispatcher_1.HomePageDispatcher(databasePool, i18nReader);
homePageDispatcher.createDispatches(handler);
const server = (0, server_base_1.createServer)((req, res) => {
    handler.getter(req, res);
}, (req, res) => {
    handler.poster(req, res);
}, (error) => {
    console.error(error);
});
server.listen(9000, "0.0.0.0");

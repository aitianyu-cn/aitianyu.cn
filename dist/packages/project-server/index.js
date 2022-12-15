"use strict";
/**@format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const server_base_1 = require("@aitianyu.cn/server-base");
const DocumentDispatcher_1 = require("./src/dispatcher/DocumentDispatcher");
const FilesDispatcher_1 = require("./src/dispatcher/FilesDispatcher");
const ProjectDispatcher_1 = require("./src/dispatcher/ProjectDispatcher");
const dbConfig = require("./src/config/mysql.config.json");
const basePath = path_1.default.resolve(__dirname, "resources");
const fServer = new server_base_1.FileService(basePath);
const i18nReader = new server_base_1.I18nReader(basePath);
const databasePool = new server_base_1.DatabasePools(dbConfig);
const handler = new server_base_1.HttpHandler();
const projectDispatches = new ProjectDispatcher_1.ProjectDispatcher(databasePool, i18nReader);
projectDispatches.createDispatches(handler);
const filesDispatcher = new FilesDispatcher_1.FilesDispatcher(fServer);
filesDispatcher.createDispatches(handler);
const documentDispatcher = new DocumentDispatcher_1.DocumentDispatcher(basePath, i18nReader);
documentDispatcher.createDispatches(handler);
const server = (0, server_base_1.createServer)((req, res) => {
    handler.getter(req, res);
}, (req, res) => {
    handler.poster(req, res);
}, (error) => {
    console.error(error);
});
server.listen(9001, "0.0.0.0");

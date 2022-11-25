/**@format */

const ProjectDispatcher = require("./src/dispatcher/ProjectDispatcher");
const HttpHandler = require("../common/handler/HttpHandler");
const I18nReader = require("../common/i18n/I18nReader");
const DatabasePools = require("../common/service/DatabasePools");
const FilesDispatcher = require("./src/dispatcher/FilesDispatcher");
const DocumentDispatcher = require("./src/dispatcher/DocumentDispatcher");
const { FileService } = require("../common/service/FileService");
const { createServer } = require("../common/service/HttpService");

const path = require("path");
const dbConfig = require("./src/config/mysql.config.json");
const basePath = path.resolve(__dirname, "resources");

const fServer = new FileService(basePath);
const i18nReader = new I18nReader(basePath);
const databasePool = new DatabasePools(dbConfig);
const handler = new HttpHandler();

const projectDispatches = new ProjectDispatcher(databasePool, i18nReader);
projectDispatches.createDispatches(handler);

const filesDispatcher = new FilesDispatcher(fServer);
filesDispatcher.createDispatches(handler);

const documentDispatcher = new DocumentDispatcher(basePath, i18nReader);
documentDispatcher.createDispatches(handler);

const server = createServer(
    (req, res) => {
        handler.getter(req, res);
    },
    (req, res) => {
        handler.poster(req, res);
    },
    (error) => {
        console.error(error);
    },
);

server.listen(9001, "0.0.0.0");

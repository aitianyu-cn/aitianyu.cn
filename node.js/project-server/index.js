/**@format */

const ProjectDispatcher = require("./src/dispatcher/ProjectDispatcher");
const HttpHandler = require("../common/handler/HttpHandler");
const I18nReader = require("../common/i18n/I18nReader");
const DatabasePools = require("../common/service/DatabasePools");
const { createServer } = require("../common/service/HttpService");
const path = require("path");

const dbConfig = require("./src/config/mysql.config.json");

const i18nReader = new I18nReader(path.resolve(__dirname, "resources"));
const databasePool = new DatabasePools(dbConfig);
const handler = new HttpHandler();

const projectDispatches = new ProjectDispatcher(databasePool, i18nReader);
projectDispatches.createDispatches(handler);

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

server.listen(9000, "[::]");

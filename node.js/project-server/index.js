/**@format */

const FeatureDispatcher = require("./src/handler/dispatcher/FeatureDispatcher");
const ProjectDispatcher = require("./src/handler/dispatcher/ProjectDispatcher");
const HttpHandler = require("./src/handler/HttpHandler");
const I18nReader = require("./src/i18n/I18nReader");
const DatabasePools = require("./src/service/DatabasePools");
const { createServer } = require("./src/service/HttpService");

const i18nReader = new I18nReader();
const databasePool = new DatabasePools();
const handler = new HttpHandler();

const featureDispatches = new FeatureDispatcher(databasePool, i18nReader);
featureDispatches.createDispatches(handler);

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

server.listen(9000);

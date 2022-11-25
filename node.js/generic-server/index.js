/**@format */

const HttpHandler = require("../common/handler/HttpHandler");
const DatabasePools = require("../common/service/DatabasePools");
const { createServer } = require("../common/service/HttpService");
const path = require("path");

const dbConfig = require("./src/config/mysql.config.json");
const FeatureDispatcher = require("./src/dispatcher/FeatureDispatcher");

const databasePool = new DatabasePools(dbConfig);
const handler = new HttpHandler();

const featureDispatcher = new FeatureDispatcher(databasePool);
featureDispatcher.createDispatches(handler);

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

server.listen(9000, "0.0.0.0");

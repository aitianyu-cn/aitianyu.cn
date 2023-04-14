"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
const server_base_1 = require("@aitianyu.cn/server-base");
const ControlDispatcher_1 = require("./src/dispatcher/ControlDispatcher");
const GetterDispatcher_1 = require("./src/dispatcher/GetterDispatcher");
const SelectionDispatcher_1 = require("./src/dispatcher/SelectionDispatcher");
const UploaderDispatcher_1 = require("./src/dispatcher/UploaderDispatcher");
const handler = new server_base_1.HttpHandler();
const controlDispatcher = new ControlDispatcher_1.ControlDispatcher();
controlDispatcher.createDispatches(handler);
const getterDispatcher = new GetterDispatcher_1.GetterDispatcher();
getterDispatcher.createDispatches(handler);
const selectionDispatcher = new SelectionDispatcher_1.SelectionDispatcher();
selectionDispatcher.createDispatches(handler);
const uploaderDispatcher = new UploaderDispatcher_1.UploaderDispatcher();
uploaderDispatcher.createDispatches(handler);
const server = (0, server_base_1.createServer)((req, res) => {
    handler.getter(req, res);
}, (req, res) => {
    handler.poster(req, res);
}, (error) => {
    console.error(error);
});
server.listen(9200, "0.0.0.0");

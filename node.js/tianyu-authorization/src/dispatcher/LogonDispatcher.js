/**
 * @format
 *
 * User logon - user and password verify
 */

const DatabasePools = require("../../../common/service/DatabasePools");
const HttpHandler = require("../../../common/handler/HttpHandler");

class LogonDispatcher {
    /**
     *
     * @param {DatabasePools} databasePool
     */
    constructor(databasePool) {
        /**@type {DatabasePools}  */
        this.dbPool = databasePool;
    }

    /**
     *
     * @param {HttpHandler} handler
     */
    createDispatches(handler) {
        //
    }
}

module.exports = LogonDispatcher;

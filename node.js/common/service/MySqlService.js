/**@format */

const mysql = require("mysql");

/**
 *
 * @param {string} database
 * @param {any} baseConfig
 * @returns {mysql.Connection}
 */
function createService(database, baseConfig) {
    // const baseConfig = require("../mysql.config.json");
    const config = {
        ...baseConfig,
        database: database,
    };

    console.log(JSON.stringify(config));

    const connection = mysql.createConnection(config);

    return connection;
}

/**
 *
 * @param {string} database
 * @param {any} baseConfig
 * @returns {mysql.Pool}
 */
function createPool(database, baseConfig) {
    // const baseConfig = require("../mysql.config.json");
    const config = {
        ...baseConfig,
        database: database,
    };

    const pool = mysql.createPool(config);

    return pool;
}

module.exports.createService = createService;
module.exports.createPool = createPool;

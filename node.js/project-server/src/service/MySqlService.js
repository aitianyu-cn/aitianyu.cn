/**@format */

const mysql = require("mysql");

function createService(database) {
    const baseConfig = require("../mysql.config.json");
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
 * @returns {mysql.Pool}
 */
function createPool(database) {
    const baseConfig = require("../mysql.config.json");
    const config = {
        ...baseConfig,
        database: database,
    };

    const pool = mysql.createPool(config);

    return pool;
}

module.exports.createService = createService;
module.exports.createPool = createPool;

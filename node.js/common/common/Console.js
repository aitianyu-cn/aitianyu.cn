/**@format */

const config = require("../../config.json");

/**
 *
 * @param {string} msg
 */
function log(msg) {
    if (config.development) {
        console.log(msg);
    }
}

module.exports.log = log;

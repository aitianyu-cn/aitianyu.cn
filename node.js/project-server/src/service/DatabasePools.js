/**@format */

const { createPool } = require("./MySqlService");
const { Pool } = require("mysql");

class DatabasePools {
    constructor() {
        this.pool = {};
    }

    /**
     *
     * @param {string} database
     * @returns {Pool}
     */
    get(database) {
        if (this.pool[database]) {
            return this.pool[database];
        }

        const newPool = createPool(database);
        this.pool[database] = newPool;

        return newPool;
    }

    destroy() {
        for (const db of Object.keys(this.pool)) {
            const pool = this.pool[db];
            pool.end();
        }
    }

    /**
     *
     * @param {string} database
     * @param {string} sql
     * @param {(any) => void} callback
     * @param {(any) => void} failed
     */
    execute(database, sql, callback, failed) {
        const pool = this.get(database);

        pool.getConnection((error, connection) => {
            if (error) {
                failed?.(error);
            } else {
                connection.query(sql, function (error, results) {
                    connection.release();

                    if (error) {
                        failed?.(error);
                    } else {
                        callback(results);
                    }
                });
            }
        });
    }
}

module.exports = DatabasePools;

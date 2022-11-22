/**@format */

const { Level } = require("level");
const sublevel = require("level-sublevel");

class LevelDatabase {
    constructor(dbPath, options = {}) {
        this.options = options;
        this.db = sublevel(new Level(dbPath, { valueEncoding: "json" }));
    }

    put(key, value, callback) {
        if (key && value) {
            this.db.put(key, value, (error) => {
                callback(error);
            });
        } else {
            callback("error: no key or value");
        }
    }

    get(key, callback) {
        if (key) {
            this.db.get(key, (error, value) => {
                callback(error && `${error} ${value}`, value);
            });
        } else {
            callback(`no key ${key}`);
        }
    }

    delete(key, callback) {
        if (key) {
            this.db.del(key, (error) => {
                callback(error);
            });
        } else {
            callback("no key");
        }
    }

    batch(arr, callback) {
        if (Array.isArray(arr)) {
            const batchList = [];
            for (const item of arr) {
                const listMember = {};
                if (item.hasOwnProperty("type")) {
                    listMember.type = item.type;
                }
                if (item.hasOwnProperty("key")) {
                    listMember.key = item.key;
                }
                if (item.hasOwnProperty("value")) {
                    listMember.value = item.value;
                }
                if (listMember.hasOwnProperty("type") && listMember.hasOwnProperty("key") && listMember.hasOwnProperty("value")) {
                    batchList.push(listMember);
                }
            }

            if (batchList && batchList.length > 0) {
                this.db.batch(batchList, (error) => {
                    callback(`${error} ${batchList}`);
                });
            } else {
                callback("array Membre format error");
            }
        } else {
            callback("not array");
        }
    }
}

module.exports = LevelDatabase;

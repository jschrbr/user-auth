/**
 * @description  Routes module for api requests.
 *
 * ```
 * connectDb().then(readModels).then(associateModels);
 *
 * db.sequelize = sequelize;
 * db.Sequelize = Sequelize;
 *
 * module.exports = db;
 * ```
 * @module db
 */
"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
/**get basename */
const basename = path.basename(module.filename);
/**get env */
const env = process.env.NODE_ENV || "development";
/**get config */
let config = require(__dirname + "/../config/config.json")[env];
let db = {};
let sequelize = {};

console.log(process.env.NODE_ENV === "production");

/**stuff
 * @async
 * @func
 * @property {class} sequelize
 */
const connectDb = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      config = {
        username: process.env.JAWSDB_USER,
        password: process.env.JAWSDB_PASS,
        database: process.env.JAWSDB_DB,
        host: process.env.JAWSDB_HOST,
        dialect: "mysql",
      };
    }
    console.log(config.database);
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  } catch (err) {
    console.log(err);
  }
};

/**stuff
 * @async
 * @func
 * @property {function} readdirSync
 * @property {function} filter
 * @property {function} forEach
 */
const readModels = async () => {
  try {
    fs.readdirSync(__dirname)
      .filter(function (file) {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
        );
      })
      .forEach(function (file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
      });
  } catch (err) {
    console.log(err);
  }
};

/**stuff
 * @async
 * @func
 * @property {function} forEach
 */
const associateModels = async () => {
  try {
    Object.keys(db).forEach(function (modelName) {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

connectDb().then(readModels).then(associateModels);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

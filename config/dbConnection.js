const {Sequelize} = require("sequelize");
const config = require("config");
const blacklistCustomConfig = config.get("customEnvVars.blacklist");
const dbConfig = config.get("dbConfig.blacklist");

const blacklistDB = new Sequelize(dbConfig.database, blacklistCustomConfig.user, blacklistCustomConfig.pass, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

module.exports = blacklistDB;

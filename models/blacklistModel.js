const {DataTypes} = require("sequelize");
const blacklistDB = require("../config/dbConnection");

const Blacklist = blacklistDB.define("blacklist", {
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blacklist: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Blacklist;

const blacklistDB = require("../models/blacklistModel");

async function getAllData() {
    return await blacklistDB.findAll({});
}

async function getDataByIp(ip) {
    return await blacklistDB.findAll({
        where: {
            ip: ip
        }
    });
}

async function addToBlacklist(ip) {
    return await blacklistDB.create({
        ip: ip,
        blacklist: true,
        origin: "AlcimiLab API Server"
    });
}

module.exports = {
    getDataByIp,
    getAllData,
    addToBlacklist
};

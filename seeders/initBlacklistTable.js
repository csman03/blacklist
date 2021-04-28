const Blacklist = require("../models/blacklistModel");

async function createBlacklist() {
    try {
        await Blacklist.sync();
    } catch (err) {
        throw new Error(`Error while creating blacklist table: ${err}`);
    }
}

module.exports = createBlacklist;
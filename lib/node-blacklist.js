const { Sequelize, DataTypes} = require("sequelize").default;
const config = require("config");
const blacklistCustomConfig = config.get("customEnvVars.blacklist");
const dbConfig = config.get("dbConfig.blacklist");

let blacklistDB=null;
let Blacklist=null;

async function initBlacklist(res, req, next) {

    try {
        if (!blacklistDB) {
            console.log("Initializing " + dbConfig.database + " database...");
            blacklistDB = await new Sequelize(dbConfig.database, blacklistCustomConfig.user, blacklistCustomConfig.pass, {
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
            await blacklistDB.authenticate();
            console.log("Connection to " + dbConfig.database + " database has been established successfully.");
        }


        if (!Blacklist) {
            console.log("Initializing " + dbConfig.database + " scheme...");
            Blacklist = await blacklistDB.define("blacklist", {
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

            await Blacklist.sync();
            console.log("Scheme for " + dbConfig.database + " database has been created successfully.");
        }


    } catch (err) {
        console.log("No connection to Blacklist DB, exiting.")
        if(!next) {
            process.exit();
        }
        next(err);
        // next(err);
    }

}

async function getDataByIp(ip) {
    await initBlacklist();
    return await Blacklist.findAll({
        where: {
            ip: ip
        }
    });
}

async function addToBlacklist(ip) {
    await initBlacklist();
    const res = await getDataByIp(ip);

    if(!res.length) {
        return await Blacklist.create({
            ip: ip,
            blacklist: true,
            origin: "AlcimiLab API Server"
        });
    }
}

async function blockRequests(req, res, next) {
    await initBlacklist(req, res, next);

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    getDataByIp(ip)
        .then(data => {
            if (data.length) {
                console.log("IP is blocked: " + ip);
                return res.status(200).send({message: "your ip is blocked: " + ip});
            } else {
                next();
            }
        })
}

module.exports = { blockRequests, addToBlacklist, initBlacklist }

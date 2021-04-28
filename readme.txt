ERROR HANDLING

Only createBlacklistTable is wrapped in try-catch block, the DAO functions not, so you should handle the possible errors there.

INIT BLACKLIST TABLE

It will init the global blacklist data table using the blacklistModel file if not exists, you should require it at server startup.

DB CONNECTION

It assumes that you are using npm config package with the following structure:

custom-environment-variables.json:

{
    "customEnvVars": {

        "blacklist": {
            "user": "blacklist_user",
            "pass": "blacklist_pass"
        }

    }
}

default || development || production.json:

{
    "dbConfig": {
        "blacklist": {
            "host": "",
            "port": 9999,
            "database": "",
            "dialect": ""
        }
    }
}

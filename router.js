const rp = require('request-promise');
// Utilities
const APP_CONSTANTS = require('./constants.js');
const utils = require('./utils.js');

const getServerIP = function() {
    return callAPI().then((response) => {
        return {
            host: response.hostname,
            ip: response.ip + ':' + response.port,
        };
    });
};

const getServerPlugins = function() {
    return callAPI().then((response) => {
        let pluginList = response.plugins.names;
        let formattedPluginList = utils.linkArrayWithFormatting(pluginList);
        return formattedPluginList;
    });
};

const getServerStatus = function() {
    return callAPI().then((response) => {
        return {
            online: response.online,
            players: `${response.players.online}/${response.players.max}`,
            version: response.version,
        };
    });
};

const getServerStatusBackup = function() {
    return callAPIBackup().then((response) => {
        return {
            online: response.online,
            playersMax: response.players.max,
            playersOn: response.players.now,
        }
    });
};

const getServerVersion = function() {
    return callAPI().then((response) => {
        return {
            version: response.version,
            software: response.software,
        };
    });
};

const getWhoIsOnline = function() {
    return callAPI().then((response) => {
        let players = response.players;
        let playerList = players.list;
        if (playerList !== undefined)
            playerList = utils.linkArrayWithFormatting(playerList);
        else
            playerList = "Nobody is Online \:cry:";

        return {
            numbers: `${players.online}/${players.max}`,
            players: playerList,
        };
    });
};

// Call the API to reuse in methods above
const apiOneOptions = {
    uri: APP_CONSTANTS.API_URL + APP_CONSTANTS.SERVER_URL,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
}

const callAPI = function() {
    return rp(apiOneOptions)
        .catch(function(err) {
            // API call failed...
            console.error(`[ERROR] ${err}`);
        });
};

const apiTwoOptions = {
    uri: APP_CONSTANTS.API_FALLBACK_URL + APP_CONSTANTS.SERVER_URL + '&port=' + APP_CONSTANTS.SERVER_PORT,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
}

const callAPIBackup = function() {
    return rp(apiTwoOptions)
        .catch(function(err) {
            // API call failed...
            console.error(`[ERROR] ${err}`);
        });
};

module.exports = {
    getServerIP,
    getServerPlugins,
    getServerStatus,
    getServerStatusBackup,
    getServerVersion,
    getWhoIsOnline,
};
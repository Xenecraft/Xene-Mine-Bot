const rp = require('request-promise');
// Utilities
const APP_CONSTANTS = require('./constants.js');
const utils = require('./utils.js');

const getServerIP = function() {
  return callAPI().then((response) => {
    // utils.logMessageToConsole(JSON.stringify(response));
    return {
      host: response.hostname,
      ip: response.ip + ':' + response.port,
    };
  }).catch(catchRouterError);;
};

const getServerPlugins = function() {
  return callAPI().then((response) => {
    // utils.logMessageToConsole(JSON.stringify(response));
    if (response.online) {
      let pluginList = response.plugins.names;
      let formattedPluginList = utils.linkArrayWithFormatting(pluginList);
      return formattedPluginList;
    } else {
      return `Server is Offline`;
    }
  }).catch(catchRouterError);;
};

const getServerPluginsVersions = function() {
  return callAPI().then((response) => {
    // utils.logMessageToConsole(JSON.stringify(response));
    if (response.online) {
      let pluginList = response.plugins.raw;
      let formattedPluginList = utils.linkArrayWithFormatting(pluginList);
      return formattedPluginList;
    } else {
      return `Server is Offline`;
    }

  }).catch(catchRouterError);;
};

const getServerStatus = function() {
  return callAPI().then((response) => {
    // utils.logMessageToConsole(JSON.stringify(response));
    if (response.online === true)
      return {
        online: response.online,
        players: `${response.players.online}/${response.players.max}`,
        version: response.version,
      };
    else {
      return {
        online: response.online,
      }
    }
  }).catch(catchRouterError);;
};

const getServerStatusBackup = function() {
  return callAPIBackup().then((response) => {
    // utils.logMessageToConsole(JSON.stringify(response));
    return {
      online: response.online,
      players: `${response.players.now}/${response.players.max}`,
      version: response.server.name,
    };
  }).catch(catchRouterError);;
};

const getServerVersion = function() {
  return callAPI().then((response) => {
    // utils.logMessageToConsole(JSON.stringify(response));
    return {
      version: response.version,
      software: response.software,
    };
  }).catch(catchRouterError);;
};

const getWhoIsOnline = function() {
  return callAPI().then((response) => {
    // utils.logMessageToConsole(JSON.stringify(response.players));
    let players = response.players;
    let playerList = {};
    const sadListMessage = "Nobody is Online \:cry:";

    // Server is Online
    if (response.online) {
      if (players.list !== undefined)
        playerList = utils.linkArrayWithFormatting(players.list);
      else
        playerList = sadListMessage;
      //Server is Offline
    } else {
      players.online = 0;
      players.max = 0;
      playerList = sadListMessage;
    }

    return {
      numbers: `${players.online}/${players.max}`,
      players: playerList,
    };
  }).catch(catchRouterError);;
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
    .catch(catchRouterError);
};

const apiTwoOptions = {
  uri: APP_CONSTANTS.API_FALLBACK_URL + APP_CONSTANTS.SERVER_URL,
  // Uncomment and use the line below for non-standard Minecraft Port Configurations!
  // uri: APP_CONSTANTS.API_FALLBACK_URL + APP_CONSTANTS.SERVER_URL + '&port=' + APP_CONSTANTS.SERVER_PORT,
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true // Automatically parses the JSON string in the response
}

const callAPIBackup = function() {
  return rp(apiTwoOptions)
    .catch(catchRouterError);
};

//Util for Router Methods
const catchRouterError = function(errorMessage) {
  utils.logErrorToConsole(`[ERROR] ${errorMessage}`);
}

module.exports = {
  getServerIP,
  getServerPlugins,
  getServerPluginsVersions,
  getServerStatus,
  getServerStatusBackup,
  getServerVersion,
  getWhoIsOnline,
};
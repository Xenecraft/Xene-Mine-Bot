const moment = require('moment');

const createFormattedHelpMessage = function(commandsObject) {
    let formattedMessage = ``;
    for (let property in commandsObject) {
        if (Object.prototype.hasOwnProperty.call(commandsObject, property)) {
            formattedMessage = formattedMessage + `⛏ \`${commandsObject[property].text}\` - ${commandsObject[property].description} \n`;
        }
    }
    return formattedMessage;
}

const determineServerStatusEmoji = function(serverBoolean) {
    if (serverBoolean)
        return `\:green_heart:`;
    else
        return `\:broken_heart:`;
};

const linkArrayWithFormatting = function(array) {
    let formattedMessage = ``;
    if (array.length === 1) {
        formattedMessage = `- ${array[0]}`;
    } else {
        for (let idx = 0; idx < array.length; idx++) {
            formattedMessage = formattedMessage + `- ${array[idx]} \n`;
        }
    }
    return formattedMessage;
}

const logMessageToConsole = function(message) {
    let timeNow = moment().format('YYYY.MM.DD - HH:mm:ss');
    console.log(`[${timeNow}] ${message}`);
}

module.exports = {
    createFormattedHelpMessage,
    determineServerStatusEmoji,
    linkArrayWithFormatting,
    logMessageToConsole,
}
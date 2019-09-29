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
        for (let idx = 0; idx < array.length - 1; idx++) {
            formattedMessage = formattedMessage + `- ${array[idx]} \n`;
        }
    }
    return formattedMessage;
}

module.exports = {
    determineServerStatusEmoji: determineServerStatusEmoji,
    linkArrayWithFormatting: linkArrayWithFormatting,
}
const Discord = require('discord.js');
const client = new Discord.Client();
const { RichEmbed } = require('discord.js');
// Mandatory File Settings
const settings = require('./app-settings.json');
const APP_CONSTANTS = require('./constants.js');
// Utilities
const commands = require('./commands.js');
const router = require('./router.js');
const utils = require('./utils.js');
const logMessageToConsole = utils.logMessageToConsole;

// Global Variable for Server Status
// Assume that Server is Online when Bot turns on.
let isServerOnline = true;
let guildMinecraftChannel = {};

client.on('ready', () => {
    logMessageToConsole(`Logging in as ${client.user.tag}...`);
    determineBotServerStatus();
    routinelyCheckServerStatus();
    guildMinecraftChannel = getMinecraftChannel();
    const startupMessage = `Connection restored. Monitoring the ${APP_CONSTANTS.SERVER_NAME} Server.`;
    guildMinecraftChannel.send(startupMessage).catch(catchErrorMessage);
});

client.on('message', message => {
    //Ignore Any Bot messaging if Tagged or not in the right Channel
    if (message.author.bot) return;
    if (message.channel.name !== settings.allowed_channel) return;

    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if (message.content.indexOf(settings.prefix) !== 0) return;

    //Process the Command text
    const args = message.content.slice(settings.prefix.length).trim();
    const command = args.toLowerCase();
    let commandLogMessage = `${message.author}: said '${command}'`;
    logMessageToConsole(commandLogMessage);

    //Ping Command
    if (command === commands.ping.text) {
        message.reply('Pong!');
    }

    //Server Status Command
    else if (command === commands.status.text) {
        router.getServerStatus().then((value) => {
            let msgDescription =
                `**Status:** ${utils.determineServerStatusEmoji(value.online)}
            **Version:** ${value.version}
            **Users Online:** ${value.players}`;

            createRichEmbedMessage(message, `Server Status`, msgDescription);
        }).catch(catchErrorMessage);
    }

    //Server URL
    else if (command === commands.address.text) {
        router.getServerIP().then((serverValue) => {
            let msgDescription =
                `Try connecting to either Server Addresses below when entering the Server Info:
                
            - ${serverValue.host}
            - ${serverValue.ip}`;

            createRichEmbedMessage(message, `Server IP`, msgDescription);
        }).catch(catchErrorMessage);
    }

    //Who is on Command
    else if (command === commands.whois.text) {
        router.getWhoIsOnline().then((players) => {
            let msgDescription =
                `**Online:** ${players.numbers}
            **List:**\n ${players.players}`;

            createRichEmbedMessage(message, `Users`, msgDescription);
            setBotStatus(`${players.numbers}`, undefined);
        }).catch(catchErrorMessage);
    }

    //What Version
    else if (command === commands.version.text) {
        router.getServerVersion().then((versionInfo) => {
            let msgDescription =
                `**Minecraft Version:** ${versionInfo.version}
            **Minecraft Type:** ${versionInfo.software}`;

            createRichEmbedMessage(message, `Version`, msgDescription);
        }).catch(catchErrorMessage);
    }

    //Bot Intro 
    else if (command === commands.intro.text) {
        let msgDescription = `
        Hi ${message.author}, I am a bot to help with administrating a Minecraft server! Try typing \`${settings.prefix}\` in combinations with other commands to see my other functionality! For example, typing \`${settings.prefix} help\` to see my list of commands.

        Please note that I am only allowed to run in the \`${settings.allowed_channel}\` channel so send your commands there!`;
        createRichEmbedMessage(message, `Intro`, msgDescription);
    }

    //Main Site
    else if (command === commands.site.text) {
        message.reply(`Go to ${APP_CONSTANTS.SITE_URL} to check more information!`);
    }

    //Plugins Used
    else if (command === commands.plugin.text) {
        router.getServerPlugins().then((pluginList) => {
            let msgDescription = `**Below are a list of plugins currently used on the server:**
            ${pluginList}`;
            createRichEmbedMessage(message, `Plugins`, msgDescription);
        }).catch(catchErrorMessage);
    }

    //Help Command
    else if (command === commands.help.text) {
        let msgDescription = `**Prefix your messages with \`${settings.prefix}\` and then add any one of the commands below:**\n
        ${utils.createFormattedHelpMessage(commands)}
        _i.e. xmb who is online_`;
        createRichEmbedMessage(message, 'Help Command List', msgDescription);
    }

    //Github Checker
    else if (command === commands.debug.text) {
        let msgDescription = `**Refer to the Github URL for additional information or any suggestions:** 
        ${APP_CONSTANTS.GITHUB_URL}`;
        createRichEmbedMessage(message, 'Additional Help', msgDescription);
    } 

    //An echo command to make the bot say stuff
    else if (command.includes(commands.echo.text)) {
        let echoMessage = command.replace(commands.echo.text, "").trim();
        guildMinecraftChannel.send(echoMessage)
            .catch(catchErrorMessage);
    } 

    //General catch-all for unrecognized Commands
    else {
        message.reply(`I'm not quite sure I understand that command, you may have made a typo or that command has not been created yet!`);
    }

    if (message.isMentioned(client.user))
        message.reply(`Hello there ${message.author}!` + command);
});

//Check routinely on Server Status based on Refresh Interval
const routinelyCheckServerStatus = function() {
    setInterval(() => {
        determineBotServerStatus();
        logMessageToConsole('Determining server status...')
    }, APP_CONSTANTS.REFRESH_INTERVAL);
};

//Other Reusable Functions Below:
const determineBotServerStatus = function() {
    router.getServerStatusBackup().then((serverInfo) => {
        const checkStatus = serverInfo.online;
        if (serverInfo.online) {
            setBotStatus(`${serverInfo.playersOn} / ${serverInfo.playersMax}`, undefined);
            if (isServerOnline !== checkStatus) {
                determineServerStatus(checkStatus);
                isServerOnline = true;
            }
        } else {
            setBotStatus(`Offline`, undefined);
            if (isServerOnline !== checkStatus) {
                determineServerStatus(checkStatus);
                isServerOnline = false;
            }
        }
    }).catch(catchErrorMessage);
};

const determineServerStatus = function(onlineStatusMessageToSend) {
    const channel = client.channels.get('name', settings.allowed_channel);
    let currentStatus = "";

    if (onlineStatusMessageToSend)
        currentStatus = `Online.`;
    else
        currentStatus = `Offline.`;

    let serverStatusMessage = `Server ${currentStatus} ${utils.determineServerStatusEmoji(value.online)}`;
    guildMinecraftChannel.send(serverStatusMessage).catch(catchErrorMessage);
};

const getMinecraftChannel = function() {
    return client.channels.get(settings.broadcast_channel_id);
};

const catchErrorMessage = function(errorMessage) {
    logMessageToConsole(`Server: ${guildMinecraftChannel.guild.name} | Error: ${errorMessage}`);
}

const setBotStatus = function(activityBase, activityType = `WATCHING`) {
    return client.user.setActivity(`Xenecraft: ${activityBase}`, { type: activityType });
};

const createRichEmbedMessage = function(msg, msgTitle, msgDescription) {
    const embed = new RichEmbed()
        // Set the title of the field
        .setTitle(`**${APP_CONSTANTS.SERVER_NAME} - ${msgTitle}**`)
        // Set the color of the embed
        .setColor(settings.bot_reponse_color)
        // Set the main content of the embed
        .setDescription(msgDescription);
    // Send the embed to the same channel as the message
    //try and see if can await
    setTimeout(() => { msg.channel.send(embed) }, 250);
};

//Gotta have this at the very end.
client.login(settings.bot_token);
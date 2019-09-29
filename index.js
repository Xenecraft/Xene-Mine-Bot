const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
// Mandatory File Settings
const settings = require('./app-settings.json');
const APP_CONSTANTS = require('./constants.js');
// Utilities
const commands = require('./commands.js');
const router = require('./router.js');
const utils = require('./utils.js');

client.on('ready', () => {
    console.log(`Logging in as ${client.user.tag}...`);
    setBotServerStatus();
});

client.on('message', message => {
    //Ignore Any Bot messaging if Tagged or not in the right Channel
    if (message.author.bot) return;
    if (message.channel.name !== settings.allowed_channel) return;

    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    // console.log(message.isMentioned(client.user));
    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim();
    const command = args.toLowerCase();

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
        });
    }

    //Server URL
    else if (command === commands.address.text) {
        router.getServerIP().then((serverValue) => {
            let msgDescription =
                `Try connecting to either address below:
            - ${serverValue.host}
            - ${serverValue.ip}`;

            createRichEmbedMessage(message, `Server IP`, msgDescription);
        });
    }

    //Who is on Command
    else if (command === commands.whois.text) {
        router.getWhoIsOnline().then((players) => {
            let msgDescription =
                `**Online:** ${players.numbers}
            **List:**\n ${players.players}`;

            createRichEmbedMessage(message, `Users`, msgDescription);
        });
    }

    //What Version
    else if (command === commands.version.text) {
        router.getServerVersion().then((versionInfo)=>{
            let msgDescription =
                `**Minecraft Version:** ${versionInfo.version}
            **Minecraft Type:** ${versionInfo.software}`;

            createRichEmbedMessage(message, `Version`, msgDescription);
        });
    }

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
        router.getServerPlugins().then((pluginList)=>{
            let msgDescription = `**Below are a list of plugins currently used on the server:**
            ${pluginList}`;
            createRichEmbedMessage(message, `Plugins`, msgDescription);
        });
    }

    //Help Command
    else if (command === commands.help.text) {
        createRichEmbedMessage(message, 'Help Command List', utils.createFormattedHelpMessage(commands));
    } 

    else if (command === commands.debug.text) {
        let msgDescription = `**Refer to the Github URL for additional information or any suggestions:** 
        ${APP_CONSTANTS.GITHUB_URL}`;
        createRichEmbedMessage(message, 'Additional Help', msgDescription);
    } 

    else {
        message.reply(`I'm not quite sure I understand that command, you may have made a typo or that command has not been created yet!`);
    }

    if (message.isMentioned(client.user))
        message.reply(`Hello there ${message.author}!` + command);
});

setInterval(()=>{
    setBotServerStatus();
    console.log('checking server status...')
}, APP_CONSTANTS.REFRESH_INTERVAL);

//Other Reusable Functions here
function setBotServerStatus() {
    router.getServerStatusBackup().then((serverInfo) => {
        if (serverInfo.online)
            client.user.setActivity(`Xenecraft: ${serverInfo.playersOn} / ${serverInfo.playersMax}`, { type: 'WATCHING' });
        else
            client.user.setActivity(`Xenecraft: Offline`, { type: 'WATCHING' });
    });
}

function createRichEmbedMessage(msg, msgTitle, msgDescription) {
    const embed = new RichEmbed()
        // Set the title of the field
        .setTitle(`**${APP_CONSTANTS.SERVER_NAME} - ${msgTitle}**`)
        // Set the color of the embed
        .setColor(settings.bot_reponse_color)
        // Set the main content of the embed
        .setDescription(msgDescription);
    // Send the embed to the same channel as the message
    setTimeout(() => { msg.channel.send(embed) }, 250);
}

//Gotta have this at the very end.
client.login(settings.bot_token);
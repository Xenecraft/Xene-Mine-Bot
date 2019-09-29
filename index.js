const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const settings = require('./app-settings.json');

client.on('ready', () => {
    console.log(`Logging in as ${client.user.tag}...`);
    //TODO: Create setInterval to Monitor Server Status
    client.user.setActivity('the Xenecraft Server', { type: 'WATCHING' });
});

client.on('message', message => {
    //Ignore Any Bot messaging if Tagged
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    // console.log(message.isMentioned(client.user));
    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // let command = message.content.toLowerCase();
    // command = command.replace(client.user, '');

    if (command === 'ping') {
        message.reply('Pong!');
    }

    //Server Status
    else if (command === 'server status') {

    }

    //How Many People On

    //Who is On

    //Main Site

    //Help Command
    else if (command === 'help') {
    	createRichEmbedMessage(message, 'Help Command List', 'blah blah \n blah blah\n blah blah');
    } else if (command === 'debug') {
		createRichEmbedMessage(message, 'Additional Help', 'Refer to Github URL here');
    }

    if (message.isMentioned(client.user))
        message.reply(`Hello there ${message.author}!` + command);
    console.log(command);
});

//TODO: setInterval that will notify if item server is down

function createRichEmbedMessage(msg, msgTitle, msgDescription) {
    const embed = new RichEmbed()
    // Set the title of the field
    .setTitle(msgTitle)
    // Set the color of the embed
    .setColor(0x2a7ae2)
    // Set the main content of the embed
    .setDescription(msgDescription);
    // Send the embed to the same channel as the message
    setTimeout(() => { msg.channel.send(embed) }, 1000);
}

//Gotta have this at the very end.
client.login(settings.bot_token);
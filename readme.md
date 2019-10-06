# Xene-Mine-bot - A Discord-Minecraft Bot
An easy interface to check on a Minecraft Server. Currently used for server status and get other miscellaneous information related to the server. Uses two APIs in existing combination so that they are not spammed too hard.

## Available Commands
Refer to the `commands.js` file for more indept descriptions!
- `address`
- `debug`
- `help`
- `intro`
- `ping`
- `plugins`
- `main site`
- `status`
- `version`
- `users`

### Version Changelog  
#### 1.1.0 - 10/4/19 
- Touching up various commands
- Readme updated for bot setup at bottom
- Changed `who is online` into `users`
- Changed `server status` into `status`
- Line breaks being stupid between Unix and Windows.

#### 1.0.0 - 9/29/19 
- Lots of commands to use now!
- Decent readme
- Routine cronjob check for the server status in Bot Status

#### 0.2.0 - 9/29/19 
- Formatting of stuff
- More helpful commands in place
- get server status
- get who is online
- Create API Wrapper
- Create API Backup values

#### 0.1.0 - 9/28/19  
- Created the bot! Yay!
- xb command isolation with `app-settings.json` file

### ToDos For Later:
- allow multiple channels for messaging bot
- notify if the server is offline
- proper error handling for if the API is offline
- more documentation for help command and a description for values
- set a user timeout to prevent message spamming
- use online number to update count if there are people and command is used
- write tests for once

### How to use the Bot for Yourself
[Directions here.]
- Create an app-settings.json
	```json
	{
		"allowed_channel": "xenecraft-⛏",
		"bot_reponse_color": "<yourColorHere>",
		"bot_token": "<yourDiscordToken>",
		"prefix": "<yourPrefixHere>"
	}
	```
- Create a constants.js file
	```json
	const APP_CONSTANTS = {
		API_URL: `https://api.mcsrvstat.us/2/`,
		API_FALLBACK_URL: `https://mcapi.us/server/status?ip=`,
		GITHUB_URL: `https://github.com/Xenecraft/Xene-Mine-Bot`,
		REFRESH_INTERVAL: 600000, //10 minutes
		SERVER_NAME: `Xenecraft`,
		SERVER_PORT: `25985`,
		SERVER_URL: `play.xenecraft.com`,
		SITE_URL: `http://xenecraft.com`,
	};
	module.exports = APP_CONSTANTS;
	```
- `npm run index.js` or `nodemon index`

### Credits:
- [Anders](https://twitter.com/spirit55555dk) the creator of mcsrvstat.us
- [Syfarp](https://twitter.com/Syfaro) for creating MCApi.us
- Discord people
- People at Writebots for giving a relatively straightforward way to host a Bot in [this article](https://www.writebots.com/discord-bot-hosting/)
- This [Gist](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3) for some simple best practices!
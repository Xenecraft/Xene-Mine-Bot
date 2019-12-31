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
- `plugins-versions`
- `main site`
- `status`
- `version`
- `users`

### Version Changelog  
#### 1.5.1/1.5.2 - 12/28/19 
- Whoopsied on the `plugins-versions` command not pulling version number
- Bullet point on readme, lol

#### 1.5.0 - 12/28/19 
- More refactoring of online/offline messages for bot.
- Check with both APIs for Offline/Online Server status so no false positives in Discord messages.
- Unify User Online/Number check on router methods (to output the same expected object keys)
- Slightly better error handling for some areas
- I should really write some tests so I can pull some offline/online toggling without hitting the APIs.

#### 1.3.1 - 12/19/19 
- Refactored online/offline messages for bot.

#### 1.3.0 - 10/9/19 
- Error handling for if an API call may mess up

#### 1.2.0 - 10/9/19 
- Notify if the server is offline to your channel of choice, need to get the Channel Id from your Discord server

#### 1.1.0 - 10/4/19 
- Touching up various commands
- Readme updated for bot setup at bottom
- Changed `who is online` into `users`
- Changed `server status` into `status`
- Line breaks being stupid between Unix and Windows.
- Use `users` command to update User count of server users to Bot status
- More documentation for help command and a description for values

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
- ~~allow multiple channels for messaging bot~~
- set a user timeout to prevent message spamming
- write tests for once

### How to use the Bot for Yourself
[Directions here.]
- Create an app-settings.json
	```json
	{
		"allowed_channel": "xenecraft-⛏",
		"bot_reponse_color": "<yourColorHere>",
		"bot_token": "<yourDiscordToken>",
		"broadcast_channel_id": "<channelYouWantOnlineOfflineMessagesToBeSentTo>",
		"prefix": "<yourPrefixHere>"
	}
	```
- Create a constants.js file
	```json
	const APP_CONSTANTS = {
		API_URL: `https://api.mcsrvstat.us/2/`,
		API_FALLBACK_URL: `https://mcapi.us/server/status?ip=`,
		GITHUB_URL: `https://github.com/Xenecraft/Xene-Mine-Bot`,
		REFRESH_INTERVAL: 600000, //10 minutes, be careful as you don't want to get blocked for spamming the API
		SERVER_NAME: `Xenecraft`,
		SERVER_PORT: `25565`, //You may not need to use this if you have a standard MC port like 25565
		SERVER_URL: `play.xenecraft.com`,
		SITE_URL: `http://xenecraft.com`,
	};
	module.exports = APP_CONSTANTS;
	```
- `npm run index.js` or `nodemon index` locally or in your instance

### Credits:
- [Anders](https://twitter.com/spirit55555dk) the creator of mcsrvstat.us
- [Syfao](https://twitter.com/Syfaro) for creating MCApi.us
- Discord people and their nice API
- People at Writebots for giving a relatively straightforward way to host a Bot in [this article](https://www.writebots.com/discord-bot-hosting/)
- This [Gist](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3) for some simple best practices!
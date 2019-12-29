const APP_COMMANDS = {
  //TODO: Something with the type name to more smartly give a response.
  address: {
    text: `address`,
    type: `embed`,
    description: `gives the Minecraft Server Address to connect in the client`,
  },
  debug: {
    text: `debug`,
    type: `embed`,
    description: `gives a link to the source code of Xene-Mine-Bot`,
  },
  echo: {
    text: `echo`,
    type: `reply`,
    description: `megaphones a command throughout multiple servers, potentially dangerous`,
  },
  help: {
    text: `help`,
    type: `embed`,
    description: `what you just used!`,
  },
  intro: {
    text: `intro`,
    type: `embed`,
    description: `gives a description of what the bot does`,
  },
  ping: {
    text: `ping`,
    type: `reply`,
    description: `a test command`,
  },
  plugin: {
    text: `plugins`,
    type: `reply`,
    description: `lists all currently used plugins in a pretty manner`,
  },
  plugver: {
    text: `plugins-versions`,
    type: `reply`,
    description: `lists all currently used plugins with their versions`,
  },
  site: {
    text: `main site`,
    type: `embed`,
    description: `gives you the main URL`,
  },
  status: {
    text: `status`,
    type: `embed`,
    description: `gives a General Server status`,
  },
  version: {
    text: `version`,
    type: `embed`,
    description: `gives the version of Minecraft used`,
  },
  whois: {
    text: `users`,
    type: `embed`,
    description: `gives a list of who is online`,
  }
};

module.exports = APP_COMMANDS;
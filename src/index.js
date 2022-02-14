// Loading env variables from .env file
require('dotenv').config();

// Creating discord client
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: ['GUILD_MESSAGES', 'GUILDS'],
});

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

// Loading commands
const startConversation = require('./start');
const stopConversation = require('./stop');

client.on('interactionCreate', (interaction) => {
  if (interaction.isCommand())
    switch (interaction.commandName) {
      case 'start':
        startConversation(interaction);
        break;
      case 'stop':
        stopConversation(interaction);
        break;
      default:
        console.warn('Unknown command');
        break;
    }
});

const onMessage = require('./message');

client.on('messageCreate', onMessage);

// Login to Discord
client.login(process.env.DISCORD_TOKEN);

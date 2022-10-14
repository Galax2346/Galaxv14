const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({ intents });
const loadCommand = require('./Loaders/loadCommands');
const loadEvents = require('./Loaders/loadEvents');
const loadDatabase = require('./Loaders/loadDatabase');
const Config = require('./config');

bot.commands = new Discord.Collection();

bot.login(Config.token);
bot.function = {
    createId: require("./Functions/createId"),
    calculXp: require("./Functions/calculXp")
}

loadCommand(bot);
loadEvents(bot);
loadDatabase()
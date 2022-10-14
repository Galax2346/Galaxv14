const loadSlashCommand = require('../Loaders/loadSlashCommands');
const { ActivityType } = require("discord.js");
const loadDatabase = require('../Loaders/loadDatabase');


module.exports = async(bot, client) => {
    loadSlashCommand(bot);
    console.log(`${bot.user.tag} est en ligne.`);
    bot.user.setPresence({
        activities: [{ name: `${client.users.cache.size} membres`, type: ActivityType.Watching }],
    })

    bot.db = await loadDatabase();
    bot.db.connect(function() {
        console.log("Base de données connectée !");
    });

}
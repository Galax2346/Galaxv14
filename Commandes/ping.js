const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "affiche la latence",
    permission: Discord.PermissionFlagsBits.SendMessages,
    permission: "Aucune",
    dm: true,

    async run(bot, message) {

        await message.reply(`Ping : \`${bot.ws.ping}\``)
    }
}
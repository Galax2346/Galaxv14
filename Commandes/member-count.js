const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")

module.exports = {

    name: "member-count",
    description: "Afficher le nombre total de membre",
    permission: Discord.PermissionFlagsBits.SendMessages,
    permission: "Aucune",
    dm: false,

    async run(bot, message, args) {

        const EmbedMemberCount = new EmbedBuilder()
            .addFields({ name: "Membres totaux :", value: `👥 ${message.guild.memberCount}`, inline: false })
            .addFields({ name: "Bot :", value: `🤖 ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline: true })

        await message.reply({ embeds: [EmbedMemberCount] })
    }
}
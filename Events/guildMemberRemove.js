const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")

module.exports = (client, member) => {

    const EmbedMessage = new EmbedBuilder()
        .setTitle(`Galax_studio `)
        .setColor('#0C15CF')
        .setDescription(`Le membre <@${member.user.id}> viens de nous quitter.`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

    client.channels.cache.get('1016394314680631346').send({ embeds: [EmbedMessage] })
}
const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js")

module.exports = {

    name: "ticket",
    description: "Envoyer l'embed des tickets",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Administration",

    async run(bot, message, args) {
        const EmbedTicket = new EmbedBuilder()
            .setColor("#ff00fb")
            .setDescription(`✅ L'embed des tickets à été envoyer avec succès !`)

        const EmbedTicket1 = new EmbedBuilder()
            .setColor("#ff00fb")
            .setTitle(` créer un ticket :   `)
            .setDescription(`Pour **Ouvrir** un **Ticket** Séléctionnez la **catégorie** qui vous convient`)
            .setImage('https://share.creavite.co/0kcUeXNa4tuL7TDa.gif')
            .setTimestamp()
            .setFooter({ text: `${bot.user.username} |Equipe de support WeSee`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) });

        const RowTicket = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId('menuticket')
                .setPlaceholder('✅ |ICI  !')
                .addOptions({
                    label: `Questions`,
                    description: `Poser une question de tout type`,
                    emoji: `❓`,
                    value: `Questions`,
                }, {
                    label: `Plainte`,
                    description: `Faire une plainte envers un staff ou un membre du Discord`,
                    emoji: `🖋`,
                    value: `Plainte`,
                }, {
                    label: `Bug`,
                    description: `Signaler un bug`,
                    emoji: `⚠`,
                    value: `Bug`,
                }, ),
            );

        await message.reply({ embeds: [EmbedTicket], ephemeral: true })
        await message.channel.send({ embeds: [EmbedTicket1], components: [RowTicket] })
    }
}
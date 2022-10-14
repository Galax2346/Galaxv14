const Discord = require('discord.js')
const discord_giveaway = require("discord-giveaway-easy")

module.exports = {
    name: "giveaway",
    description: "Lance un giveaway",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: true,
    category: "Concours",
    options: [{
            type: "string",
            name: "titre",
            description: "Le titre du giveaway",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "time",
            description: "Le temps du giveaway",
            required: true,
            autocomplete: false,
        },
        {
            type: "number",
            name: "winner_number",
            description: "Le nombre de winners du giveaway",
            required: true,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {

        let title = args.getString("titre")
        let time = args.getString("time")
        let winnerNumber = args.getNumber("winner_number")

        const giveaway = new discord_giveaway.Giveaway()
            .setLanguage("fr")
            .setTitle(title)
            .setButtonType(Discord.ButtonStyle.Primary)
            .setButtonEmoji("🎉")
            .setEmbedColor("#ffffff")
            .setFooter(`Crée par ${message.user.username}`)
            .setTime(time)
            .setBot(bot)
            .setInteraction(message)
            .setWinnerNumber(winnerNumber)
            .CreateGiveaway()


        let Embed = giveaway.getEmbed();
        let Button = giveaway.getButton();

        await message.reply({ embeds: [Embed], components: [Button] })
    }


}
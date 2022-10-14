const Discord = require('discord.js')
const { EmbedBuilder } = require("discord.js")
const { color } = require('../config')


module.exports = {

    name: "embed",
    description: "Afficher le nombre total de membre",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    options: [{
            type: "string",
            name: "title",
            description: "Le message a envoyer.",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "text",
            description: "Le message a envoyer.",
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args) {
        let title = args.getString("title");
        let msg = args.getString("text");


        const EmbedMessage = new EmbedBuilder()
            .setColor(color)
            .setTitle(`${title}`)
            .setDescription(`${msg}`)



        await message.channel.send({ embeds: [EmbedMessage] });
        await message.reply({ content: "l'embed a ete envoyer avec succes !", ephemeral: true });
    }
}
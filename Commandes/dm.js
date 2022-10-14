const Discord = require("discord.js");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "dm",
    description: "💻・DM un membre ",
    permission: Discord.PermissionFlagsBits.Administrator,
    category: "Moderation",
    dm: true,
    options: [{
            type: "user",
            name: "member",
            description: "Quel membre voulez-vous que je dm ?",
            required: true
        },
        {
            type: "String",
            name: "texte",
            description: "Que veux-tu que je lui dise ?",
            required: true

        }
    ],

    async run(bot, interaction, args, ) {
        let user = await interaction.options.getUser("member");
        if (!user) return interaction.reply("Pas de membre !")

        let reason = interaction.options.getString("texte")
        if (!reason) return interaction.reply("Pas de raison fournise.")


        try { await user.send(`${reason}`) } catch (err) {}
        interaction.reply({ content: `J'ai bien envoyer \`${reason}\` à \_\_${user}\_\_ !`, ephemeral: true });

    }
}
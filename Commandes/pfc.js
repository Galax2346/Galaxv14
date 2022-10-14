const Discord = require("discord.js")

module.exports = {

    name: 'pfc',
    description: 'Jeux pierre, feuille, ciseaux',
    permission: Discord.PermissionFlagsBits.SendMessages,
    permission: "Aucune",
    dm: false,
    category: "Fun",


    async run(bot, message, args) {

        let joueurs1 = ["pierre", "feuille", "ciseaux"]

        let joueurs1radom = Math.floor(Math.random() * joueurs1.length);
        let joueurs1Random = joueurs1[joueurs1radom];

        let joueurs2 = ["pierre", "feuille", "ciseaux"]

        let joueurs2radom = Math.floor(Math.random() * joueurs2.length);
        let joueurs2Random = joueurs2[joueurs2radom];

        let Embed = new Discord.EmbedBuilder()
            .setTitle(`**Pierre, feuille, ciseaux**`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setColor("Green")
            .addFields({
                name: "**Le jouers 1**",
                value: `Le jouers 1 a obtenue \`${joueurs1Random}\``
            }, {
                name: "**Le jouers 2**",
                value: `Le jouers 1 a obtenue \`${joueurs2Random}\``
            })
            .setTimestamp()



        await message.channel.send({ embeds: [Embed] })
        message.reply({ content: ':white_check_mark: **Embed envoyé avec succès ! **:white_check_mark:', ephemeral: true })
    }
}
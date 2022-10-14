const {
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    PermissionFlagsBits
} = require('discord.js')
const config = require('../config')

module.exports = {

    name: "verify",
    description: "Setup verification system",
    permission: PermissionFlagsBits.Administrator,
    category: "Administration",
    usage: "/createverify [channel] [role]",
    dm: false,
    options: [{
        type: "channel",
        name: "channel",
        description: "The channel you want to be the verification channel !",
        required: true,
        autocomplete: false,
    }, {
        type: 'role',
        name: "role",
        description: "The role you want to add to the user who verified !",
        required: true,
        autocomplete: false,
    }, ],

    async run(bot, message, args, interaction) {

        let channel = args.getChannel('channel')
        if (!channel) return message.reply({ content: ':x: | **Channel not found or does not exist !**', ephemeral: true })
        let role = args.getRole('role')
        if (!role) return message.reply({ content: `:x: | **I cant find the role !**`, ephemeral: true })

        try {
            let VerifEmbed = new EmbedBuilder()
                .setTitle('<:rgle:1023987991775031390> Charte du serveur')
                .setDescription(`**Bienvenue **à tous dans Galax_studio 

                Afin de garder le discord propre et d’éviter les mésententes, en rejoignant notre communauté, vous vous **engagez **à suivre certaines règles pour garder une bonne entente entre les membres de cette dernière
            
                - Tu devras **respecter** les autres membres de ce serveur, peu importe la situation. 
                - Toutes pubs sont **interdites **à moins d’en avoir reçu l’autorisation.
                - Il est **interdit **de tenir des propos ou de poster des images pornographiques (caractère sexuel), racistes, xénophobes, obscènes, homophobe, etc... 
                - Il est **important** d’utiliser le canal approprié pour vos discussions.
                - Pas de flood ou de flame, si vous avez des problèmes à régler entre vous, les messages privés sont là pour ça.
                - Pas de SPOIL sur les séries, mangas, films ou autres. En cas de non respect des règlements les messages en question seront supprimés et un avertissement sera transmis au fautif. En fonction de la gravité de l’infraction un **ban définitif** pourrait être appliqué sans avertissement.
                Les **MODOS** sont là pour faire respecter le règlement et **j'ai toute confiance en leur décision.**
                
                :question:** En cas de problème,** nous vous invitons à nous contacter. 
                
                :warning: **IMPORTANT** => Si vous avez souscrit à un abonnement Twitch et que vous souhaitez obtenir le rôle TwitchSub, n’oubliez pas de **lier votre compte DISCORD** à votre compte **TWITCH. **Ceci vous permettra d’obtenir les belles emotes de Galax_studio  Paramètres utilisateur >> Connexions >> Cliquer sur le logo Twitch puis effectuer la liaison. **Cette opération n’est pas immédiate, alors pas de panique, soyez patient !**`)
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter({ text: `${bot.user.username} | Bienvenue sur le serveur`, iconURL: bot.user.displayAvatarURL() })
                .setColor(config.color)

            let sendChannel = channel.send({
                embeds: [VerifEmbed],
                components: [new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId(`verify_${role.id}`)
                        .setLabel('Accepter')
                        .setEmoji('✅')
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false)
                    )
                ]
            })

            if (!sendChannel) return message.reply({ content: `:x: | **Une erreur s'est produite... Réessayez plus tard !**`, ephemeral: true })
            else return message.reply({ content: `Le système de verification à était envoyer dans ${channel}`, ephemeral: true })
        } catch (err) {
            message.reply({ content: ":x: | **Je ne peux pas ajouter ce rôle !**" })
        }
    }
}
const { SlashCommandBuilder } = require('discord.js')
const { DisTube } = require('distube')
const { SoundCloudPlugin } = require('@distube/soundcloud')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('authsoundcloud')
        .setDescription('Authorize bot with soundcloud API')
        .addStringOption((option) =>
            option
                .setName('clientid')
                .setDescription('Use your soundcloud client id')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('oauthtoken')
                .setDescription('Use your soundcloud ouath token')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            interaction.client.distube = new DisTube(interaction.client, {
                leaveOnStop: false,
                emitNewSongOnly: true,
                emitAddSongWhenCreatingQueue: false,
                emitAddListWhenCreatingQueue: false,
                plugins: [
                    new SoundCloudPlugin({
                        clientId: interaction.options.getString('clientid'),
                        oauthToken: interaction.options.getString('oauthtoken'),
                    }),
                ],
            })
            await interaction.reply({
                content: `${interaction.client.emotes.success} | Authenticated with SoundCloud!`,
                ephemeral: true,
            })
        } catch (e) {
            await interaction.reply({
                content: `${interaction.client.emotes.error} | ${e}`,
                ephemeral: true,
            })
        }
    },
}

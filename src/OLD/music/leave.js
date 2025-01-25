const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Tell bot to leave current voice channel'),
    async execute(interaction) {
        try {
            let guildID = interaction.guildId
            await interaction.client.distube.voices.leave(guildID)
            await interaction.reply({
                content: 'Leaving voice channel!',
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

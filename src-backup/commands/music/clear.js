const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription(
            'Tell bot to clear queue. The current song will continue playing'
        ),
    async execute(interaction) {
        try {
            let queue = interaction.client.distube.getQueue(interaction.guild)
            if (!queue)
                await interaction.reply({
                    content: `${interaction.client.emotes.error} | There is nothing in the queue right now!`,
                    ephemeral: true,
                })
            else {
                await queue.remove()
                await interaction.reply({
                    content: `${interaction.client.emotes.success} | Queue cleared!`,
                    ephemeral: true,
                })
            }
        } catch (e) {
            await interaction.reply({
                content: `${interaction.client.emotes.error} | ${e}`,
                ephemeral: true,
            })
        }
    },
}

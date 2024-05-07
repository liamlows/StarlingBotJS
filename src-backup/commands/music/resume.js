const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Tell bot to resume playing'),
    async execute(interaction) {
        try {
            let queue = interaction.client.distube.getQueue(interaction.guild)
            if (!queue)
                await interaction.reply({
                    content: `${interaction.client.emotes.error} | There is nothing in the queue right now!`,
                    ephemeral: true,
                })
            else {
                await queue.resume()
                await interaction.reply({
                    content: `${interaction.client.emotes.success} | Paused!`,
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

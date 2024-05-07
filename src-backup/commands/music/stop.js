const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Tell bot to stop playing the current song'),
    async execute(interaction) {
        try {
            let queue = interaction.client.distube.getQueue(interaction.guild)
            if (!queue)
                await interaction.reply({
                    content: `${interaction.client.emotes.error} | There is nothing in the queue right now!`,
                    ephemeral: true,
                })
            else {
                await queue.stop()
                await interaction.reply({
                    content: `${interaction.client.emotes.success} | Song stopped!`,
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

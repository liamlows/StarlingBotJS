const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Tell bot to skip the current song in the playlist')
        .addStringOption((option) =>
            option
                .setName('index')
                .setDescription('The number of songs to skip')
        ),
    async execute(interaction) {
        try {
            let queue = interaction.client.distube.getQueue(interaction.guild)
            let index = Number(interaction.options.getString('index'))
            if (!queue)
                await interaction.reply({
                    content: `${client.emotes.error} | There is nothing in the queue right now!`,
                    ephemeral: true,
                })
            else {
                if (index) {
                    if (isNaN(index))
                        await interaction.reply({
                            content: `${client.emotes.error} | Please enter a valid number!`,
                            ephemeral: true,
                        })
                    else {
                        const song = await queue.jump(index)
                        await interaction.reply({
                            content: `${interaction.client.emotes.success} | Skipped to: ${song.name}`,
                            ephemeral: true,
                        })
                    }
                } else {
                    const song = await queue.skip()
                    await interaction.reply({
                        content: `${interaction.client.emotes.success} | Skipped! Now playing:\n${song.name}`,
                        ephemeral: true,
                    })
                }
            }
        } catch (e) {
            await interaction.reply({
                content: `${interaction.client.emotes.error} | ${e}`,
                ephemeral: true,
            })
        }
    },
}

import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import DisTube from 'distube'

import emotes from '../../emotes.json'

export const data = new SlashCommandBuilder()
  .setName('leave')
  .setDescription('Tell bot to leave current voice channel')

export const execute = async (
  interaction: ChatInputCommandInteraction,
  distube: DisTube
) => {
  try {
    const { guildId } = interaction
    if (guildId === null) {
      await interaction.reply({
        content: `${emotes.error} | Missing guild id!`,
        ephemeral: true,
      })
    } else {
      distube.voices.leave(guildId)
      await interaction.reply({
        content: 'Leaving voice channel!',
        ephemeral: true,
      })
    }
  } catch (e) {
    await interaction.reply({
      content: `${emotes.error} | ${e}`,
      ephemeral: true,
    })
  }
}

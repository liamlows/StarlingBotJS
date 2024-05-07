import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import DisTube from 'distube'

import emotes from '../../emotes.json'

export const data = new SlashCommandBuilder()
  .setName('shuffle')
  .setDescription('Tell bot to shuffle the queue')

export const execute = async (
  interaction: ChatInputCommandInteraction,
  distube: DisTube,
) => {
  try {
    const { guildId } = interaction
    if (guildId === null) {
      await interaction.reply({
        content: `${emotes.error} | Missing guild id!`,
        ephemeral: true,
      })
    } else {
      const queue = distube.getQueue(guildId)
      if (!queue)
        await interaction.reply({
          content: `${emotes.error} | There is nothing in the queue right now!`,
          ephemeral: true,
        })
      else {
        await queue.shuffle()
        await interaction.reply({
          content: `${emotes.success} | Queue shuffled!`,
          ephemeral: true,
        })
      }
    }
  } catch (e) {
    await interaction.reply({
      content: `${emotes.error} | ${e}`,
      ephemeral: true,
    })
  }
}

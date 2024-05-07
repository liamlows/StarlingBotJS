import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import DisTube from 'distube'

import emotes from '../../emotes.json'

export const data = new SlashCommandBuilder()
  .setName('join')
  .setDescription('Tell bot to join current voice channel')

export const execute = async (
  interaction: ChatInputCommandInteraction,
  distube: DisTube
) => {
  try {
    if (interaction.inCachedGuild()) {
      const voiceChannel = interaction.member.voice.channel
      if (!voiceChannel) {
        await interaction.reply({
          content: 'You must be in a voice channel',
          ephemeral: true,
        })
      } else {
        await distube.voices.join(voiceChannel)
        await interaction.reply({
          content: 'Joining voice channel!',
          ephemeral: true,
        })
      }
    } else {
      await interaction.reply({
        content: 'This command can only be used in a guild',
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

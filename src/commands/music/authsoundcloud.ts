import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js'
import DisTube from 'distube'

import emotes from '../../emotes.json'
import SoundCloudPlugin from '@distube/soundcloud'

export const data = new SlashCommandBuilder()
  .setName('authsoundcloud')
  .setDescription('Authorize bot with soundcloud API')
  .addStringOption((option) =>
    option
      .setName('clientid')
      .setDescription('Use your soundcloud client id')
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName('oauthtoken')
      .setDescription('Use your soundcloud ouath token')
      .setRequired(true),
  )

export const execute = async (
  interaction: ChatInputCommandInteraction<CacheType>,
  distube: DisTube,
) => {
  try {
    // eslint-disable-next-line unused-imports/no-unused-vars
    distube = new DisTube(interaction.client, {
      leaveOnStop: false,
      emitNewSongOnly: true,
      emitAddSongWhenCreatingQueue: false,
      emitAddListWhenCreatingQueue: false,
      plugins: [
        new SoundCloudPlugin({
          clientId: interaction.options.getString('clientid') ?? undefined,
          oauthToken: interaction.options.getString('oauthtoken') ?? undefined,
        }),
      ],
    })
    await interaction.reply({
      content: `${emotes.success} | Authenticated with SoundCloud!`,
      ephemeral: true,
    })
  } catch (e) {
    await interaction.reply({
      content: `${emotes.error} | ${e}`,
      ephemeral: true,
    })
  }
}

import { Client, Events, GatewayIntentBits } from 'discord.js'

import { commands } from './commands'
import { deployCommands } from './deployCommands'
import { DisTube, type Queue } from 'distube'
import { SoundCloudPlugin } from '@distube/soundcloud'
import emotes from './emotes.json'

// eslint-disable-next-line prefer-const
let distube: DisTube

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
})

client.once(Events.ClientReady, () => {
  console.log('Discord bot is ready! 🤖')
})

client.on(Events.GuildAvailable, async (guild) => {
  if (process.argv[2] === '--reloadCommands') {
    console.log('Reloading commands...')
    await deployCommands({ guildId: guild.id })
  }
})

client.on(Events.GuildCreate, async (guild) => {
  await deployCommands({ guildId: guild.id })
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const { commandName } = interaction

  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction, distube)
  }
})

// Create Distube client
distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [new SoundCloudPlugin()],
})

// generic distube status message
const status = (queue: Queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filters.names.join(', ') || 'Off'
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? 'All Queue'
        : 'This Song'
      : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

// Distube state change status notification handler
distube
  .on('playSong', (queue, song) =>
    queue.textChannel?.send(
      `${emotes.play} | Playing \`${song.name}\` - \`${
        song.formattedDuration
      }\`\n${status(queue)}`,
    ),
  )
  .on('addSong', (queue, song) =>
    queue.textChannel?.send(
      `${emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
    ),
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel?.send(
      `${emotes.success} | Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`,
    ),
  )
  .on('empty', (queue) =>
    queue.textChannel?.send('Voice channel is empty! Leaving the channel...'),
  )
  .on('error', (channel, e) => {
    if (channel)
      channel.send(
        `${emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`,
      )
    else console.error(e)
  })
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${emotes.error} | No result found for \`${query}\`!`),
  )
  .on('finish', (queue) => queue.textChannel?.send('Finished!'))

export { client, distube }

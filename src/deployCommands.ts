import { REST, Routes } from 'discord.js'

import { config } from './config'
import { commands } from './commands'

const commandData = Object.values(commands).map((command) => command.data)

const rest = new REST().setToken(config.DISCORD_TOKEN)

type DeployCommandsProps = {
  guildId: string
}

export async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    console.log(
      `Started refreshing ${
        Object.values(commands).length
      } application (/) commands.`
    )

    const data = await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      { body: commandData }
    )

    console.log(
      `Successfully reloaded ${
        (data as Array<unknown>).length
      } application (/) commands.`
    )
  } catch (error) {
    console.error(error)
  }
}

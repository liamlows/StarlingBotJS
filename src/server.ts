import { client } from './discordClient'
import { config } from './config'

client.login(config.DISCORD_TOKEN)

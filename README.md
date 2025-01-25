# StarlingBotJS

A very simple easy to understand and modify music bot for discord.

Supports youtube and souncloud out of the box.

## Install instructions

1. Install dependencies

- Node v20 or higher
- [ffmpeg](https://www.ffmpeg.org/download.html)
- Python 3.12 or greater
- `build-essential` if on linux/WSL2 `sudo apt install build-essential`

2. Create a .env file with the following information

```
DISCORD_TOKEN=
```

You can obtain your discord token from the discord developer portal. The bot will need all intents and voice/message permissions. You can also add the bot to your server here.

3. Run `yarn start`

Note you can also use pm2 to start the server automatically and run headless.

## Connecting SoundCloud Account

You can connect to SoundCloud with your client ID and oauth token allowing the bot to play otherwise restricted content. To learn how to get these values [click here](https://github.com/Tenpi/soundcloud.ts#getting-started). Once obtained simply run the `/authsoundcloud` command and provide the IDs in the options

---

Temporary readme, will be updated soon

# StarlingBotJS

A simple music bot for discord with soundcloud and youtube functionality. Spotify support coming soon. Supports auth on soundcloud to play restricted content.

Overall this project will be a WIP most of the time

## Install instructions

1. Install neccessary dependencies

- [Node v20+](https://nodejs.org/en/download)
- [ffmpeg](https://www.ffmpeg.org/download.html)
- [Python 3.12+](https://www.python.org/downloads/)
- build-essential which includes various tools like make needed for sodium-native to run
  - If on linux/WSL2 `sudo apt install build-essential`
  - If on OSX install xcode and then CLI tools `xcode-select --install`
  - If on windows... good luck (joking, but im not sure what is needed as i just use WSL2, maybe visual studio?)

2. Create a .env file with the following information

```
DISCORD_TOKEN=
```

You can obtain your discord token from the discord developer portal. The bot will need all intents and voice/message permissions. You can also add the bot to your server through the dev dashboard

3. Enable corpack, pnpm, and install dependencies

   `corpack enable`

   `corpack use pnpm`

   `pnpm install`

4. Run the server

   `pnpm start`

Note: you can also use pm2 to start the server automatically and run headless.

## Connecting SoundCloud Account

You can connect to SoundCloud with your client ID and oauth token allowing the bot to play otherwise restricted content. To learn how to get these values [click here](https://github.com/Tenpi/soundcloud.ts#getting-started). Once obtained simply run the `/authsoundcloud` command and provide the IDs in the options

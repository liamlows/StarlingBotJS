# StarlingBotJS

A simple music bot for discord with soundcloud and youtube functionality. Spotify support coming soon. Supports auth on soundcloud to play restricted content.

Overall this project will be a WIP most of the time

## Install instructions

1. Install neccessary dependencies

- [Node v20+](https://nodejs.org/en/download)
- [ffmpeg](https://www.ffmpeg.org/download.html)
- [Python 3.10+](https://www.python.org/downloads/)
- build-essential which includes various tools like make needed for sodium-native to run
  - If on linux/WSL2 `sudo apt install build-essential`
  - If on OSX install xcode and then CLI tools `xcode-select --install`
  - If on windows... good luck (joking, but im not sure what is needed as i just use WSL2, maybe visual studio?)

2. Create a .env file with the following information

```
DISCORD_TOKEN=
```

You can obtain your discord token from the discord developer portal. The bot will need all intents and voice/message permissions. You can also add the bot to your server through the dev dashboard

3. Enable corpack and use pnpm to install dependencies

   `corpack enable`

   `pnpm install`

4. Run the server with ts-node

   `pnpm start`

### Build and run the server with Node

If running on a production instance you can build and run the server with node (neccessary for pm2)

1. Build the server if you wish to run it in production and with node

   `npx tsc`

2. Run the server with node

   `node dist/index.js`

### PM2 daemon setup (optional)

If running on linux, you can use PM2 installed globally to run the app as a daemon process.

1. setup PNPM globally

   `pnpm setup`

2. Install pm2 globally

   `pmpn add -g pm2`

3. Start the application with pm2 (from root of project)

   `pm2 start dist/index.js --env-file .env`

4. Setup pm2 to run with startup

   `pm2 startup systemd`

## Connecting SoundCloud Account

You can connect to SoundCloud with your client ID and oauth token allowing the bot to play otherwise restricted content. To learn how to get these values [click here](https://github.com/Tenpi/soundcloud.ts#getting-started). Once obtained simply run the `/authsoundcloud` command and provide the IDs in the options

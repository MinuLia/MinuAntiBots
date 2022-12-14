# MinuAntiBots
Just a simple Discord Bot.
Used to prevent flood on your server.

---
## Requirements

You will only need Node.js and a node global package, NPM (for example), installed in your environment.

Secondly, you will need a Discord Bot (see: https://discord.com/developers/). Google will help you as well creating a Bot account 😋

You should turn on all Privileged Gateway Intents, and have Administrator permissions for your Bot.

Generate a token for this Bot, and paste it in .env file: "TOKEN=YOUR_TOKEN_HERE".

If you want to print kick message in a specific channel, then get the ID of this channel and put it in .env file the same way: "MAIN_CHANNEL=YOUR_CHANNEL_ID"

---

## Install

    $ git clone https://github.com/minulia/minuantibots
    $ cd minuantibots
    $ cp .env.local .env
    $ npm install

## Running the project

    $ node .

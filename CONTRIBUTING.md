# Contributing to Banana Farm

## Prerequisites

- APTOS CLI: https://aptos.dev/en/build/cli
- Supabase: https://supabase.com/docs/guides/cli/getting-started
- ngrok: https://ngrok.com/ (To debug the discord bot)
- npm

## Getting started

- Run `npm install` to install node packages

## Deploy contracts and setup data

To deploy the contracts, initalize a config first (use Aptos Testnet for now) and deploys the contracts.

```
cd move/banana
aptos init
aptos move deploy
```

TODO: Check Move.toml

This creates a new wallet.

Then run the setup script in the main directly:

```
npm run deploy:bananafarm
```

This does the following:

- Mints the banana token and sends it to the admin
- Deposits the minted bananas into the banana farm treasury
- Creates the Farmer collection and sets it at the required collection in the farm
- Creates a Partner Collection

-> Save the console output. We need the generated collectionIds to update the src/constants.ts and the supabase/seed.sql
TODO: Explain exactly what to do or automate it.

## Setup discord bot

Follow https://supabase.com/docs/guides/functions/examples/discord-bot

Use the following command to setup the slash commands (instead of the command in the tutorial):

```
BOT_TOKEN='replace_me_with_bot_token'
CLIENT_ID='replace_me_with_client_id'
curl -X POST \
-H 'Content-Type: application/json' \
-H "Authorization: Bot $BOT_TOKEN" \
-d '{"name":"bananafarm-allowlist","description":"Add an address to the Gorilla Moverz banana farm allowlist","options":[{"name":"address","description":"Movement Aptos wallet address","type":3,"required":true}]}' \
"https://discord.com/api/v8/applications/$CLIENT_ID/commands"
```

## Setup local Supabase

Start https://supabase.com/docs/guides/cli/local-development#start-supabase-services

Create supabase/.env.local file and adapt it

```
DISCORD_BOT_TOKEN=
DISCORD_APPLICATION_ID=
DISCORD_PUBLIC_KEY=
APTOS_PK=[Private Key of the allowlist manager: Should not be the admin of the collection]
ACCOUNT_ADDRESS=[The account address the banana farm is deployed]
```

Run it

```
supabase start
supabase functions serve --env-file ./supabase/.env.local
```

## Run dApp

```
npm run dev
```

## Debug Discord Bot

Run supabase functions and run ngrok to debug it:

```
ngrok http 54321
```

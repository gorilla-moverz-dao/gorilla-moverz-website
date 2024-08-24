# Contributing to Banana Farm

## Mission

Welcome to Banana Farm! Our mission is to create an engaging farming experience on the Movement blockchain, where users can use NFT's to farm fungible assets (Banana's) in a fun way. We aim to build a robust ecosystem that empowers users and developers alike. Contributions should focus on enhancing the user experience, improving the security and scalability of the platform, and expanding the functionality of the Banana Farm ecosystem.

## Prerequisites

- [APTOS CLI](https://aptos.dev/en/build/cli)
- [Supabase](https://supabase.com/docs/guides/cli/getting-started)
- [ngrok](https://ngrok.com/) - To debug the discord bot
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Getting started

1. Clone the repository and navigate to the project directory.
2.  Run `npm install` to install node packages

## Deploy contracts and setup data

To deploy the contracts and set up the necessary data:

1. Navigate to the contract directory:
```
cd move/banana
```

2. Initialize your Aptos configuration. This will generate a new wallet and private key.
```
aptos init
```

3. Copy the generated account address to  the move.toml file.

4. Deploy the contracts:
```
aptos move deploy
```

5. Navigate back to the project root and run the setup script:

```
cd ../..
npm run deploy:bananafarm
```

This script does the following:

- Mints the banana token and sends it to the admin
- Deposits the minted bananas into the banana farm treasury
- Creates the Farmer collection and sets it at the required collection in the farm
- Creates a Partner Collection

-> Save the console output. We need the generated collectionIds to update the src/constants.ts and the supabase/seed.sql
// TODO: Explain exactly what to do or automate it.

## Setup discord bot

Follow the steps in [this Supabase Discord Bot tutorial](https://supabase.com/docs/guides/functions/examples/discord-bot), but with the following command to setup the slash commands (instead of the command in the tutorial):

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

Follow [the Supabase Services tutorial](https://supabase.com/docs/guides/cli/local-development#start-supabase-services) and add the following steps after:

1. Create supabase/.env.local file and adapt it

```
DISCORD_BOT_TOKEN=
DISCORD_APPLICATION_ID=
DISCORD_PUBLIC_KEY=
APTOS_PK=[Private Key of the allowlist manager: Should not be the admin of the collection]
ACCOUNT_ADDRESS=[The account address the banana farm is deployed]
```

2. Run it

```
supabase start
supabase functions serve --env-file ./supabase/.env.local
```

## Run dApp

To start the frontend of the dApp:
```
npm run dev
```

## Debug Discord Bot

Run supabase functions and run ngrok to debug it:
// TODO: should there also be a command for `Run supabase functions`?
```
ngrok http 54321
```

## How to add a Partner NFT

1. Setup wallet for the allowlist manager (if own bot should be deployed for the partner)

2. Copy `/public/nfts/partner1`and adapt the images and descriptions

3. Deploy Website (to have the images available)

4. Open the form and create a partner collection: http://localhost:5173/bananas/create

5. Add the db entries for the farm (adapt the values):

```
insert into public.banana_farm_collections
(name, slug, collection_address, discord_link, discord_guild_id)
values
('Banana Farmer | Gorilla Moverz', 'farmer', '0xba47e8a4111d53d81773e920b55c4152976a47ea4b002777cd81e8eb6ed9e4e2', 'https://discord.gg/uPhU2EjMEp', '1204497818987921518'),
```

```
insert into public.banana_farm_nfts (image, collection_id, nft_number)
SELECT
  'partner-' || (random() * 1 + 1)::int || '.png' AS image,
  2 as collection_id,
  generate_series(1, 2000) as nft_number;
```

6. Install the discord bot in the partners discord
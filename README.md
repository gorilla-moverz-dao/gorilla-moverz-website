# Gorilla Moverz

Website of Gorilla Moverz!

[gorilla-moverz.xyz](https://gorilla-moverz.xyz)

# Banana Farm

## Game play

- User mint's an NFT (Farmer) to be able to farm bananas
- Then bananas can be farmed after a specified timeout (e.g. 4h)
  - until 8h you get 4 bananas, then until 12h 3, ...
  - The timeout can be adjusted as low as 1 minute (2,3,4 mins) (by the Admin)
    - Maybe including a text (stored on chain like). Because of a dry season, bananas cab only be farmed every 8 hours, etc.
- Leaderboard is based on the number of bananas farmed

## Whitelist

- A whitelist mint will be implemented to allow people to mint a farmer.
- The whitelist will be implemented as a discord bot (could increase the number of people in a discord)

## Partner NFTs

- We create an NFT Collection for our partners
- Users that own the partner NFT can benefit by being able to farm more bananas (e.g. 10% increase per Partner NFT)
- Also a whitelist can be implemented so Users need to join Partners discord and access the discord bot.

## Other improvements / Ideas

- Layout can be improved (3d bananas, farm more game like shake or climb trees, more gamification)

## TODOS (for Hackaton)

- Define default timeout
- Define amount of mintable NFTs (Farmer & Partner NFTs)
- Select farmer NFTs from the 27 submitted (gogo head quality is not always great)
  - or maybe create another public (twitter) contest to have more variants?
- Create Project description to submit for hackaton. We might want to submit the whole Website including banana farm as a Project (could increase to posibillity to win something)
- Create tweets (announce participation, teaser, screenshots?)
- Create Video (Screenrecording with explanations)
- Bananas should not be able to be sent to other Wallets.

## Setup allowlist

BOT_TOKEN='replace_me_with_bot_token'
CLIENT_ID='replace_me_with_client_id'
curl -X POST \
-H 'Content-Type: application/json' \
-H "Authorization: Bot $BOT_TOKEN" \
-d '{"name":"bananafarm-allowlist","description":"Add an address to the Gorilla Moverz banana farm allowlist","options":[{"name":"address","description":"Movement Aptos wallet address","type":3,"required":true}]}' \
"https://discord.com/api/v8/applications/$CLIENT_ID/commands"

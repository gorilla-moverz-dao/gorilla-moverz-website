# 🍌 Gorilla Moverz: Banana Farm


<h4 align="center">
  <a href="https://gorilla-moverz.xyz">Website</a> | 
  <a href="https://www.youtube.com/watch?v=PjMEkM_0yog">Demo video</a>


![logo](public/images/bananafarm/banana-farm-logo.png)
</h4>
 
🍌 Banana Farm, is an innovative and interactive NFT-based farming game where users mint NFTs, known as Farmers, to cultivate virtual bananas. The game operates on a time-based farming mechanism where bananas can be harvested after specified intervals, with the frequency and amount dependent on the time elapsed since the last harvest.

⚙️ Built using NextJS, Move, and Typescript.

- 👨‍🌾 **NFT Farming:** Users mint a Farmer NFT to start farming virtual bananas, creating an engaging and rewarding gameplay loop.
- ⏱️ **Dynamic Timeouts:** Admins can adjust farming intervals, adding a layer of strategy and unpredictability to the game.
- 🏆 **Leaderboard:** A competitive ranking system based on the number of bananas farmed, encouraging players to strive for the top.
- 🗒️ **Whitelist Minting:** Users gain access to mint Farmers by joining a Discord server, fostering community growth and exclusivity.
- 🤝 **Partner NFTs:** Special NFTs that give users farming bonuses, incentivizing collaboration and participation in partner communities.

# Diagram

![diagram](assets/diagram.png)

# Screenshots

| Main page                    | Mint Farmer NFT               |
| --------------------------------- | --------------------------------- |
| ![screenshot 1](public/screenshots/banana1.png) | ![screenshot 2](public/screenshots/banana2.png) |

| Farmer NFT mint3ed                       | Farming bananas                      |
| --------------------------------- | --------------------------------- |
| ![screenshot 3](public/screenshots/banana3.png) | ![screenshot 4](public/screenshots/banana4.png) |


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
- Create Video (Screenrecording with explanations)
- Bananas should not be able to be sent to other Wallets.
- More inline help.
  - What to do when clicking the discord bot (show command in dialog /bananafarm-allowlist address)
  - ...

# Local Development

To contribute to the Banana Farm see [CONTRIBUTING.md](CONTRIBUTING.md)

# How to add a Partner NFT

- Setup wallet for the allowlist manager (if own bot should be deployed for the partner)
- Copy `/public/nfts/partner1`and adapt the images and descriptions
- Deploy Website (to have the images available)
- Open the form and create a partner collection: http://localhost:5173/bananas/create
- Add the db entries for the farm (adapt the values):

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

- Install the discord bot in the partners discord


# Links 
[Website](https://gorilla-moverz.xyz)
[Github]()
[Demo video](https://www.youtube.com/watch?v=PjMEkM_0yog)

# Team

- [Urs Lee](https://x.com/ursleee)
- [arjanjohan](https://x.com/arjanjohan)
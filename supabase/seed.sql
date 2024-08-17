insert into public.banana_farm_collections 
(name, slug, collection_address, discord_link, discord_guild_id) 
values
('Banana Farmer | Gorilla Moverz', 'farmer', '0xba47e8a4111d53d81773e920b55c4152976a47ea4b002777cd81e8eb6ed9e4e2', 'https://discord.gg/uPhU2EjMEp', '1204497818987921518'),
('Gorillaz Partner 1', 'partner1', '0x362bd0de33f3cf1e5e39a52fbeba32931387eef974b86209dd30035d8b2897be', 'https://discord.gg/ZG5Kzxy6HV', '1274471478997418056');

insert into public.banana_farm_nfts (image, collection_id, nft_number)
SELECT 
  'farmer-' || (random() * 27 + 1)::int || '.png' AS image, 
  1 as collection_id,
  generate_series(1, 10000) as nft_number;


insert into public.banana_farm_nfts (image, collection_id, nft_number)
SELECT 
  'partner-' || (random() * 1 + 1)::int || '.png' AS image, 
  2 as collection_id,
  generate_series(1, 2000) as nft_number;
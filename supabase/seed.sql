insert into public.banana_farm_collections (name, slug, collection_address) values ('Banana Farmer | Gorilla Moverz', 'farmer', '0xba47e8a4111d53d81773e920b55c4152976a47ea4b002777cd81e8eb6ed9e4e2');

insert into public.banana_farm_nfts (image, collection_id, nft_number)
SELECT 
  'farmer-' || (random() * 27 + 1)::int || '.png' AS image, 
  1 as collection_id,
  generate_series(1, 10000) as nft_number;